import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos, type PhotoKey } from "@/lib/photos";

/**
 * «El local» (DESIGN.md §7.6): зал и фасад — сосна с лозунгом, пол «кубами», барра,
 * окно на Гран-Виа, терраса. Раскладка колонками (masonry): у кадров разные пропорции,
 * а CSS columns не оставляют дыр при любом их числе. Подписи — под каждым кадром.
 */
const ORDER: PhotoKey[] = ["rincon", "fachada", "ventanal", "barra", "terraza", "hornacinas", "fachadaCalle", "esquina"];

export function Place({ locale }: { locale: Locale }) {
  const pl = getDictionary(locale).place;

  return (
    <Section id="local" tone="dark" eyebrow={pl.eyebrow} title={pl.title} note={pl.lead}>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {ORDER.map((key) => (
          <Reveal key={key} as="figure" className="mb-4 break-inside-avoid">
            <div className="overflow-hidden rounded-[1.25rem] bg-cocoa-soft">
              <Img photo={photos[key]} locale={locale} sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw" className="h-auto w-full" />
            </div>
            <figcaption className="mt-2.5 text-[0.9rem] text-on-dark-muted">{pl.captions[key as keyof typeof pl.captions]}</figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
