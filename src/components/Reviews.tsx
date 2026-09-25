import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { REVIEWS } from "@/lib/services";
import { COMPANY } from "@/lib/company";

export function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
            Отзывы
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight">
            Что пишут клиенты
          </h2>

          <div className="mt-6 border border-border bg-card p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[40px] font-bold leading-none text-primary">
                {String(COMPANY.rating).replace(".", ",")}
              </span>
              <span className="text-[15px] font-semibold text-muted-foreground">из 5</span>
            </div>
            <div className="mt-3 flex gap-1 text-accent" aria-hidden>
              {[0, 1, 2, 3, 4].map((index) => (
                <Icon
                  key={index}
                  name="star"
                  className={`h-[18px] w-[18px] ${index === 4 ? "opacity-40" : ""}`}
                />
              ))}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              На Яндекс Картах: {COMPANY.reviewCount} оценок и {COMPANY.textReviewCount}{" "}
              текстовых отзывов.
            </p>
          </div>
        </Reveal>

        <ul className="grid gap-4">
          {REVIEWS.map((review, index) => (
            <Reveal as="li" key={review.topic} delay={index * 70}>
              <blockquote className="border border-border bg-card p-6">
                <p className="text-[13px] font-bold uppercase tracking-wider text-accent">
                  {review.topic}
                </p>
                <p className="mt-3 text-[16px] leading-relaxed">{review.text}</p>
              </blockquote>
            </Reveal>
          ))}
          <Reveal as="li" delay={220}>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Это краткий пересказ отзывов с Яндекс Карт, а не цитаты. Полные тексты
              и имена авторов — в карточке компании.
            </p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
