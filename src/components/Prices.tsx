import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { PRICES, PRICE_DISCLAIMER, STAGES } from "@/lib/services";
import { WHATSAPP_URL } from "@/lib/company";

export function Prices() {
  return (
    <section id="prices" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHead
        eyebrow="Стоимость и порядок"
        title={
          <>
            Сколько стоит
            <br />и как идёт работа
          </>
        }
        lead={PRICE_DISCLAIMER}
      />

      <div className="mt-11 grid gap-4 lg:grid-cols-3">
        {PRICES.map((item, index) => (
          <Reveal key={item.title} delay={index * 70} className="h-full">
            <article className="group card-soft card-lift hover:card-lift-hover flex h-full flex-col p-7">
              <h3 className="font-display text-[20px] font-bold leading-snug">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.note}</p>
              <p className="mt-auto pt-7 font-display text-[32px] font-bold leading-none text-walnut">
                {item.price}
              </p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={140} className="h-full">
          <div className="card-soft flex h-full flex-col justify-between bg-night p-7 text-sand">
            <p className="text-[15.5px] leading-relaxed text-sand/80">
              Остальное считаем по объёму после осмотра: площадь, состояние помещения
              и материалы меняют сумму сильнее всего.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-brass px-6 py-3.5 text-[15px] font-semibold text-night warm-transition hover:bg-sand"
            >
              <Icon name="whatsapp" className="h-[18px] w-[18px]" />
              Описать задачу
            </a>
          </div>
        </Reveal>
      </div>

      <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((stage, index) => (
          <Reveal as="li" key={stage.title} delay={index * 50} className="h-full">
            <div className="group card-soft card-lift hover:card-lift-hover flex h-full gap-4 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-deep font-display text-[17px] font-bold text-walnut warm-transition group-hover:bg-walnut group-hover:text-sand">
                {index + 1}
              </span>
              <div>
                <h3 className="text-[16px] font-bold leading-snug">{stage.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{stage.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
