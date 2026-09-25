import { Reveal } from "./Reveal";
import { COMPANY, MAP_URL, TEL_URL, VIBER_URL, WHATSAPP_URL } from "@/lib/company";

export function Contacts() {
  return (
    <section id="contacts" className="bg-concrete py-20 text-plaster sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
            Контакты
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px border seam-dark bg-concrete-line sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="bg-concrete p-6 sm:p-7">
            <p className="text-[13px] text-plaster/50">Адрес</p>
            <p className="mt-2.5 text-[15px] leading-relaxed">
              {COMPANY.city}, {COMPANY.address}
              <span className="block text-plaster/50">{COMPANY.postcode}</span>
            </p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 border-b border-brass/40 pb-0.5 text-[14px] text-brass-bright transition-colors hover:border-brass-bright"
            >
              Построить маршрут
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>

          <Reveal className="bg-concrete p-6 sm:p-7" delay={70}>
            <p className="text-[13px] text-plaster/50">Телефон</p>
            <a href={TEL_URL} className="mt-2.5 block text-[15px] tabular-nums hover:text-brass-bright">
              {COMPANY.phone}
            </a>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-tile border border-plaster/20 px-3.5 py-2 text-[13px] transition-colors hover:border-brass hover:text-brass-bright"
              >
                WhatsApp
              </a>
              <a
                href={VIBER_URL}
                className="rounded-tile border border-plaster/20 px-3.5 py-2 text-[13px] transition-colors hover:border-brass hover:text-brass-bright"
              >
                Viber
              </a>
            </div>
          </Reveal>

          <Reveal className="bg-concrete p-6 sm:p-7" delay={140}>
            <p className="text-[13px] text-plaster/50">Часы работы</p>
            <p className="mt-2.5 text-[15px] leading-relaxed">
              Ежедневно
              <span className="block tabular-nums">
                {COMPANY.opensAt}–{COMPANY.closesAt}
              </span>
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-plaster/50">
              Сообщения в WhatsApp читаем и после закрытия.
            </p>
          </Reveal>

          <Reveal className="bg-concrete p-6 sm:p-7" delay={210}>
            <p className="text-[13px] text-plaster/50">Направления</p>
            <ul className="mt-2.5 space-y-1.5 text-[14px] leading-snug">
              {COMPANY.categories.map((category) => (
                <li key={category} className="flex gap-2.5">
                  <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-brass" />
                  {category}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
