import type { SVGProps } from "react";
import { Img } from "@/components/Img";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconAvocado, IconCup, IconFruitCup, IconHam, IconJar, IconJuice, IconToast, IconTomato } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatPhotoDate, formatPrice } from "@/lib/format";
import { breakfastNotes, breakfasts, type ComboIcon } from "@/lib/menu";
import { photos } from "@/lib/photos";

/**
 * «Desayunos» (DESIGN.md §7.3) — как на их досках: пиктограммы через «+» и цена
 * комбо. Иконки декоративные, состав продублирован текстом под каждой. Доска
 * говорит «hasta las 11:00h» — это в надзаголовке секции.
 */
const ICONS: Record<ComboIcon, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  cup: IconCup,
  juice: IconJuice,
  toast: IconToast,
  tomato: IconTomato,
  jar: IconJar,
  ham: IconHam,
  avocado: IconAvocado,
  fruit: IconFruitCup,
};

export function Breakfast({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).breakfast;

  return (
    <Section id="desayunos" tone="deep" eyebrow={d.eyebrow} title={d.title} note={d.lead}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
        <RevealGroup as="ul" className="flex flex-col gap-5">
          {breakfasts.map((c) => (
            <RevealItem as="li" key={c.id} className="rounded-[1.5rem] border border-line bg-flour p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-display text-[1.9rem] leading-tight text-cocoa">{c.name[locale]}</h3>
                {c.price !== null ? <p className="tabular font-display text-[1.9rem] leading-none text-crust-deep">{formatPrice(c.price, locale)}</p> : null}
              </div>

              <ol aria-hidden="true" className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3 text-cocoa">
                {c.parts.map((part, i) => {
                  const Icon = ICONS[part.icon];
                  return (
                    <li key={i} className="flex items-center gap-2">
                      {i > 0 ? <span className="text-[1.2rem] text-crust-deep">+</span> : null}
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-pine">
                        <Icon width={24} height={24} />
                        {part.size ? (
                          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-crust text-[0.68rem] font-bold text-cocoa">{part.size}</span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-5 text-cocoa">{c.parts.map((part) => part.label[locale]).join(" + ")}</p>
              <p className="mt-3 text-[0.85rem] text-muted">{d.seen(formatPhotoDate(c.seen, locale))}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="flex flex-col gap-5">
          <div className="grid grid-cols-2 items-start gap-4">
            <div className="overflow-hidden rounded-[1.5rem] bg-flour">
              <Img photo={photos.desayuno} locale={locale} sizes="(min-width: 1024px) 260px, 46vw" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="mt-10 overflow-hidden rounded-[1.5rem] bg-flour">
              <Img photo={photos.tostadaTomate} locale={locale} sizes="(min-width: 1024px) 260px, 46vw" className="aspect-[3/4] w-full object-cover" />
            </div>
          </div>
          <ul className="flex flex-col gap-2 text-[0.95rem] text-cocoa">
            {breakfastNotes.map((n) => (
              <li key={n.es} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-crust-deep" />
                {n[locale]}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
