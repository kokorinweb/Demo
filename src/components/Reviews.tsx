import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { REVIEWS } from "@/lib/services";
import { COMPANY } from "@/lib/company";

export function Reviews() {
  return (
    <section id="reviews" className="bg-sand-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHead eyebrow="Отзывы" title="Что пишут клиенты" />
            <Reveal className="mt-8">
              <div className="card-soft p-7">
                <div className="flex items-end gap-3">
                  <span className="font-display text-[44px] font-bold leading-none text-walnut">
                    {String(COMPANY.rating).replace(".", ",")}
                  </span>
                  <span className="pb-1.5 text-[15px] text-ink-soft">из 5</span>
                </div>
                <div className="mt-4 flex gap-1.5 text-brass" aria-hidden>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Icon
                      key={index}
                      name="star"
                      className={`h-5 w-5 ${index === 4 ? "opacity-35" : ""}`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
                  На Яндекс Картах: {COMPANY.reviewCount} оценок и{" "}
                  {COMPANY.textReviewCount} текстовых отзывов.
                </p>
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-4">
            {REVIEWS.map((review, index) => (
              <Reveal as="li" key={review.topic} delay={index * 70}>
                <blockquote className="card-soft p-7">
                  <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-walnut">
                    {review.topic}
                  </p>
                  <p className="mt-3.5 text-[16.5px] leading-relaxed">{review.text}</p>
                </blockquote>
              </Reveal>
            ))}
            <Reveal as="li" delay={220}>
              <p className="px-1 text-[13.5px] leading-relaxed text-ink-soft">
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
