import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { COMPANY, MAP_URL, TEL_URL, VIBER_URL, WHATSAPP_URL } from "@/lib/company";

export function Contacts() {
  return (
    <section id="contacts" className="border-t border-border bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
            Контакты
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
            Как с нами связаться
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="h-full">
            <div className="flex h-full flex-col border border-border p-6">
              <Icon name="pin" className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-[15px] font-bold">Адрес</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {COMPANY.city}, {COMPANY.address}
                <span className="block">{COMPANY.postcode}</span>
              </p>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex cursor-pointer items-center gap-1.5 pt-5 text-[14px] font-bold text-primary flat-transition hover:text-accent"
              >
                Построить маршрут
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={60} className="h-full">
            <div className="flex h-full flex-col border border-border p-6">
              <Icon name="phone" className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-[15px] font-bold">Телефон</h3>
              <a
                href={TEL_URL}
                className="mt-2 block cursor-pointer text-[15px] font-semibold tabular-nums flat-transition hover:text-accent"
              >
                {COMPANY.phone}
              </a>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer border border-border px-3.5 py-2 text-[13px] font-semibold flat-transition hover:border-primary hover:text-primary"
                >
                  WhatsApp
                </a>
                <a
                  href={VIBER_URL}
                  className="cursor-pointer border border-border px-3.5 py-2 text-[13px] font-semibold flat-transition hover:border-primary hover:text-primary"
                >
                  Viber
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col border border-border p-6">
              <Icon name="clock" className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-[15px] font-bold">Часы работы</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Ежедневно
                <span className="block font-semibold tabular-nums text-foreground">
                  {COMPANY.opensAt}–{COMPANY.closesAt}
                </span>
              </p>
              <p className="mt-auto pt-5 text-[13px] leading-relaxed text-muted-foreground">
                Сообщения в WhatsApp читаем и после закрытия.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180} className="h-full">
            <div className="flex h-full flex-col border border-border p-6">
              <Icon name="building" className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-[15px] font-bold">Направления</h3>
              <ul className="mt-2 space-y-2 text-[14px] leading-snug text-muted-foreground">
                {COMPANY.categories.map((category) => (
                  <li key={category} className="flex gap-2">
                    <Icon name="check" className="mt-px h-4 w-4 shrink-0 text-accent" />
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
