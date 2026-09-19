import { Img } from "@/components/Img";
import { Espiga } from "@/components/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { Section } from "@/components/Section";
import { IconBag, IconCroissant, IconCup } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos } from "@/lib/photos";

/**
 * «La casa» (DESIGN.md §7.2): кто они — обрадор при кафетерии, хлеб на выбор для
 * тостад, лозунг «sin prisa» со стены, заказы по телефону. Каждое утверждение — из
 * их Instagram, досок и карточки Google (DESIGN.md §1). Фото — сам лозунг на сосне.
 */
export function About({ locale }: { locale: Locale }) {
  const a = getDictionary(locale).about;
  const icons = [IconCroissant, IconCup, IconBag];

  return (
    <Section id="casa" tone="light" eyebrow={a.eyebrow} title={a.title} note={a.lead} className="border-t border-line">
      <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal as="figure" className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-pine">
            <Img photo={photos.lema} locale={locale} sizes="(min-width: 1024px) 640px, 92vw" className="aspect-[5/3] w-full object-cover" />
          </div>
          <figcaption className="mt-4 flex items-start gap-3 text-[0.92rem] text-muted">
            <Espiga size={16} className="mt-1 shrink-0 text-crust" />
            <Rich text={a.photoCaption} />
          </figcaption>
        </Reveal>

        <RevealGroup as="ul" className="flex flex-col divide-y divide-line border-y border-line">
          {a.points.map((pt, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem as="li" key={pt.title} className="flex gap-5 py-6">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pine text-cocoa">
                  <Icon width={22} height={22} />
                </span>
                <div>
                  <h3 className="font-display text-[1.45rem] leading-tight text-cocoa">{pt.title}</h3>
                  <p className="mt-2 text-muted">{pt.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
