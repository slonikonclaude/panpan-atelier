import { About } from "@/components/About";
import { Bakery } from "@/components/Bakery";
import { Breakfast } from "@/components/Breakfast";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Menu } from "@/components/Menu";
import { Place } from "@/components/Place";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import type { Locale } from "@/lib/dictionaries";

/**
 * Порядок секций — DESIGN.md §7; тон чередуется: мука, мука, сосна, мука, сосна, какао,
 * сосна, мука, корочка в конце (hero и «La casa» — обе мука, между ними линия). Обе языковые страницы собираются из одного компонента.
 */
export function Landing({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd locale={locale} />
      <Header locale={locale} />
      <main id="contenido" className="flex-1">
        <Hero locale={locale} />
        <About locale={locale} />
        <Breakfast locale={locale} />
        <Menu locale={locale} />
        <Bakery locale={locale} />
        <Place locale={locale} />
        <Reviews locale={locale} />
        <Visit locale={locale} />
        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
