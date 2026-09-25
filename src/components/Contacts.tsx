import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { COMPANY, MAP_URL, TEL_URL, VIBER_URL, WHATSAPP_URL } from "@/lib/company";

const ROWS = [
  {
    icon: "pin" as const,
    label: "Адрес",
    value: `${COMPANY.city}, ${COMPANY.address}`,
    extra: COMPANY.postcode,
    link: { href: MAP_URL, text: "Открыть на Яндекс Картах", external: true },
  },
  {
    icon: "clock" as const,
    label: "Время работы",
    value: `Ежедневно с ${COMPANY.opensAt} до ${COMPANY.closesAt}`,
    extra: "Сообщения в WhatsApp читаем и после закрытия",
  },
  {
    icon: "phone" as const,
    label: "Телефон",
    value: COMPANY.phone,
    extra: "Телефон, WhatsApp и Viber",
    link: { href: TEL_URL, text: "Позвонить", external: false },
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="glow-night bg-night py-16 text-sand sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-brass">
            Контакты
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,4.4vw,2.85rem)] font-bold leading-[1.15]">
            Приезжайте
            <br />
            или напишите
          </h2>
          <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-sand/75">
            Проще всего — в WhatsApp: можно сразу прислать фото помещения и размеры,
            даже приблизительные.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-brass px-7 py-4 text-[15.5px] font-semibold text-night warm-transition hover:bg-sand"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              Написать в WhatsApp
            </a>
            <a
              href={VIBER_URL}
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-sand/25 px-7 py-4 text-[15.5px] font-semibold warm-transition hover:border-sand/60"
            >
              Viber
            </a>
          </div>
        </Reveal>

        <ul className="space-y-6">
          {ROWS.map((row, index) => (
            <Reveal as="li" key={row.label} delay={index * 70}>
              <div className="flex gap-4 border-b border-sand/12 pb-6">
                <Icon name={row.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                <div>
                  <p className="text-[13px] text-sand/55">{row.label}</p>
                  <p className="mt-1.5 text-[17px] font-semibold">{row.value}</p>
                  {row.extra && (
                    <p className="mt-1 text-[14px] text-sand/60">{row.extra}</p>
                  )}
                  {row.link && (
                    <a
                      href={row.link.href}
                      {...(row.link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="mt-2.5 inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-semibold text-brass warm-transition hover:text-sand"
                    >
                      {row.link.text}
                      <Icon name="arrow" className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
