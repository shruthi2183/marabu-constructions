import type { Stat } from "@/content/site";
import { reveal } from "./reveal";

// Hairline-divided figures that count up when they scroll into view
// (RevealController animates [data-count]). The real value is server-rendered
// and announced through a visually hidden label; the animated digits are
// decorative.
type StatStripProps = {
  stats: Stat[];
  /** "home": left-aligned, 4 columns from 640px. "page": centred, 4 columns from 760px. */
  variant?: "home" | "page";
};

export default function StatStrip({ stats, variant = "page" }: StatStripProps) {
  const home = variant === "home";

  return (
    <dl
      className={`grid grid-cols-2 gap-px border border-line bg-line ${home ? "sm:grid-cols-4" : "min-[760px]:grid-cols-4"}`}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col bg-cream px-6 py-7 ${home ? "" : "text-center"}`}
          {...reveal(i * (home ? 120 : 100))}
        >
          <dt className="order-2 mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
            {stat.label}
          </dt>
          <dd className="order-1 font-display text-[clamp(2.2rem,3.4vw,3rem)] leading-[1.1] text-gold-deep">
            <span className="sr-only">{stat.value}+</span>
            <span aria-hidden="true">
              <span data-count={stat.value}>{stat.value}</span>
              <span>+</span>
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
