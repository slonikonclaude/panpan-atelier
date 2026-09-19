import { DM_Serif_Display, Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { WORDMARK_SRC } from "@/components/Logo";
import { MotionProvider } from "@/components/MotionProvider";
import { withBase } from "@/lib/basePath";
import { getDictionary, type Locale } from "@/lib/dictionaries";

/**
 * Общая оболочка для обоих корневых layout-ов ((es) и (en)): у каждого языка
 * свой <html lang>, поэтому layout-ов два, а шрифты и body описаны один раз.
 *
 * Шрифты (DESIGN.md §6): DM Serif Display — заголовки и названия блюд (контрастная
 * тёплая антиква, как вывеска кондитерской); Nunito Sans — текст, кнопки и цены: гуманистический гротеск
 * с мягкими окончаниями, как буквы их вывески «pan pan». Subset latin: в нём все знаки испанского.
 */

const display = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const sans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);
  // Знак в шапке и h1 — CSS-маска: без предзагрузки браузер находит файл только после раскладки.
  preload(withBase(WORDMARK_SRC), { as: "image", fetchPriority: "high", crossOrigin: "anonymous" });

  return (
    <html lang={dict.htmlLang} className={`${display.variable} ${sans.variable} h-full`}>
      <head>
        {/* Без JS motion не снимает свой inline opacity:0 — блоки возвращаются на место (DESIGN.md §8). */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}@layer theme{.menu-panel[hidden]{display:block!important}[role=tablist]{display:none!important}}.menu-panel::before{content:attr(data-title);display:block;margin-bottom:1rem;font-family:var(--font-display);font-size:1.6rem}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
