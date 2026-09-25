"use client";

import { useEffect, useRef, useState } from "react";
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
    "w-full rounded-tile border bg-plaster px-4 py-3.5 text-[15px] outline-none transition-colors duration-300 seam placeholder:text-ink-soft/60 focus:border-brass";

  return (
    <section id="request" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-10 border-t pt-12 seam lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
            Рассчитать ремонт
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Заполните четыре поля — форма соберёт сообщение и откроет WhatsApp.
            Отправите его сами, ничего не уйдёт без вашего нажатия.
          </p>
          <p className="mt-6 text-[14px] text-ink-soft">
            Не любите переписку?{" "}
            <a href={TEL_URL} className="border-b border-brass/40 text-brass hover:border-brass">
              {COMPANY.phone}
            </a>
          </p>
        </div>

        <form ref={formRef} onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
          {filledByAssistant && (
            <p className="rise rounded-tile border border-brass/40 bg-brass/10 px-4 py-3 text-[13.5px] text-ink sm:col-span-2">
              Помощник заполнил форму. Проверьте поля и допишите, если что-то не так.
            </p>
          )}

          <label className="block">
            <span className="mb-2 block text-[13px] text-ink-soft">Как вас зовут</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Имя"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              className={`${field} ${errors.name ? "border-brass" : ""}`}
            />
            {errors.name && <span className="mt-1.5 block text-[12.5px] text-brass">{errors.name}</span>}
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] text-ink-soft">Телефон</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+7 900 000-00-00"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              className={`${field} ${errors.phone ? "border-brass" : ""}`}
            />
            {errors.phone && (
              <span className="mt-1.5 block text-[12.5px] text-brass">{errors.phone}</span>
            )}
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] text-ink-soft">Площадь, м²</span>
            <input
              value={area}
              onChange={(event) => setArea(event.target.value.replace(/[^\d]/g, "").slice(0, 4))}
              placeholder="например, 42"
              inputMode="numeric"
              className={field}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] text-ink-soft">Что нужно сделать</span>
            <select
              value={service}
              onChange={(event) => setService(event.target.value)}
              className={field}
            >
              {SERVICES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-[13px] text-ink-soft">Подробности</span>
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
            className="sheen rounded-tile bg-concrete px-7 py-4 text-[15px] font-medium text-plaster transition-all duration-300 hover:bg-brass hover:shadow-[0_12px_36px_-14px_rgba(169,128,63,0.85)] sm:col-span-2"
          >
            Отправить в WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
