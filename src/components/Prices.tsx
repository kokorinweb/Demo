import { Reveal } from "./Reveal";
import { PRICES, PRICE_DISCLAIMER } from "@/lib/services";
import { WHATSAPP_URL } from "@/lib/company";

export function Prices() {
  return (
    <section id="prices" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
            Примеры цен
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {PRICE_DISCLAIMER}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 border-b border-brass/40 pb-1 text-[15px] text-brass transition-colors hover:border-brass"
          >
            Опишите задачу — посчитаем
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>

        <div className="border-t seam">
          {PRICES.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="brass-edge group flex items-baseline justify-between gap-6 border-b px-1 py-7 transition-colors duration-500 seam hover:bg-plaster-deep/50 sm:px-4">
                <div>
                  <h3 className="font-display text-lg font-medium tracking-[-0.01em] transition-colors group-hover:text-brass">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{item.note}</p>
                </div>
                <p className="shrink-0 font-display text-[clamp(1.1rem,3.4vw,1.6rem)] font-medium tabular-nums tracking-[-0.02em]">
                  {item.price}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={160}>
            <p className="px-1 py-6 text-[13px] leading-relaxed text-ink-soft sm:px-4">
              Остальные работы считаем по объёму после осмотра: площадь, состояние
              помещения и материалы меняют сумму сильнее всего.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
