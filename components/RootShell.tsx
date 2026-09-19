import { DM_Serif_Display, Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
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

  return (
    <html lang={dict.htmlLang} className={`${display.variable} ${sans.variable} h-full`}>
      <head>
        {/* Без JS motion не снимает свой inline opacity:0 — блоки возвращаются на место (DESIGN.md §8). */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
