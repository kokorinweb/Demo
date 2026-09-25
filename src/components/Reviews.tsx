import { Reveal } from "./Reveal";
import { REVIEWS } from "@/lib/services";
import { COMPANY } from "@/lib/company";

export function Reviews() {
  return (
    <section id="reviews" className="bg-plaster-deep/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
              Что пишут клиенты
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-medium tabular-nums">
                {String(COMPANY.rating).replace(".", ",")}
              </span>
              <span className="text-[14px] text-ink-soft">
                из 5 на Яндекс Картах
                <span className="block">
                  {COMPANY.reviewCount} оценок, {COMPANY.textReviewCount} отзывов
                </span>
              </span>
            </div>
          </Reveal>

          <ul className="border-t seam">
            {REVIEWS.map((review, index) => (
              <Reveal as="li" key={review.topic} delay={index * 80}>
                <div className="group border-b px-1 py-7 transition-colors duration-500 seam hover:bg-plaster/60 sm:px-4">
                  <p className="text-[13px] text-brass">{review.topic}</p>
                  <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed">{review.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" delay={240}>
              <p className="px-1 pt-5 text-[12.5px] leading-relaxed text-ink-soft sm:px-4">
                Это краткий пересказ отзывов с Яндекс Карт, а не цитаты. Полные тексты
                и имена авторов — в карточке компании.
              </p>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
