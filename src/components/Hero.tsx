import Image from "next/image";
import { Icon } from "./Icon";
import { COMPANY, TEL_URL, WHATSAPP_URL } from "@/lib/company";

export function Hero() {
  return (
    <section id="top" className="bg-primary-deep text-on-primary">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:grid-cols-2 lg:items-center lg:gap-14 lg:pb-20 lg:pt-36">
        <div>
          <p className="inline-flex items-center gap-2 border border-on-primary/30 px-3 py-1.5 text-[13px] font-semibold">
            <Icon name="pin" className="h-4 w-4" />
            {COMPANY.city} и ближайшие районы
          </p>

          <h1 className="mt-6 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1]">
            Ремонт квартир и санузлов под ключ
          </h1>

          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-on-primary/80 sm:text-[17px]">
            От черновой отделки до готового интерьера: плитка, сантехника, электрика,
            потолки и чистовая отделка.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap bg-accent px-6 py-4 text-[15px] font-bold text-on-accent flat-transition hover:bg-accent-hover hover:text-on-primary"
            >
              <Icon name="message" className="h-5 w-5" />
              Получить расчёт в WhatsApp
            </a>
            <a
              href="#works"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap border-2 border-on-primary/40 px-6 py-4 text-[15px] font-semibold flat-transition hover:border-on-primary"
            >
              Посмотреть работы
            </a>
          </div>

          <a
            href={TEL_URL}
            className="mt-6 inline-flex cursor-pointer items-center gap-2.5 text-[17px] font-bold tabular-nums flat-transition hover:text-accent"
          >
            <Icon name="phone" className="h-5 w-5" />
            {COMPANY.phone}
          </a>
        </div>

        <div className="relative aspect-[4/3] w-full lg:aspect-[5/6]">
          <Image
            src="/works/bath-mirror.svg"
            alt="Ванная после ремонта: зеркало с подсветкой и плитка"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <p className="absolute bottom-0 left-0 bg-accent px-5 py-3.5 text-[15px] font-bold text-on-accent">
            Ванная под ключ — от 75 000 ₽
          </p>
        </div>
      </div>
    </section>
  );
}
