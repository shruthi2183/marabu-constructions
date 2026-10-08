import Image from "next/image";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  /** Opens the lightbox. Only passed when the project has a photo or video. */
  onOpen?: () => void;
};

// Reference "p-card": 16:10 media with a category tag, then title, meta line,
// summary and a footer cue. Projects with media get the reference's hover lift,
// image zoom and a full-card button that opens the lightbox; placeholder
// projects are static and show a visible image placeholder.
export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { title, category, summary, location, year, size, thumb, media } = project;
  const interactive = Boolean(onOpen && media);
  const meta = [location, year, size].filter(Boolean);
  const isVideo = media?.kind === "video";

  return (
    <article
      data-sketch-hover={interactive ? "" : undefined}
      className={`group relative h-full overflow-hidden border border-line bg-ivory ${interactive ? "cursor-zoom-in transition-[translate,border-color,box-shadow] duration-500 ease-marabu hover:-translate-y-2 hover:border-gold-deep hover:shadow-[0_24px_48px_rgba(38,43,49,0.12)]" : ""}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-champagne">
        {thumb ? (
          <Image
            src={thumb.src}
            alt={thumb.alt}
            fill
            sizes="(min-width: 1100px) 30vw, (min-width: 760px) 45vw, 90vw"
            className={`object-cover [filter:sepia(0.12)_contrast(1.05)] transition-transform duration-500 ease-marabu ${interactive ? "group-hover:scale-[1.04]" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-ink-muted">
            [Replace with approved project image]
          </div>
        )}
        <span className="absolute top-[0.9rem] left-[0.9rem] max-w-[calc(100%-1.8rem)] bg-ink/88 px-[0.9rem] py-[0.4rem] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream">
          {category}
        </span>
        {isVideo && (
          <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-ink/25 transition-colors duration-350 group-hover:bg-ink/40">
            <i className="grid size-16 place-items-center rounded-full bg-ivory/92 shadow-[0_14px_30px_rgba(0,0,0,0.3)] transition-transform duration-350 group-hover:scale-[1.12]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-[22px] text-gold-deep">
                <path d="M8 5v14l11-7z" />
              </svg>
            </i>
          </span>
        )}
      </div>

      <div className="px-[1.15rem] pt-[1.15rem] pb-4 md:px-6 md:pt-6 md:pb-[1.35rem]">
        <h3 className="text-[1.5rem]">
          {interactive ? (
            <button
              type="button"
              onClick={onOpen}
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-focus"
            >
              {title}
              <span className="sr-only">{isVideo ? " — watch video" : " — view photo"}</span>
            </button>
          ) : (
            title
          )}
        </h3>
        {meta.length > 0 && (
          <p className="mt-[0.4rem] mb-[0.6rem] flex flex-wrap gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        )}
        <p className="mt-2 text-[0.93rem] text-ink-muted">{summary}</p>
        {media && (
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            <span>
              {isVideo ? "Video" : "Photo"}
              {media.label && <b className="font-semibold text-gold-deep"> · {media.label}</b>}
            </span>
            <span aria-hidden="true" className="inline-flex items-center gap-[0.45rem] text-gold-deep transition-[gap] duration-300 group-hover:gap-[0.9rem]">
              {isVideo ? "Watch" : "Open"} →
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
