import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  className?: string;
};

/** Шапка секции: эйбров, крупный заголовок и лид — одинаково во всех блоках. */
export function SectionHead({ eyebrow, title, lead, className = "" }: Props) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-walnut">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-[clamp(1.85rem,4.4vw,2.85rem)] font-bold leading-[1.15]">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">{lead}</p>
      )}
    </Reveal>
  );
}
