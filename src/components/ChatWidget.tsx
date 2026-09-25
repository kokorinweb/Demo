"use client";

import { useEffect, useRef, useState } from "react";
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
        className="sheen fixed bottom-24 right-4 z-50 flex items-center gap-2.5 rounded-tile bg-concrete px-5 py-3.5 text-[14px] font-medium text-plaster shadow-[0_14px_40px_-14px_rgba(22,25,27,0.8)] transition-all duration-300 hover:bg-brass lg:bottom-6 lg:right-6"
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass-bright" />
        {open ? "Закрыть" : "Спросить мастера"}
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="Консультант по ремонту"
          className="rise fixed bottom-40 right-4 z-50 flex max-h-[min(560px,calc(100dvh-12rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-tile border bg-plaster shadow-[0_30px_80px_-30px_rgba(22,25,27,0.75)] seam lg:bottom-24 lg:right-6"
        >
          <div className="flex items-center justify-between gap-3 border-b bg-concrete px-4 py-3.5 text-plaster seam-dark">
            <div>
              <p className="font-display text-[14px] font-medium">Марк · консультант</p>
              <p className="text-[12px] text-plaster/55">Отвечает по услугам и ценам</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть чат"
              className="text-plaster/60 transition-colors hover:text-plaster"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[86%] whitespace-pre-wrap rounded-tile px-3.5 py-2.5 text-[14px] leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-concrete text-plaster"
                    : "border bg-plaster-deep/60 seam"
                }`}
              >
                {message.content}
              </div>
            ))}

            {pending && messages.at(-1)?.role === "user" && (
              <div className="w-16 rounded-tile border bg-plaster-deep/60 px-3.5 py-3 seam">
                <span className="inline-flex gap-1">
                  <Dot delay="0ms" />
                  <Dot delay="150ms" />
                  <Dot delay="300ms" />
                </span>
              </div>
            )}

            {error && (
              <div className="rounded-tile border border-brass/50 bg-brass/10 px-3.5 py-2.5 text-[13.5px]">
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
                    className="rounded-tile border px-3 py-1.5 text-[12.5px] text-ink-soft transition-colors duration-300 seam hover:border-brass hover:text-brass"
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
            className="flex gap-2 border-t px-3 py-3 seam"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={500}
              placeholder="Опишите задачу…"
              className="flex-1 rounded-tile border bg-plaster px-4 py-2.5 text-[14px] outline-none transition-colors seam focus:border-brass"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="rounded-tile bg-brass px-4 py-2.5 text-[14px] font-medium text-plaster transition-opacity disabled:opacity-40"
            >
              →
            </button>
          </form>

          <p className="border-t px-4 py-2.5 text-[11.5px] leading-snug text-ink-soft seam">
            Отвечает ИИ и может ошибаться. Точные сроки и условия —{" "}
            <a
              className="border-b border-brass/40 text-brass"
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
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft"
      style={{ animationDelay: delay }}
    />
  );
}
