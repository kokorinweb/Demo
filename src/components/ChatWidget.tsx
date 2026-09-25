"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { COMPANY, WHATSAPP_URL } from "@/lib/company";
import { PREFILL_EVENT, type PrefillDetail } from "./RequestForm";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Здравствуйте! Я Марк, консультант RemontHouseRoom. Расскажите, что нужно отремонтировать, — подскажу по работам и ценам и заполню заявку за вас.",
};

const SUGGESTIONS = [
  "Сколько стоит ванная под ключ?",
  "Нужен ремонт санузла 4 м²",
  "Какие работы вы делаете?",
];

/** На сервер уходят только последние ходы: длинный контекст тут ни к чему. */
const HISTORY_LIMIT = 10;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function applyAction(action: { type: string } & Record<string, unknown>) {
    if (action.type === "show_section" && typeof action.section === "string") {
      document.getElementById(action.section)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (action.type === "prefill_request") {
      const detail: PrefillDetail = {
        service: typeof action.service === "string" ? action.service : undefined,
        area: typeof action.area === "number" ? action.area : undefined,
        comment: typeof action.comment === "string" ? action.comment : undefined,
      };
      window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
      setOpen(false);
    }
  }

  /** Разбирает поток SSE: текст показываем по мере прихода, действия — сразу. */
  async function readStream(response: Response) {
    const reader = response.body?.getReader();
    if (!reader) throw new Error("Пустой ответ");

    const decoder = new TextDecoder();
    let buffer = "";
    let started = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() ?? "";

      for (const chunk of chunks) {
        const eventLine = chunk.split("\n").find((line) => line.startsWith("event: "));
        const dataLine = chunk.split("\n").find((line) => line.startsWith("data: "));
        if (!eventLine || !dataLine) continue;

        const name = eventLine.slice(7).trim();
        const data = JSON.parse(dataLine.slice(6)) as Record<string, unknown>;

        if (name === "text") {
          const text = String(data.text ?? "");
          setMessages((current) => {
            if (!started) {
              started = true;
              return [...current, { role: "assistant", content: text }];
            }
            const head = current.slice(0, -1);
            const last = current.at(-1)!;
            return [...head, { ...last, content: last.content + text }];
          });
        } else if (name === "action") {
          applyAction(data as { type: string });
        } else if (name === "error") {
          throw new Error(String(data.message ?? "Помощник не ответил"));
        }
      }
    }
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-HISTORY_LIMIT).map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Сервис недоступен");
      }

      await readStream(response);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : `Не получилось связаться с помощником. Напишите в WhatsApp: ${COMPANY.phone}`,
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="fixed bottom-24 right-4 z-50 flex cursor-pointer items-center gap-2.5 bg-primary px-5 py-3.5 text-[14px] font-bold text-on-primary flat-transition hover:bg-accent hover:text-on-accent lg:bottom-6 lg:right-6"
      >
        <Icon name="message" className="h-[18px] w-[18px]" />
        {open ? "Закрыть" : "Спросить мастера"}
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="Консультант по ремонту"
          className="rise fixed bottom-40 right-4 z-50 flex max-h-[min(560px,calc(100dvh-12rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden border border-border bg-card lg:bottom-24 lg:right-6"
        >
          <div className="flex items-center justify-between gap-3 bg-primary px-4 py-3.5 text-on-primary">
            <div>
              <p className="text-[14px] font-bold">Марк, консультант</p>
              <p className="text-[12px] text-on-primary/70">Отвечает по услугам и ценам</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть чат"
              className="cursor-pointer text-on-primary/70 flat-transition hover:text-on-primary"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[86%] whitespace-pre-wrap px-3.5 py-2.5 text-[14px] leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-on-primary"
                    : "border border-border bg-muted"
                }`}
              >
                {message.content}
              </div>
            ))}

            {pending && messages.at(-1)?.role === "user" && (
              <div className="w-16 border border-border bg-muted px-3.5 py-3">
                <span className="inline-flex gap-1">
                  <Dot delay="0ms" />
                  <Dot delay="150ms" />
                  <Dot delay="300ms" />
                </span>
              </div>
            )}

            {error && (
              <div className="border-l-4 border-accent bg-muted px-3.5 py-2.5 text-[13.5px]">
                {error}
              </div>
            )}

            {messages.length === 1 && !pending && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="cursor-pointer border border-border px-3 py-1.5 text-[12.5px] font-medium text-muted-foreground flat-transition hover:border-primary hover:text-primary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
            className="flex gap-2 border-t border-border px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={500}
              placeholder="Опишите задачу…"
              className="flex-1 border border-border bg-card px-4 py-2.5 text-[14px] outline-none flat-transition focus:border-primary"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Отправить"
              className="flex cursor-pointer items-center bg-accent px-4 py-2.5 text-on-accent flat-transition hover:bg-accent-hover hover:text-on-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="arrow" className="h-[18px] w-[18px]" />
            </button>
          </form>

          <p className="border-t border-border px-4 py-2.5 text-[11.5px] leading-snug text-muted-foreground">
            Отвечает ИИ и может ошибаться. Точные сроки и условия —{" "}
            <a
              className="font-semibold text-primary underline"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              в WhatsApp
            </a>
          </p>
        </div>
      )}
    </>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: delay }}
    />
  );
}
