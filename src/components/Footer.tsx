import { COMPANY, TEL_URL, WHATSAPP_URL } from "@/lib/company";

export function Footer() {
  return (
    <footer className="bg-primary-deep pb-28 pt-12 text-on-primary lg:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[17px] font-bold">{COMPANY.name}</p>
          <p className="mt-2.5 text-[14px] leading-relaxed text-on-primary/70">
            {COMPANY.tagline} в {COMPANY.city}е
            <span className="block">
              {COMPANY.address}, {COMPANY.postcode}. {COMPANY.hours}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-semibold">
          <a
            href={TEL_URL}
            className="cursor-pointer tabular-nums flat-transition hover:text-accent"
          >
            {COMPANY.phone}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flat-transition hover:text-accent"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-on-primary/20 px-4 pt-6 text-[12px] leading-relaxed text-on-primary/50 sm:px-6">
        Демонстрационная версия сайта. Сведения об услугах, ценах, оценке и часах
        работы взяты из карточки компании на Яндекс Картах и требуют подтверждения
        владельцем.
      </div>
    </footer>
  );
}
