import Image from "next/image";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StatStrip from "@/components/ui/StatStrip";
import { reveal, slide } from "@/components/ui/reveal";
import { about, type Pillar } from "@/content/about";

const icons: Record<Pillar["icon"], ReactNode> = {
  shield: (
    <>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  gem: (
    <>
      <path d="M6 3h12l3 6-9 12L3 9z" />
      <path d="M3 9h18M12 3v18" opacity=".5" />
    </>
  ),
  compass: (
    <>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10l4 7M12 10L8 17" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-4 3-7 7-7s7 3 7 7" />
      <path d="M16 3.5a4 4 0 0 1 0 7.3M17 21c0-3-1.5-5.5-4-6.6" />
    </>
  ),
};

/** Who We Are: centred heading, a large serif statement and the figures. */
export function StorySection() {
  const { eyebrow, title, quote, body, stats } = about.story;
  return (
    <section className="relative py-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-12" />
        <div className="mx-auto max-w-[760px]" {...reveal()}>
          <p className="font-display text-[clamp(1.45rem,2.4vw,1.85rem)] leading-normal text-ink">
            {quote}
          </p>
          <p className="lede mt-5">{body}</p>
        </div>
        <div className="mt-12">
          <StatStrip stats={stats} />
        </div>
      </Container>
    </section>
  );
}

/** Four values with gold-framed icons that fill on hover. */
export function PillarsSection() {
  const { eyebrow, title, items } = about.pillars;
  return (
    <section className="relative pb-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-12" />
        <ul className="mt-12 grid gap-8 min-[760px]:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.title} {...reveal(i * 90)}>
              <div
                data-sketch-hover=""
                className="group h-full border-t border-ink pt-7 transition-[translate,border-color] duration-400 ease-marabu hover:-translate-y-[5px] hover:border-gold-deep"
              >
                <span
                  aria-hidden="true"
                  className="grid size-[58px] place-items-center border-[1.5px] border-gold text-gold-deep transition-colors duration-350 group-hover:bg-gold group-hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-[30px]"
                  >
                    {icons[item.icon]}
                  </svg>
                </span>
                <h3 className="mt-4 mb-2 text-[1.4rem]">{item.title}</h3>
                <p className="text-[0.93rem] text-ink-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Vision · Mission · Values cards. */
export function CompassSection() {
  const { eyebrow, title, items } = about.compass;
  return (
    <section className="relative pb-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-12" />
        <ul className="mt-12 grid gap-8 min-[900px]:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.kicker} {...reveal(i * 100)}>
              <div className="h-full border border-t-4 border-line border-t-gold bg-ivory p-9 transition-[translate,box-shadow] duration-400 ease-marabu hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(38,43,49,0.12)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                  {item.kicker}
                </p>
                <h3 className="mt-[0.6rem] mb-[0.8rem] text-[1.75rem]">{item.title}</h3>
                <p className="text-ink-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Alternating dashed-line timeline, then the drafting-desk panel. */
export function TimelineSection() {
  const { eyebrow, title, description, milestones } = about.timeline;
  const { desk } = about;
  return (
    <section id="timeline" className="relative scroll-mt-24 overflow-x-clip py-section">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mb-12"
        />

        <ol className="relative mx-auto mt-12 max-w-[980px] before:absolute before:inset-y-0 before:left-3 before:border-l-2 before:border-dashed before:border-[rgb(168_116_32/0.45)] min-[821px]:before:left-1/2">
          {milestones.map((m, i) => (
            <li
              key={m.year}
              className="group relative w-full pb-[2.8rem] pl-[2.6rem] [--slide-distance:-70px] min-[821px]:w-1/2 min-[821px]:pb-[3.4rem] min-[821px]:odd:pr-12 min-[821px]:odd:pl-0 min-[821px]:odd:text-right min-[821px]:even:left-1/2 min-[821px]:even:pl-12"
              data-sketch-hover=""
              {...slide(i % 2 === 0 ? "l" : "r")}
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-[5.5px] z-[1] size-[13px] rotate-45 bg-gold shadow-[0_0_0_5px_var(--color-cream)] min-[821px]:group-odd:-right-2 min-[821px]:group-odd:left-auto min-[821px]:group-even:-left-2"
              />
              <b className="block font-display text-[2.1rem] leading-none font-medium text-gold-deep">
                {m.year}
              </b>
              <h3 className="mt-[0.4rem] mb-2 text-[1.5rem]">{m.title}</h3>
              <p className="text-[0.95rem] text-ink-muted">{m.description}</p>
              {m.hand && <span className="hand-tag mt-2 block text-[1.15rem]">{m.hand}</span>}
            </li>
          ))}
        </ol>

        <div
          data-sketch-hover=""
          className="mt-12 grid items-center gap-12 border border-t-4 border-line border-t-gold bg-ivory p-7 shadow-[0_24px_55px_rgba(38,43,49,0.1)] min-[861px]:grid-cols-[340px_1fr] min-[861px]:p-11"
          {...reveal()}
        >
          <div className="border border-line bg-cream p-3">
            <div className="relative aspect-[4/5]">
              <Image
                src={desk.image.src}
                alt={desk.image.alt}
                fill
                sizes="(min-width: 861px) 316px, 90vw"
                className="object-cover [filter:sepia(0.12)_contrast(1.05)]"
              />
            </div>
          </div>
          <div>
            <h3 className="text-[2rem]">{desk.title}</h3>
            <p className="mt-2 mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold-deep">
              {desk.role}
            </p>
            <span className="hand-tag mb-4 block text-[1.55rem]">{desk.hand}</span>
            <p className="lede">{desk.description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={desk.primary.href}>{desk.primary.label}</Button>
              <Button href={desk.secondary.href} variant="secondary">
                {desk.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
