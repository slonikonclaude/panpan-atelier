import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { Espiga, Wordmark } from "@/components/Logo";
import { getDictionary } from "@/lib/dictionaries";
import { hrefFor } from "@/lib/site";
import "./globals.css";

/**
 * Глобальная 404 для GitHub Pages (`out/404.html`). У сайта два корневых
 * layout-а ((es) и (en)), поэтому обычный not-found собрать не из чего —
 * `global-not-found` обходит layout-ы и приносит оболочку сам. Текст на двух
 * языках: по адресу не понять, на каком языке искали страницу.
 */
export const metadata: Metadata = {
  title: "Página no encontrada · Page not found · PanPan Atelier",
  robots: { index: false },
};

export default function GlobalNotFound() {
  const es = getDictionary("es").notFound;
  const en = getDictionary("en").notFound;
  return (
    <RootShell locale="es">
      <main className="tone-light flex flex-1 items-center justify-center px-5 py-24">
        <div className="flex max-w-xl flex-col items-center text-center">
          <div className="flex items-end gap-4 text-cocoa">
            <Wordmark height={96} label="PanPan Atelier" />
            <Espiga size={48} className="mb-1 text-crust" />
          </div>
          <h1 className="mt-10 font-display text-[3rem] leading-none text-cocoa">{es.title}</h1>
          <p lang="en" className="mt-3 font-display text-[1.8rem] leading-tight text-muted">
            {en.title}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={hrefFor("es")} className="inline-flex min-h-12 items-center justify-center rounded-full bg-crust px-7 font-bold text-cocoa transition-colors duration-200 hover:bg-crust-soft">
              {es.home}
            </a>
            <a
              href={hrefFor("en")}
              hrefLang="en"
              lang="en"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cocoa/30 px-7 font-bold text-cocoa transition-colors duration-200 hover:border-cocoa"
            >
              {en.home}
            </a>
          </div>
        </div>
      </main>
    </RootShell>
  );
}
