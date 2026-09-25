import { Reveal } from "./Reveal";
import { STAGES } from "@/lib/services";

export function Stages() {
  return (
    <section id="stages" className="border-y border-border bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
            Процесс
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
            Как идёт работа
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Шесть шагов от сообщения до готового объекта. Смета и объём работ
            согласуются до начала ремонта.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage, index) => (
            <Reveal as="li" key={stage.title} delay={index * 60} className="h-full">
              <div className="flex h-full gap-4 border border-border p-5 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-[17px] font-bold tabular-nums text-on-primary">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[16px] font-bold leading-snug">{stage.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {stage.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
