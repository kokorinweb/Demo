import { COMPANY, TEL_URL, WHATSAPP_URL } from "@/lib/company";

export function Footer() {
  return (
    <footer className="bg-night pb-28 pt-12 text-sand/70 lg:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 border-t border-sand/12 pt-10 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-walnut text-[17px] font-bold text-sand">
              R
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[17px] font-bold text-sand">
                RemontHouseRoom
              </span>
              <span className="block text-[13px]">
                {COMPANY.tagline} · {COMPANY.city}
              </span>
            </span>
          </div>

          <div className="text-[14px] leading-relaxed">
            {COMPANY.city}, {COMPANY.address}, {COMPANY.postcode}
            <span className="block">{COMPANY.hours}</span>
            <span className="mt-2 block">
              <a href={TEL_URL} className="font-semibold text-sand hover:text-brass">
                {COMPANY.phone}
              </a>
              {" — телефон, "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sand hover:text-brass"
              >
                WhatsApp
              </a>
              {" и Viber"}
            </span>
          </div>
        </div>

        <p className="mt-10 border-t border-sand/12 pt-6 text-[12.5px] leading-relaxed text-sand/45">
          Демонстрационная версия сайта. Сведения об услугах, ценах, оценке и часах
          работы взяты из карточки компании на Яндекс Картах и требуют подтверждения
          владельцем.
        </p>
      </div>
    </footer>
  );
}
