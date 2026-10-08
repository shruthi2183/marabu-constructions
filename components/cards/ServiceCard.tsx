import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { reveal } from "@/components/ui/reveal";
import type { Service } from "@/content/services";

type ServiceCardProps = {
  service: Service;
  /** 1-based position ("Service 01"). */
  index: number;
};

const ticks = [
  "-top-px -left-px border-t-2 border-l-2",
  "-top-px -right-px border-t-2 border-r-2",
  "-bottom-px -left-px border-b-2 border-l-2",
  "-bottom-px -right-px border-b-2 border-r-2",
];

// Reference "svc-row": a framed sketch beside the service details, alternating
// sides (sketch on the right for even rows from 861px). When the service links
// to a detail page the whole row becomes the link, with the reference's hover
// lift, image zoom and "Explore the service →" cue; until then it is static.
export default function ServiceCard({ service, index }: ServiceCardProps) {
  const { title, summary, points, image, href } = service;
  const linked = Boolean(href);
  const even = index % 2 === 0;

  const body: ReactNode = (
    <>
      <div
        aria-hidden="true"
        className={`relative flex aspect-[5/4] items-center justify-center overflow-hidden border border-line bg-ivory/65 p-4 transition-[border-color,box-shadow] duration-400 ${even ? "min-[861px]:order-2" : ""} ${linked ? "group-hover:border-gold group-hover:shadow-[0_18px_40px_rgba(38,43,49,0.1)]" : ""}`}
      >
        {ticks.map((position) => (
          <span key={position} className={`absolute z-[1] size-[18px] border-0 border-gold ${position}`} />
        ))}
        {image && (
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(min-width: 861px) 45vw, 90vw"
              className={`object-cover [filter:sepia(0.15)_contrast(1.05)] transition-transform duration-500 ease-marabu ${linked ? "group-hover:scale-[1.03]" : ""}`}
            />
          </div>
        )}
      </div>

      <div {...reveal()}>
        <span className="font-display text-[0.85rem] tracking-[0.3em] text-gold-deep">
          Service {String(index).padStart(2, "0")}
        </span>
        <h3 className="mt-2 mb-[0.7rem] text-[clamp(1.7rem,3vw,2.5rem)]">{title}</h3>
        <p className="max-w-[34rem] text-ink-muted">{summary}</p>
        <ul className="mt-4 mb-[1.4rem] max-w-[34rem]">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-baseline gap-[0.9rem] border-b border-dashed border-line py-2 text-[0.93rem] before:size-[7px] before:flex-none before:rotate-45 before:bg-gold before:content-['']"
            >
              {point}
            </li>
          ))}
        </ul>
        {linked && (
          <span className="inline-flex items-center gap-[0.6rem] text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-gold-deep transition-[gap,color] duration-300 group-hover:gap-[1.1rem] group-hover:text-ink">
            Explore the service <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </>
  );

  const rowClass =
    "group grid items-center gap-7 border-t border-line py-[clamp(2.5rem,5vw,4rem)] min-[861px]:grid-cols-[5fr_6fr] min-[861px]:gap-[clamp(2rem,4vw,4rem)]";

  return linked && href ? (
    <Link
      href={href}
      data-sketch-hover=""
      className={`${rowClass} transition-transform duration-400 ease-marabu hover:-translate-y-1`}
    >
      {body}
    </Link>
  ) : (
    <article className={rowClass}>{body}</article>
  );
}
