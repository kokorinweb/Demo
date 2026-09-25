import Image from "next/image";
import { asset } from "@/lib/assets";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { WORKS } from "@/lib/services";

export function Works() {
  return (
    <section id="works" className="bg-sand-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Что делаем"
          title={
            <>
              Задачи, с которыми к нам
              <br />
              приходят чаще всего
            </>
          }
          lead="Мокрая зона, потолки и электрика — три четверти заказов. Ниже то, что делаем каждую неделю."
        />

        <ul className="snap-row -mx-4 mt-11 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {WORKS.map((work, index) => (
            <Reveal
              as="li"
              key={work.src}
              delay={index * 50}
              className="w-[80vw] shrink-0 sm:w-auto"
            >
              <figure className="group card-soft card-lift hover:card-lift-hover h-full overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                  <Image
                    src={asset(work.src)}
                    alt={work.alt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                    className="card-art object-contain p-4 sm:p-6"
                  />
                </div>
                <figcaption className="px-6 py-5">
                  <p className="text-[16px] font-bold warm-transition group-hover:text-walnut">{work.caption}</p>
                  <p className="mt-1.5 text-[14px] leading-snug text-ink-soft">{work.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <p className="mt-7 text-[13.5px] leading-relaxed text-ink-soft">
          В демо-версии вместо фотографий — иллюстрации. Подписи соответствуют реальным
          снимкам из карточки компании, файлы заменяются без правок кода.
        </p>
      </div>
    </section>
  );
}
