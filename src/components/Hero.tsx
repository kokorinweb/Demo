import Image from "next/image";
import { asset } from "@/lib/assets";
import { Icon } from "./Icon";
import { COMPANY, TEL_URL, WHATSAPP_URL } from "@/lib/company";

const META = [
  { icon: "pin" as const, text: `${COMPANY.city}, ${COMPANY.address}` },
  { icon: "clock" as const, text: COMPANY.hours },
  { icon: "star" as const, text: `${String(COMPANY.rating).replace(".", ",")} на Яндекс Картах` },
];

export function Hero() {
  return (
    <section id="top" className="glow-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-36">
        <div>
          <p className="inline-flex items-center rounded-full bg-surface px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-walnut">
            {COMPANY.city} и ближайшие районы
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.25rem,6.4vw,4rem)] font-bold leading-[1.05] tracking-[-0.01em]">
            Ремонт квартир
            <br />
            и санузлов
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
            Плитка, сантехника, электрика, потолки и чистовая отделка. Берём объект
            целиком или один этап — от черновой отделки до готового интерьера.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full bg-walnut px-7 py-4 text-[15.5px] font-semibold text-sand warm-transition hover:bg-walnut-deep"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              Обсудить ремонт в WhatsApp
            </a>
            <a
              href={TEL_URL}
              className="inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full bg-surface px-7 py-4 text-[15.5px] font-semibold warm-transition hover:text-walnut"
            >
              <Icon name="phone" className="h-5 w-5 text-walnut" />
              {COMPANY.phone}
            </a>
          </div>

          <ul className="mt-9 grid gap-3 text-[15px] text-ink-soft">
            {META.map((item) => (
              <li key={item.text} className="flex items-center gap-2.5 whitespace-nowrap">
                <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0 text-walnut" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] w-full">
          <Image
            src={asset("/works/bath-mirror.svg")}
            alt="Ванная после ремонта: зеркало с подсветкой и тумба"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
