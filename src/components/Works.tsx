import Image from "next/image";
import { Reveal } from "./Reveal";
import { WORKS } from "@/lib/services";
import { COMPANY } from "@/lib/company";

export function Works() {
  return (
    <section id="works" className="bg-concrete py-20 text-plaster sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
              Примеры работ
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-plaster/65">
              Спальни с подсветкой, санузлы в плитке, душевые, декоративная отделка стен
              и электрика — то, что чаще всего заказывают.
            </p>
          </div>
          <p className="text-[13px] text-plaster/45">
            {COMPANY.photoCount} фотографий в карточке компании
          </p>
        </Reveal>

        {/* Телефон: лента с прилипанием. Десктоп: ровная сетка кадров. */}
        <ul className="snap-row mt-12 -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {WORKS.map((work, index) => (
            <Reveal
              as="li"
              key={work.src}
              delay={index * 50}
              className="group relative w-[78vw] shrink-0 sm:w-auto"
            >
              <figure className="brass-edge relative aspect-[3/4] overflow-hidden rounded-tile bg-concrete-soft sm:aspect-[4/3]">
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-concrete/90 via-concrete/25 to-transparent transition-opacity duration-500"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 px-4 pb-4 text-[13px] text-plaster/90 transition-transform duration-500 group-hover:translate-y-0">
                  {work.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-[12.5px] leading-relaxed text-plaster/40">
          В демо-версии на месте фотографий стоят заглушки. Подписи соответствуют
          реальным снимкам из карточки — заменить файлы можно без правок кода.
        </p>
      </div>
    </section>
  );
}
