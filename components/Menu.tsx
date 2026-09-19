import { MenuTabs } from "@/components/MenuTabs";
import { Section } from "@/components/Section";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { menuSections } from "@/lib/menu";

/**
 * «La carta» (DESIGN.md §7.4): разделы их досок и витрины вкладками. Каждая цена —
 * с месяцем, когда её видели (lib/menu.ts); неразборчивые цены не выдумываются.
 * `overflow-x-clip` у секции (не hidden) — иначе липкая лента вкладок не держится.
 */
export function Menu({ locale }: { locale: Locale }) {
  const m = getDictionary(locale).menu;
  return (
    <Section id="carta" tone="light" eyebrow={m.eyebrow} title={m.title} note={m.lead} className="overflow-x-clip">
      <MenuTabs locale={locale} sections={menuSections} />
    </Section>
  );
}
