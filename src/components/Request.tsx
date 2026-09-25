"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import { COMPANY, TEL_URL } from "@/lib/company";
import { SERVICES } from "@/lib/services";

type Message = { role: "user" | "assistant"; content: string };

/** Что помощник успел записать — показывается рядом с диалогом. */
type Draft = {
  service?: string;
  area?: string;
  stage?: string;
  name?: string;
  phone?: string;
};

const STEPS = ["service", "area", "stage", "contact", "done"] as const;
type Step = (typeof STEPS)[number];

const AREA_OPTIONS = ["до 10 м²", "10–40 м²", "40–80 м²", "больше 80 м²"];
const STAGE_OPTIONS = ["Только думаем", "Готовы считать", "Надо начинать сейчас"];

const GREETING =
  "Здравствуйте! Давайте соберём заявку по шагам. Что нужно отремонтировать?";

function buildMessage(draft: Draft): string {
  return [
    "Здравствуйте! Заявка с сайта.",
    draft.name ? `Имя: ${draft.name}` : null,
    draft.phone ? `Телефон: ${draft.phone}` : null,
    draft.service ? `Задача: ${draft.service}` : null,
    draft.area ? `Площадь: ${draft.area}` : null,
    draft.stage ? `Этап: ${draft.stage}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function whatsappLink(draft: Draft): string {
  return `https://wa.me/${COMPANY.messengerNumber}?text=${encodeURIComponent(buildMessage(draft))}`;
}

export function Request() {
  const [tab, setTab] = useState<"assistant" | "form">("assistant");

  return (
    <section id="request" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHead
        eyebrow="Заявка"
        title={
          <>
            Расскажите, что
            <br />
            хотите отремонтировать
          </>
        }
        lead="Ремонт считается по конкретным размерам, поэтому «сколько стоит ванная?» без вводных никто не ответит. Помощник задаст нужные вопросы и соберёт из ответов готовую заявку."
      />

      <div className="mt-8 inline-flex rounded-full bg-sand-deep p-1.5">
        {(
          [
            ["assistant", "Собрать с помощником"],
            ["form", "Обычная форма"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`cursor-pointer rounded-full px-5 py-2.5 text-[14.5px] font-semibold warm-transition ${
              tab === value ? "bg-walnut text-sand" : "text-ink-soft hover:text-walnut"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">{tab === "assistant" ? <Assistant /> : <PlainForm />}</div>
    </section>
  );
}

function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [step, setStep] = useState<Step>("service");
  const [draft, setDraft] = useState<Draft>({});
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  /** Пока не знаем, отвечает ли сервер: на статике ИИ-ответа нет. */
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const options =
    step === "service"
      ? SERVICES.map((item) => item.title)
      : step === "area"
        ? AREA_OPTIONS
        : step === "stage"
          ? STAGE_OPTIONS
          : [];

  function pushAssistant(text: string) {
    setMessages((current) => [...current, { role: "assistant", content: text }]);
  }

  /** Сценарий по шагам: он же работает, когда сервера с ИИ нет. */
  function advance(answer: string) {
    setMessages((current) => [...current, { role: "user", content: answer }]);

    if (step === "service") {
      setDraft((current) => ({ ...current, service: answer }));
      setStep("area");
      pushAssistant("Записал. Какая примерно площадь помещения?");
      return;
    }
    if (step === "area") {
      setDraft((current) => ({ ...current, area: answer }));
      setStep("stage");
      pushAssistant("Понятно. На каком вы этапе?");
      return;
    }
    if (step === "stage") {
      setDraft((current) => ({ ...current, stage: answer }));
      setStep("contact");
      pushAssistant("Остались имя и телефон — напишите их одной строкой.");
      return;
    }
    if (step === "contact") {
      const digits = answer.replace(/\D/g, "");
      const name = answer.replace(/[\d\s+()-]+/g, " ").replace(/[.,;:]+$/, "").trim();
      setDraft((current) => ({
        ...current,
        name: name || current.name,
        phone: digits.length >= 10 ? answer.match(/[\d+()\s-]{10,}/)?.[0]?.trim() : current.phone,
      }));
      if (digits.length < 10) {
        pushAssistant("Кажется, в номере не хватает цифр. Напишите телефон целиком.");
        return;
      }
      setStep("done");
      pushAssistant(
        "Готово, заявка собрана. Нажмите кнопку — она откроет WhatsApp с готовым сообщением, отправите его сами.",
      );
    }
  }

  /** Свободный вопрос уходит к ИИ, если он поднят; иначе ведём по шагам. */
  async function askAi(question: string) {
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: question }]
            .slice(-10)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!response.ok || !response.body) throw new Error("нет ответа");

      setAiAvailable(true);
      const reader = response.body.getReader();
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
          const name = chunk.split("\n").find((line) => line.startsWith("event: "))?.slice(7).trim();
          const data = chunk.split("\n").find((line) => line.startsWith("data: "))?.slice(6);
          if (name !== "text" || !data) continue;
          const text = String(JSON.parse(data).text ?? "");
          setMessages((current) => {
            if (!started) {
              started = true;
              return [...current, { role: "assistant", content: text }];
            }
            const last = current.at(-1)!;
            return [...current.slice(0, -1), { ...last, content: last.content + text }];
          });
        }
      }
      if (!started) throw new Error("пустой ответ");
    } catch {
      setAiAvailable(false);
      pushAssistant(
        `В демо-версии я веду только по шагам заявки. Свободные вопросы лучше задать мастеру: ${COMPANY.phone}.`,
      );
    } finally {
      setPending(false);
    }
  }

  function send(text: string) {
    const answer = text.trim();
    if (!answer || pending) return;
    setInput("");

    if (step === "done") {
      setMessages((current) => [...current, { role: "user", content: answer }]);
      if (aiAvailable === false) {
        pushAssistant(`Заявка уже собрана. Что-то ещё — напишите мастеру: ${COMPANY.phone}.`);
        return;
      }
      void askAi(answer);
      return;
    }

    advance(answer);
  }

  const filled = Object.entries({
    Задача: draft.service,
    Площадь: draft.area,
    Этап: draft.stage,
    Имя: draft.name,
    Телефон: draft.phone,
  }).filter(([, value]) => Boolean(value));

  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="card-soft flex min-h-[420px] flex-col overflow-hidden">
        <div className="flex items-center gap-2.5 border-b border-line px-5 py-4">
          <Icon name="message" className="h-[18px] w-[18px] text-walnut" />
          <p className="text-[14.5px] font-bold">Помощник по заявке</p>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-fit max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed ${
                message.role === "user"
                  ? "ml-auto bg-walnut text-sand"
                  : "bg-sand-deep text-ink"
              }`}
            >
              {message.content}
            </div>
          ))}

          {pending && (
            <div className="w-16 rounded-2xl bg-sand-deep px-4 py-3.5">
              <span className="inline-flex gap-1">
                <Dot delay="0ms" />
                <Dot delay="150ms" />
                <Dot delay="300ms" />
              </span>
            </div>
          )}

          {options.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => advance(option)}
                  className="cursor-pointer rounded-full border border-line px-4 py-2 text-[13.5px] warm-transition hover:border-walnut hover:text-walnut"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {step === "done" && (
            <a
              href={whatsappLink(draft)}
              target="_blank"
              rel="noopener noreferrer"
              className="rise mt-2 inline-flex cursor-pointer items-center gap-2.5 press active:scale-[0.97] rounded-full bg-walnut px-6 py-3.5 text-[15px] font-semibold text-sand warm-transition hover:bg-walnut-deep"
            >
              <Icon name="whatsapp" className="h-[18px] w-[18px]" />
              Отправить заявку в WhatsApp
            </a>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
          className="flex gap-2 border-t border-line px-4 py-4"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={300}
            placeholder={
              step === "contact" ? "Иван, +7 900 000-00-00" : "Напишите ответ…"
            }
            className="flex-1 rounded-full border border-line bg-sand px-5 py-3 text-[14.5px] outline-none warm-transition focus:border-walnut"
          />
          <button
            type="submit"
            aria-label="Отправить"
            disabled={pending || !input.trim()}
            className="flex cursor-pointer items-center press active:scale-[0.97] rounded-full bg-walnut px-5 py-3 text-sand warm-transition hover:bg-walnut-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name="arrow" className="h-[18px] w-[18px]" />
          </button>
        </form>
      </div>

      <div className="card-soft bg-sand-deep p-6 sm:p-7">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-walnut">
          Что уже записано
        </p>

        {filled.length === 0 ? (
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
            Пока пусто. Ответьте на пару вопросов — заявка соберётся здесь сама,
            и её можно будет отправить одним сообщением.
          </p>
        ) : (
          <dl className="mt-4 space-y-3">
            {filled.map(([label, value]) => (
              <div key={label} className="rise">
                <dt className="text-[12.5px] text-ink-soft">{label}</dt>
                <dd className="text-[15px] font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-6 border-t border-line pt-5 text-[13px] leading-relaxed text-ink-soft">
          Ничего не уходит без вашего нажатия: заявка открывается в WhatsApp, отправляете
          её вы. Не любите переписку —{" "}
          <a href={TEL_URL} className="font-semibold text-walnut">
            {COMPANY.phone}
          </a>
        </p>
      </div>
    </div>
  );
}

function PlainForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [service, setService] = useState(SERVICES[0]!.title);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone", string>>>({});

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Partial<Record<"name" | "phone", string>> = {};
    if (name.trim().length < 2) next.name = "Как к вам обращаться?";
    // Достаточно десяти цифр: остальное разберёт мастер при звонке.
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Нужен номер телефона";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const draft: Draft = {
      name: name.trim(),
      phone: phone.trim(),
      service,
      area: area.trim() ? `${area.trim()} м²` : undefined,
      stage: comment.trim() || undefined,
    };
    window.open(whatsappLink(draft), "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-2xl border border-line bg-sand px-5 py-3.5 text-[15px] outline-none warm-transition focus:border-walnut";

  return (
    <form onSubmit={submit} noValidate className="card-soft grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold">Как вас зовут</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Имя"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          className={`${field} ${errors.name ? "border-walnut" : ""}`}
        />
        {errors.name && (
          <span className="mt-1.5 block text-[13px] font-semibold text-walnut">{errors.name}</span>
        )}
      </label>

      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold">Телефон</span>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+7 900 000-00-00"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          className={`${field} ${errors.phone ? "border-walnut" : ""}`}
        />
        {errors.phone && (
          <span className="mt-1.5 block text-[13px] font-semibold text-walnut">{errors.phone}</span>
        )}
      </label>

      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold">Площадь, м²</span>
        <input
          value={area}
          onChange={(event) => setArea(event.target.value.replace(/[^\d]/g, "").slice(0, 4))}
          placeholder="например, 42"
          inputMode="numeric"
          className={field}
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold">Что нужно сделать</span>
        <select
          value={service}
          onChange={(event) => setService(event.target.value)}
          className={`${field} cursor-pointer`}
        >
          {SERVICES.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className="mb-2 block text-[13px] font-semibold">Подробности</span>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value.slice(0, 500))}
          rows={3}
          placeholder="Состояние помещения, сроки, пожелания по материалам"
          className={`${field} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="flex cursor-pointer items-center justify-center gap-2.5 press active:scale-[0.97] rounded-full bg-walnut px-7 py-4 text-[16px] font-semibold text-sand warm-transition hover:bg-walnut-deep sm:col-span-2"
      >
        <Icon name="whatsapp" className="h-5 w-5" />
        Отправить в WhatsApp
      </button>
    </form>
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
