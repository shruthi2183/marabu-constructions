"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ContentImage } from "@/content/site";

// Contact hero sketch from the reference: a gold pencil line wipes the phone
// drawing in (2.4s), then the frame rings — a gentle shake with pulsing sound
// arcs — and the phone number writes itself underneath. Starts after the
// preloader once in view. Reduced motion shows the finished, still state.
type Phase = "idle" | "revealing" | "ringing" | "details";

const ticks = [
  "-top-px -left-px border-t-2 border-l-2",
  "-top-px -right-px border-t-2 border-r-2",
  "-bottom-px -left-px border-b-2 border-l-2",
  "-bottom-px -right-px border-b-2 border-r-2",
];
const arcs = [
  "-left-3.5 top-[38%] h-12 w-[26px] border-[2.5px]",
  "-left-[26px] top-[32%] h-[72px] w-11 border-2 [animation-delay:0.18s]",
  "-left-[38px] top-[26%] h-24 w-[62px] border-[1.6px] [animation-delay:0.36s]",
];

export default function PhoneStage({
  image,
  captions,
  note,
}: {
  image: ContentImage;
  captions: { drawing: string; ringing: string; details: string };
  note: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    let observer: IntersectionObserver | null = null;
    const play = () => {
      setPhase("revealing");
      timers.push(window.setTimeout(() => setPhase("ringing"), 2900));
      timers.push(window.setTimeout(() => setPhase("details"), 4800));
    };
    const watch = () => {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer?.disconnect();
        play();
      });
      observer.observe(el);
    };
    if (document.documentElement.dataset.ready) watch();
    else window.addEventListener("marabu:ready", watch, { once: true });
    return () => {
      window.removeEventListener("marabu:ready", watch);
      observer?.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const caption =
    phase === "details" ? captions.details : phase === "ringing" ? captions.ringing : captions.drawing;

  return (
    <div
      ref={ref}
      data-phase={phase}
      className="group relative block aspect-[4/5] border border-line bg-ivory/60 p-6 before:pointer-events-none before:absolute before:inset-2 before:border before:border-dashed before:border-gold-deep/30 before:content-['']"
    >
      {ticks.map((position) => (
        <span key={position} aria-hidden="true" className={`absolute size-[18px] border-0 border-gold ${position}`} />
      ))}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[0.7rem] z-[2] text-center font-hand text-[1.15rem] text-gold-deep motion-reduce:hidden"
      >
        {caption}
      </span>

      {arcs.map((arc) => (
        <span
          key={arc}
          aria-hidden="true"
          className={`absolute hidden rounded-l-full border-gold-deep/55 border-y-transparent border-r-transparent opacity-0 transition-opacity duration-600 group-data-[phase=details]:animate-[arc-pulse_1.2s_ease-in-out_infinite] group-data-[phase=details]:opacity-100 group-data-[phase=ringing]:animate-[arc-pulse_1.2s_ease-in-out_infinite] group-data-[phase=ringing]:opacity-100 motion-reduce:opacity-50! sm:block ${arc}`}
        />
      ))}

      <div className="relative h-full w-full overflow-hidden border border-line bg-ivory group-data-[phase=details]:animate-[ring-shake_0.42s_ease-in-out_infinite] group-data-[phase=ringing]:animate-[ring-shake_0.42s_ease-in-out_infinite]">
        <div className="absolute inset-0 [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-[2400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[phase=details]:[clip-path:inset(0)] group-data-[phase=revealing]:[clip-path:inset(0)] group-data-[phase=ringing]:[clip-path:inset(0)] motion-reduce:[clip-path:inset(0)]!">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-contain [filter:sepia(0.08)_contrast(1.04)]"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute top-[6%] bottom-[6%] left-0 w-[3px] bg-[linear-gradient(var(--color-gold-deep),var(--color-gold),var(--color-gold-deep))] opacity-0 shadow-[0_0_12px_rgba(201,162,75,0.6)] transition-[left,opacity] duration-[2400ms,500ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[phase=revealing]:left-[calc(100%-3px)] group-data-[phase=revealing]:opacity-100 motion-reduce:hidden"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[0.7rem] z-[2] translate-y-2 bg-ivory/75 px-2 py-[0.2rem] text-center font-hand text-[1.3rem] text-gold-deep opacity-0 transition-[opacity,translate] delay-300 duration-900 group-data-[phase=details]:translate-y-0 group-data-[phase=details]:opacity-100 motion-reduce:translate-y-0! motion-reduce:opacity-100!"
      >
        {note}
      </span>
    </div>
  );
}
