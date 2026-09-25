"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { SERVICES } from "@/lib/services";

export function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="max-w-2xl">
        <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
          Что делаем
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Берём объект целиком или отдельный этап, если остальное вы уже сделали.
          Нажмите на услугу, чтобы увидеть состав работ.
        </p>
      </Reveal>

      <div className="mt-12 grid border-l border-t seam sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => {
          const expanded = open === service.id;
          const hidden = Math.max(0, service.includes.length - 3);
          return (
            <Reveal key={service.id} delay={index * 60} className="h-full">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : service.id)}
                aria-expanded={expanded}
                className="brass-edge group flex h-full w-full flex-col border-b border-r px-6 py-8 text-left transition-colors duration-500 seam hover:bg-plaster-deep/60 sm:px-7 sm:py-9"
              >
                <span className="font-display text-lg font-medium leading-snug tracking-[-0.01em] transition-colors group-hover:text-brass">
                  {service.title}
                </span>
                <span className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  {service.lead}
                </span>

                {/* Три пункта видно сразу: карточка без них выглядит пустой. */}
                <span className="mt-5 block border-t pt-4 seam">
                  {service.includes.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="flex gap-2.5 py-1 text-[13.5px] leading-snug text-ink-soft"
                    >
                      <span aria-hidden className="mt-[8px] h-px w-3 shrink-0 bg-brass" />
                      {item}
                    </span>
                  ))}
                </span>

                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="overflow-hidden">
                    {service.includes.slice(3).map((item) => (
                      <span
                        key={item}
                        className="flex gap-2.5 py-1 text-[13.5px] leading-snug text-ink-soft"
                      >
                        <span aria-hidden className="mt-[8px] h-px w-3 shrink-0 bg-brass" />
                        {item}
                      </span>
                    ))}
                  </span>
                </span>

                {hidden > 0 && (
                  <span className="mt-auto flex items-center gap-2 pt-6 text-[13px] text-brass">
                    {expanded ? "Свернуть" : `Ещё ${hidden} ${hidden === 1 ? "пункт" : "пункта"}`}
                    <span
                      aria-hidden
                      className={`inline-block transition-transform duration-300 ${
                        expanded ? "rotate-180" : "group-hover:translate-y-0.5"
                      }`}
                    >
                      ↓
                    </span>
                  </span>
                )}
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
