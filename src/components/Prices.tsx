import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { PRICES, PRICE_DISCLAIMER } from "@/lib/services";
import { WHATSAPP_URL } from "@/lib/company";

export function Prices() {
  return (
    <section id="prices" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
            Стоимость
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
            Примеры цен
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">
            {PRICE_DISCLAIMER}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex cursor-pointer items-center gap-2 bg-primary px-6 py-3.5 text-[15px] font-bold text-on-primary flat-transition hover:bg-accent hover:text-on-accent"
          >
            Опишите задачу — посчитаем
            <Icon name="arrow" className="h-[18px] w-[18px]" />
          </a>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {PRICES.map((item, index) => (
            <Reveal key={item.title} delay={index * 70} className="h-full">
              <article className="flex h-full flex-col border border-border bg-card p-6">
                <h3 className="text-[17px] font-bold leading-snug">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
                <p className="mt-auto pt-6 font-display text-[28px] font-bold leading-none text-primary">
                  {item.price}
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={140} className="sm:col-span-2">
            <p className="border border-border bg-muted px-6 py-5 text-[14px] leading-relaxed text-muted-foreground">
              Остальные работы считаем по объёму после осмотра: площадь, состояние
              помещения и материалы меняют сумму сильнее всего.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
