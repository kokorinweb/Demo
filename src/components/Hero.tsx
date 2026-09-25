import Image from "next/image";
import { COMPANY, WHATSAPP_URL } from "@/lib/company";

/** Плашка доверия: всё, что подтверждено карточкой, в одном месте. */
const FACTS = [
  { value: "4,5", label: "на Яндекс Картах", note: `${COMPANY.reviewCount} оценок` },
  { value: "19", label: "фото работ", note: "в карточке компании" },
  { value: "09–21", label: "часы работы", note: "без выходных" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-concrete text-plaster">
      {/* Сетка швов на фоне — единственное украшение первого экрана. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #6b7679 1px, transparent 1px), linear-gradient(to bottom, #6b7679 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(120% 80% at 70% 0%, #000 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14 lg:pb-24 lg:pt-44">
        <div>
          <p className="mb-6 inline-flex items-center gap-2.5 border-b border-brass/50 pb-1.5 text-xs tracking-wide text-brass-bright sm:text-sm">
            {COMPANY.city} и ближайшие районы
          </p>

          <h1 className="font-display text-[clamp(1.75rem,5.6vw,3.85rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            Ремонт квартир
            <br className="hidden sm:block" /> и санузлов
            <span className="text-brass-bright"> под ключ</span>
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-plaster/70 sm:text-base">
            От черновой отделки до готового интерьера: плитка, сантехника, электрика,
            потолки и чистовая отделка.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen inline-flex items-center justify-center gap-2.5 rounded-tile bg-brass px-7 py-4 text-[15px] font-medium text-plaster transition-all duration-300 hover:bg-brass-bright hover:shadow-[0_10px_40px_-12px_rgba(203,157,80,0.7)]"
            >
              Получить расчёт в WhatsApp
            </a>
            <a
              href="#works"
              className="group inline-flex items-center justify-center gap-2.5 rounded-tile border border-plaster/25 px-7 py-4 text-[15px] transition-colors hover:border-plaster/60"
            >
              Посмотреть работы
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 border-t seam-dark">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="border-r px-3 py-5 first:pl-0 last:border-r-0 seam-dark sm:px-5"
              >
                <dt className="font-display text-xl font-medium text-plaster sm:text-2xl">
                  {fact.value}
                </dt>
                <dd className="mt-1.5 text-[12px] leading-snug text-plaster/60 sm:text-[13px]">
                  {fact.label}
                  <span className="hidden text-plaster/40 sm:block">{fact.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="brass-edge relative aspect-[4/5] overflow-hidden rounded-tile bg-concrete-soft">
            <Image
              src="/works/bath-mirror.svg"
              alt="Ванная после ремонта: зеркало с подсветкой и плитка"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 right-10 rounded-tile border border-brass/30 bg-concrete/95 px-5 py-4 backdrop-blur sm:-left-8 sm:right-auto sm:w-64">
            <p className="text-[13px] leading-snug text-plaster/75">
              Ванная под ключ — <span className="text-brass-bright">от 75 000 ₽</span>.
              Точная сумма после осмотра.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
