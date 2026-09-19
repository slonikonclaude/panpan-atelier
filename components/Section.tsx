import type { ReactNode } from "react";
import { Espiga } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";

export type Tone = "light" | "deep" | "dark";

/**
 * Оболочка секции: надзаголовок капсом со «стежком» колоса, заголовок Young Serif,
 * абзац-подводка. Заголовок всегда h2 — h1 один и живёт в hero.
 * Тон чередуется: мука, сосна, какао фасада (DESIGN.md §5). Надзаголовок корочкой
 * только на муке: на сосне crust-deep даёт 4,3:1 — там он какао, на какао — пшеница.
 */
export function Section({
  id,
  eyebrow,
  title,
  note,
  tone = "light",
  children,
  headerRight,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: ReactNode;
  tone?: Tone;
  children: ReactNode;
  headerRight?: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`tone-${tone} relative py-20 sm:py-28 ${className}`}>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal as="header" className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <p className={`eyebrow flex items-center gap-3 ${dark ? "text-wheat" : tone === "deep" ? "text-cocoa" : "text-crust-deep"}`}>
                <Espiga size={18} className={dark ? "text-wheat" : "text-crust"} />
                {eyebrow}
              </p>
              <h2
                id={`${id}-title`}
                className={`balance mt-5 font-display text-[2.3rem] leading-[1.08] tracking-[-0.01em] sm:text-[3.2rem] ${dark ? "text-on-dark" : "text-cocoa"}`}
                style={{ maxInlineSize: "18ch" }}
              >
                {title}
              </h2>
            </div>
            {headerRight}
          </div>
          {note ? <p className={`mt-6 max-w-[60ch] text-lg leading-relaxed ${dark ? "text-on-dark-muted" : "text-muted"}`}>{note}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
