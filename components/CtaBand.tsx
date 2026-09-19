import { Reveal } from "@/components/Reveal";
import { IconDirections } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";

/**
 * Последний экран перед подвалом — плоскость корочки с текстом какао (5,5:1) и
 * лозунгом со стены. Одно главное действие («Cómo llegar») и звонок вторым.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section aria-labelledby="cta-title" className="tone-accent">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="cta-title" className="balance font-display text-[2.1rem] leading-tight text-cocoa sm:text-[2.6rem]">
            {dict.ctaBand.title}
          </h2>
          <p className="tabular mt-2 text-[1.05rem] text-cocoa">
            {restaurant.address.street} · {dict.hero.hours}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={restaurant.directionsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cocoa px-8 text-base font-bold text-on-dark transition-colors duration-200 hover:bg-cocoa-soft"
          >
            <IconDirections width={18} height={18} />
            {dict.cta.directions}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a
            href={`tel:${restaurant.phone.tel}`}
            className="tabular inline-flex min-h-13 items-center justify-center whitespace-nowrap rounded-full border border-cocoa/40 px-8 text-base font-bold text-cocoa transition-colors duration-200 hover:border-cocoa"
          >
            {dict.cta.callLong(restaurant.phone.display)}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
