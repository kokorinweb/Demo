"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { STAGES } from "@/lib/services";

export function Stages() {
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = lineRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stages" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="max-w-2xl">
        <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
          Как идёт работа
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Шесть шагов от сообщения до готового объекта. Смета и объём работ
          согласуются до начала ремонта.
        </p>
      </Reveal>

      <ol className="relative mt-12 pl-8 sm:pl-12">
        {/* Вертикальный шов, который заполняется один раз при прокрутке. */}
        <span
          aria-hidden
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-grout sm:left-[11px]"
        >
          <span ref={lineRef} className="stage-line block h-full w-full bg-brass" />
        </span>

        {STAGES.map((stage, index) => (
          <Reveal as="li" key={stage.title} delay={index * 90} className="group relative pb-9 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-8 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-grout bg-plaster transition-colors duration-500 group-hover:border-brass sm:-left-12 sm:h-[23px] sm:w-[23px]"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-grout transition-colors duration-500 group-hover:bg-brass sm:h-[7px] sm:w-[7px]" />
            </span>
            <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] transition-colors duration-300 group-hover:text-brass">
              <span className="mr-2.5 text-ink-soft tabular-nums">{index + 1}</span>
              {stage.title}
            </h3>
            <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
              {stage.text}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
