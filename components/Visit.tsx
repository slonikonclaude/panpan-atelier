import { HoursTable } from "@/components/HoursTable";
import { MapEmbed } from "@/components/MapEmbed";
import { PopularTimes } from "@/components/PopularTimes";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconDirections, IconExternal, IconInstagram, IconPhone, IconPin } from "@/components/icons";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";

/**
 * «Visítanos» (DESIGN.md §7.8): часы Google с оговоркой про летние выходные, адрес и
 * контакты, «encargos» по телефону (их Instagram), удобства, «Cuándo venir» по
 * «Horas punta» и карта Google по клику (components/MapEmbed.tsx).
 */
export function Visit({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const v = dict.visit;
  const a = restaurant.address;
  const outline =
    "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-cocoa/30 px-6 font-bold text-cocoa transition-colors duration-200 hover:border-cocoa";

  return (
    <Section id="visitanos" tone="light" eyebrow={v.eyebrow} title={v.title} note={v.near}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-11">
          <div>
            <h3 className="eyebrow text-crust-deep">{v.hours}</h3>
            <div className="mt-4">
              <HoursTable locale={locale} />
            </div>
            <p className="mt-4 max-w-[48ch] text-[0.92rem] text-muted">{v.hoursNote}</p>
          </div>

          <div>
            <h3 className="eyebrow text-crust-deep">{v.contact}</h3>
            <address className="mt-4 flex flex-col gap-3 not-italic text-cocoa">
              <span className="flex items-start gap-3">
                <IconPin width={19} height={19} className="mt-1 shrink-0 text-crust-deep" />
                <span>
                  {a.street}
                  <br />
                  {a.postalCode} {a.city} · {a.district}
                </span>
              </span>
              <a href={`tel:${restaurant.phone.tel}`} className="tabular inline-flex min-h-11 items-center gap-3 underline decoration-line underline-offset-4 hover:decoration-crust">
                <IconPhone width={19} height={19} className="shrink-0 text-crust-deep" />
                {restaurant.phone.display}
              </a>
              <a
                href={restaurant.instagram.url}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-3 underline decoration-line underline-offset-4 hover:decoration-crust"
              >
                <IconInstagram width={19} height={19} className="shrink-0 text-crust-deep" />@{restaurant.instagram.handle}
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
            </address>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={restaurant.directionsUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-crust px-6 font-bold text-cocoa transition-colors duration-200 hover:bg-crust-soft"
              >
                <IconDirections width={18} height={18} />
                {dict.cta.directions}
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
              <a href={`tel:${restaurant.phone.tel}`} className={`tabular ${outline}`}>
                <IconPhone width={17} height={17} />
                {dict.cta.callLong(restaurant.phone.display)}
              </a>
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-crust-deep">{v.orders}</h3>
            <p className="mt-3 max-w-[48ch] text-cocoa">{v.ordersText(restaurant.phone.display)}</p>
          </div>

          <div>
            <h3 className="eyebrow text-crust-deep">{v.services}</h3>
            <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-3 sm:grid-cols-2">
              {restaurant.services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-cocoa">
                  <ServiceIcon name={s} width={20} height={20} className="shrink-0 text-crust-deep" />
                  {v.serviceLabels[s]}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.92rem] text-muted">{v.noDelivery}</p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-12">
          <Reveal delay={0.06}>
            <h3 className="eyebrow text-crust-deep">{v.busyTitle}</h3>
            <div className="mt-5">
              <PopularTimes locale={locale} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-4">
            <MapEmbed locale={locale} />
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-cocoa underline decoration-crust underline-offset-4 hover:decoration-2"
            >
              <IconExternal width={16} height={16} />
              {v.openMaps}
              <span className="sr-only"> {dict.cta.newTab}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
