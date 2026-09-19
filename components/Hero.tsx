import { Img } from "@/components/Img";
import { Espiga, Wordmark } from "@/components/Logo";
import { Stars } from "@/components/Stars";
import { IconClock, IconDirections } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatCount, formatPrice, formatRating } from "@/lib/format";
import { breakfastFrom } from "@/lib/menu";
import { photos } from "@/lib/photos";
import { restaurant } from "@/lib/restaurant";

/**
 * Первый экран (DESIGN.md §7.1). Слева их знак «pan / pan» и лозунг со стены зала
 * «Saborea la vida… sin prisa»; справа — стол у витрины на Гран-Виа с их вывеской в окне.
 * На телефоне фото под текстом, выше сгиба остаются имя, лозунг и кнопки.
 *
 * Без скролловой анимации: первый экран и так в кадре, а `opacity:0` из SSR
 * держал бы h1 и кнопки невидимыми до гидратации (и откладывал LCP).
 * `data-hero` — для временного CSS при съёмке headless.
 */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const h = dict.hero;

  return (
    <section data-hero="" aria-labelledby="hero-title" className="tone-light relative overflow-hidden pt-18">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-20">
        <div className="max-w-xl">
          <h1 id="hero-title" className="flex items-end gap-5 text-cocoa">
            <Wordmark markClassName="h-28 sm:h-37" label={restaurant.shortName} />{" "}
            <span className="flex flex-col gap-3 pb-1">
              <Espiga size={44} className="text-crust" />
              <span className="eyebrow text-cocoa">Atelier</span>
            </span>
          </h1>

          <p className="eyebrow mt-8 flex items-center gap-3 text-crust-deep">{h.eyebrow}</p>
          <p className="balance mt-4 font-display text-[2.3rem] leading-[1.08] text-cocoa sm:text-[3.2rem]">{h.claim}</p>
          <p className="mt-5 max-w-[46ch] text-[1.08rem] leading-relaxed text-muted">{h.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#carta"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-crust px-8 text-base font-bold text-cocoa transition-colors duration-200 hover:bg-crust-soft"
            >
              {dict.cta.seeMenu}
            </a>
            <a
              href={restaurant.directionsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-cocoa/30 px-8 text-base font-bold text-cocoa transition-colors duration-200 hover:border-cocoa"
            >
              <IconDirections width={18} height={18} />
              {dict.cta.directions}
              <span className="sr-only"> {dict.cta.newTab}</span>
            </a>
          </div>

          <dl className="mt-10 grid gap-2.5 border-t border-line pt-6 text-[0.97rem] text-muted">
            <div>
              <dt className="sr-only">Google</dt>
              <dd className="tabular flex items-center gap-2.5">
                <Stars value={restaurant.rating.value} idPrefix="hero" size={15} className="text-crust" />
                {h.rating(formatRating(restaurant.rating.value, locale), formatCount(restaurant.rating.count, locale))}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{dict.visit.hours}</dt>
              <dd className="tabular flex items-center gap-2.5">
                <IconClock width={17} height={17} className="text-crust-deep" />
                {h.hours}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{dict.nav.breakfast}</dt>
              <dd className="tabular flex items-center gap-2.5">
                <span aria-hidden="true" className="ml-0.5 inline-block h-3.5 w-3.5 rounded-full border-2 border-crust" />
                {h.from(formatPrice(breakfastFrom.price, locale), breakfastFrom.year)}
              </dd>
            </div>
          </dl>
        </div>

        <figure className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-pine">
            <Img
              photo={photos.hero}
              locale={locale}
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 48vw, (min-width: 600px) 544px, 92vw"
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-cocoa p-4 text-wheat shadow-none sm:block">
            <Espiga size={72} />
          </div>
          <figcaption className="mt-4 text-right text-[0.88rem] text-muted sm:mt-5">{h.photoCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
