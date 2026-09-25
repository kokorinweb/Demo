"use client";

import Image from "next/image";
import { asset } from "@/lib/assets";
import { useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { SERVICES } from "@/lib/services";

export function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHead
        eyebrow="Услуги"
        title={
          <>
            Выберите, что
            <br />
            нужно отремонтировать
          </>
        }
        lead="Каждое направление считаем по вашим вводным. Выберите ближайшее — и напишите, что у вас за помещение."
      />

      {/* Бенто-сетка: крупная карточка задаёт ритм, остальные подстраиваются. */}
      <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => {
          const expanded = open === service.id;
          const hidden = Math.max(0, service.includes.length - 3);
          const shown = expanded ? service.includes : service.includes.slice(0, 3);

          return (
            <Reveal
              key={service.id}
              delay={index * 60}
              className="h-full"
            >
              <article className="card-soft flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[5/4] w-full bg-sand-deep">
                  <Image
                    src={asset(service.art)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-4 sm:p-6"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <Icon name={service.icon} className="h-5 w-5 text-walnut" />
                    <h3 className="font-display text-[20px] font-bold leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {service.lead}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {shown.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[14.5px] leading-snug">
                        <Icon name="check" className="mt-px h-[17px] w-[17px] shrink-0 text-brass" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {hidden > 0 && (
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : service.id)}
                      aria-expanded={expanded}
                      className="mt-auto flex cursor-pointer items-center gap-2 pt-6 text-[14.5px] font-semibold text-walnut warm-transition hover:text-walnut-deep"
                    >
                      {expanded ? "Свернуть" : `Ещё ${hidden} ${hidden === 1 ? "пункт" : "пункта"}`}
                      <Icon
                        name="chevron"
                        className={`h-4 w-4 warm-transition ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
