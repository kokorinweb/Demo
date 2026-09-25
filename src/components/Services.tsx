"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SERVICES } from "@/lib/services";

export function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="max-w-2xl">
        <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
          Услуги
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
          Что делаем
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
          Берём объект целиком или отдельный этап, если остальное вы уже сделали.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => {
          const expanded = open === service.id;
          const hidden = Math.max(0, service.includes.length - 3);
          const shown = expanded ? service.includes : service.includes.slice(0, 3);

          return (
            <Reveal key={service.id} delay={index * 60} className="h-full">
              <article className="flex h-full flex-col border border-border bg-card p-6">
                <Icon name={service.icon} className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-[18px] font-bold leading-snug">{service.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                  {service.lead}
                </p>

                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {shown.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[14px] leading-snug">
                      <Icon name="check" className="mt-px h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                {hidden > 0 && (
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : service.id)}
                    aria-expanded={expanded}
                    className="mt-auto flex cursor-pointer items-center gap-1.5 pt-5 text-[14px] font-semibold text-primary flat-transition hover:text-accent"
                  >
                    {expanded ? "Свернуть" : `Ещё ${hidden} ${hidden === 1 ? "пункт" : "пункта"}`}
                    <Icon
                      name="chevron"
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
