import { Img } from "@/components/Img";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos, type PhotoKey } from "@/lib/photos";

/**
 * «Del obrador» (DESIGN.md §7.5): витрина крупно и шесть квадратов — выпечка и
 * сладкое с их стоек. Шесть делится и на 2, и на 3 колонки — без дыр в сетке.
 * Подписи только о том, что видно и названо на их ценниках/досках; цены — в карте.
 */
const TILES: PhotoKey[] = ["cruasan", "vitrinaEmpanadillas", "donut", "tartaQueso", "cocaCalabaza", "tulipa"];

export function Bakery({ locale }: { locale: Locale }) {
  const b = getDictionary(locale).bakery;

  return (
    <Section id="obrador" tone="deep" eyebrow={b.eyebrow} title={b.title} note={b.lead}>
      <Reveal as="figure" className="overflow-hidden rounded-[2rem] bg-flour">
        <Img photo={photos.vitrinaBolleria} locale={locale} sizes="(min-width: 1280px) 1216px, 94vw" className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]" />
        <figcaption className="px-5 py-4 text-[0.92rem] text-muted sm:px-7">{b.featureCaption}</figcaption>
      </Reveal>

      <RevealGroup as="ul" className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {TILES.map((key) => (
          <RevealItem as="li" key={key}>
            <figure>
              <div className="overflow-hidden rounded-[1.25rem] bg-flour">
                <Img photo={photos[key]} locale={locale} sizes="(min-width: 768px) 400px, 46vw" className="aspect-square w-full object-cover" />
              </div>
              <figcaption className="mt-2.5 font-display text-[1.1rem] leading-snug text-cocoa sm:text-[1.2rem]">{b.tiles[key as keyof typeof b.tiles]}</figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
