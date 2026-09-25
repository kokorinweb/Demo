import Image from "next/image";
import { Reveal } from "./Reveal";
import { WORKS } from "@/lib/services";
import { COMPANY } from "@/lib/company";

export function Works() {
  return (
    <section id="works" className="border-y border-border bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
              Портфолио
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
              Примеры работ
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Спальни с подсветкой, санузлы в плитке, душевые, декоративная отделка
              стен и электрика.
            </p>
          </div>
          <p className="text-[14px] font-semibold text-muted-foreground">
            {COMPANY.photoCount} фотографий в карточке
          </p>
        </Reveal>

        {/* Телефон: лента с прилипанием. Десктоп: ровная сетка. */}
        <ul className="snap-row -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {WORKS.map((work, index) => (
            <Reveal
              as="li"
              key={work.src}
              delay={index * 50}
              className="group w-[78vw] shrink-0 sm:w-auto"
            >
              <figure className="border border-border">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-[14px] font-semibold flat-transition group-hover:bg-primary group-hover:text-on-primary">
                  {work.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
          В демо-версии на месте фотографий стоят заглушки. Подписи соответствуют
          реальным снимкам из карточки — заменить файлы можно без правок кода.
        </p>
      </div>
    </section>
  );
}
