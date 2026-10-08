"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import type { Project, ProjectType } from "@/content/projects";

// Reference gallery: filter chips + cards + a lightbox that shows a photo or
// an embedded YouTube video (youtube-nocookie). The lightbox is a native modal
// <dialog>, so focus is contained, Escape closes it and the page behind is
// inert; ←/→ step through the currently filtered projects that have media.
type Filter = { value: "all" | ProjectType; label: string };

function youtubeEmbed(url: string) {
  const id = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
}

export default function ProjectGallery({
  projects,
  filters,
  emptyText,
}: {
  projects: Project[];
  filters: Filter[];
  emptyText: string;
}) {
  const [filter, setFilter] = useState<Filter["value"]>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = projects.filter((p) => filter === "all" || p.type === filter);
  const openable = visible.filter((p) => p.media);
  const current = openIndex === null ? null : openable[openIndex];
  const count = openable.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  // Show/hide the modal and lock page scroll while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current && !dialog.open) dialog.showModal();
    if (!current && dialog.open) dialog.close();
    if (!current) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [current, step]);

  // cacheComponents keeps routes mounted (hidden); never leave a dialog open.
  useLayoutEffect(() => close, [close]);

  const embed = current?.media?.kind === "video" ? youtubeEmbed(current.media.src) : null;

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-[0.6rem]" data-reveal="">
        {filters.map((f) => {
          const active = f.value === filter;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={`border-[1.5px] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${active ? "border-ink bg-ink text-cream" : "border-line text-ink-muted hover:border-gold hover:text-gold-deep"}`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <ul className="grid gap-10 min-[760px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {visible.map((project) => {
            const i = openable.indexOf(project);
            return (
              <li key={project.slug}>
                <ProjectCard project={project} onOpen={i >= 0 ? () => setOpenIndex(i) : undefined} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="border border-dashed border-line py-12 text-center text-ink-muted" role="status">
          {emptyText}
        </p>
      )}

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current ? current.title : "Project detail"}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none place-items-center bg-transparent p-0 backdrop:bg-[rgb(28_31_36/0.94)] open:grid"
      >
        {current && (
          <>
            <button type="button" onClick={close} aria-label="Close" className="fixed top-2 right-2 z-[5] grid size-[50px] place-items-center border-[1.5px] border-gold bg-ivory text-[22px] text-gold-deep transition-colors duration-300 hover:bg-gold hover:text-white md:top-5 md:right-[22px]">✕</button>
            {openable.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous project" className="fixed top-1/2 left-2 z-[5] grid size-[50px] -translate-y-1/2 place-items-center border-[1.5px] border-gold bg-ivory text-[22px] text-gold-deep transition-colors duration-300 hover:bg-gold hover:text-white md:left-[22px]">‹</button>
                <button type="button" onClick={() => step(1)} aria-label="Next project" className="fixed top-1/2 right-2 z-[5] grid size-[50px] -translate-y-1/2 place-items-center border-[1.5px] border-gold bg-ivory text-[22px] text-gold-deep transition-colors duration-300 hover:bg-gold hover:text-white md:right-[22px]">›</button>
              </>
            )}
            <figure className="flex max-h-[84vh] w-[min(1040px,92vw)] flex-col overflow-auto border border-gold bg-ivory shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-video w-full bg-ink">
                {embed ? (
                  <iframe
                    src={embed}
                    title={current.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : current.media?.kind === "video" ? (
                  <video src={current.media.src} controls autoPlay className="absolute inset-0 h-full w-full bg-black object-contain" />
                ) : current.media ? (
                  <Image src={current.media.src} alt={current.title} fill sizes="92vw" className="object-cover" />
                ) : null}
              </div>
              <figcaption className="px-[1.2rem] py-[1.1rem] md:px-7 md:py-6">
                {(current.location || current.year) && (
                  <p className="flex flex-wrap gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                    {current.location && <span>{current.location}</span>}
                    {current.year && <span>{current.year}</span>}
                  </p>
                )}
                <h3 className="text-[1.75rem]">{current.title}</h3>
                <p className="mt-2 text-ink-muted">{current.description ?? current.summary}</p>
              </figcaption>
            </figure>
          </>
        )}
      </dialog>
    </>
  );
}
