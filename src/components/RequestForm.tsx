"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { COMPANY, TEL_URL } from "@/lib/company";
import { SERVICES } from "@/lib/services";

export type PrefillDetail = {
  service?: string;
  area?: number;
  comment?: string;
};

/** Помощник заполняет эту же форму — через событие, без общего состояния. */
export const PREFILL_EVENT = "rhr:prefill";

type Errors = Partial<Record<"name" | "phone", string>>;

export function RequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [service, setService] = useState(SERVICES[0]!.id);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [filledByAssistant, setFilledByAssistant] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function onPrefill(event: Event) {
      const detail = (event as CustomEvent<PrefillDetail>).detail ?? {};
      if (detail.service && SERVICES.some((item) => item.id === detail.service)) {
        setService(detail.service);
      }
      if (typeof detail.area === "number") setArea(String(detail.area));
      if (detail.comment) setComment(detail.comment);
      setFilledByAssistant(true);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  function submit(event: React.FormEvent) {
    event.preventDefault();

    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Как к вам обращаться?";
    // Достаточно десяти цифр: остальное разберёт мастер при звонке.
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Нужен номер телефона";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const serviceTitle = SERVICES.find((item) => item.id === service)?.title ?? "Ремонт";
    const lines = [
      "Здравствуйте! Заявка с сайта.",
      `Имя: ${name.trim()}`,
      `Телефон: ${phone.trim()}`,
      `Задача: ${serviceTitle}`,
      area.trim() ? `Площадь: ${area.trim()} м²` : null,
      comment.trim() ? `Комментарий: ${comment.trim()}` : null,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${COMPANY.messengerNumber}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const field =
    "w-full border border-border bg-card px-4 py-3.5 text-[15px] outline-none flat-transition focus:border-primary";

  return (
    <section id="request" className="bg-primary py-16 text-on-primary sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-wider text-on-primary/70">
            Заявка
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
            Рассчитать ремонт
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-on-primary/80">
            Заполните четыре поля — форма соберёт сообщение и откроет WhatsApp.
            Отправите его сами, ничего не уйдёт без вашего нажатия.
          </p>
          <a
            href={TEL_URL}
            className="mt-6 inline-flex cursor-pointer items-center gap-2.5 text-[17px] font-bold tabular-nums flat-transition hover:text-accent"
          >
            <Icon name="phone" className="h-5 w-5" />
            {COMPANY.phone}
          </a>
        </div>

        <form
          ref={formRef}
          onSubmit={submit}
          noValidate
          className="grid gap-4 bg-card p-6 text-foreground sm:grid-cols-2 sm:p-8"
        >
          {filledByAssistant && (
            <p className="rise flex items-start gap-2.5 border-l-4 border-accent bg-muted px-4 py-3 text-[14px] sm:col-span-2">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Помощник заполнил форму. Проверьте поля и допишите, если что-то не так.
            </p>
          )}

          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold">Как вас зовут</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Имя"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              className={`${field} ${errors.name ? "border-accent" : ""}`}
            />
            {errors.name && (
              <span className="mt-1.5 block text-[13px] font-semibold text-accent">
                {errors.name}
              </span>
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
              className={`${field} ${errors.phone ? "border-accent" : ""}`}
            />
            {errors.phone && (
              <span className="mt-1.5 block text-[13px] font-semibold text-accent">
                {errors.phone}
              </span>
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
                <option key={item.id} value={item.id}>
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
            className="flex cursor-pointer items-center justify-center gap-2.5 bg-accent px-7 py-4 text-[16px] font-bold text-on-accent flat-transition hover:bg-accent-hover hover:text-on-primary sm:col-span-2"
          >
            <Icon name="message" className="h-5 w-5" />
            Отправить в WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
