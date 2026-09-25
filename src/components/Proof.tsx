import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { COMPANY } from "@/lib/company";

/** Блок доверия: только то, что подтверждает карточка компании. */
const FACTS = [
  {
    icon: "star" as const,
    value: "4,5 из 5",
    label: `на Яндекс Картах, ${COMPANY.reviewCount} оценок`,
  },
  {
    icon: "tile" as const,
    value: `${COMPANY.photoCount} фото`,
    label: "работ в карточке компании",
  },
  {
    icon: "clock" as const,
    value: "09:00–21:00",
    label: "ежедневно, без выходных",
  },
  {
    icon: "pin" as const,
    value: COMPANY.city,
    label: `${COMPANY.address}`,
  },
];

export function Proof() {
  return (
    <section className="border-b border-border bg-card">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border px-4 sm:px-6 lg:grid-cols-4">
        {FACTS.map((fact, index) => (
          <Reveal
            as="li"
            key={fact.value}
            delay={index * 60}
            className="flex items-start gap-3 bg-card px-1 py-6 sm:px-4 sm:py-8"
          >
            <Icon name={fact.icon} className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-[17px] font-bold leading-tight">{fact.value}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                {fact.label}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
