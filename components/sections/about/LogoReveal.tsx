"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";

// The About hero's "drawn → colored → resolved" sequence, performed with the
// real, unmodified logo file (no redrawn trace):
//   1. drawing  — a gold pencil line sweeps across, revealing the logo in graphite
//   2. coloring — the graphite filter lifts and the logo's own colours come in
//   3. done     — the exact logo remains; the caption fades away
// Starts once the preloader has lifted and the stage is in view. Phases are
// expressed as data-phase for CSS; with reduced motion, CSS shows the finished
// logo regardless of phase.
type Phase = "idle" | "drawing" | "coloring" | "done";

export default function LogoReveal({ captions }: { captions: { drawing: string; coloring: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    let observer: IntersectionObserver | null = null;
    const play = () => {
      setPhase("drawing");
      timers.push(window.setTimeout(() => setPhase("coloring"), 2500));
      timers.push(window.setTimeout(() => setPhase("done"), 4900));
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

  return (
    <div ref={ref} data-phase={phase} className="group relative h-full w-full">
      <div
        className={[
          "absolute inset-0 ease-[cubic-bezier(0.4,0,0.2,1)]",
          // idle: hidden behind the pencil, graphite
          "[clip-path:inset(0_100%_0_0)] [filter:grayscale(1)_contrast(1.15)_brightness(1.04)]",
          // drawing: the wipe opens over 2.4s, still graphite
          "group-data-[phase=drawing]:[clip-path:inset(0)] group-data-[phase=drawing]:transition-[clip-path] group-data-[phase=drawing]:duration-[2400ms]",
          // coloring / done: full colour fades in over 1.4s
          "group-data-[phase=coloring]:[clip-path:inset(0)] group-data-[phase=coloring]:[filter:none] group-data-[phase=coloring]:transition-[filter] group-data-[phase=coloring]:duration-[1400ms]",
          "group-data-[phase=done]:[clip-path:inset(0)] group-data-[phase=done]:[filter:none]",
          "motion-reduce:[clip-path:inset(0)]! motion-reduce:[filter:none]!",
        ].join(" ")}
      >
        <Logo label="Marabu Constructions logo" className="h-full w-full" />
      </div>

      {/* The pencil edge riding the reveal. */}
      <span
        aria-hidden="true"
        className="absolute top-[6%] bottom-[6%] left-0 w-[3px] bg-[linear-gradient(var(--color-gold-deep),var(--color-gold),var(--color-gold-deep))] opacity-0 shadow-[0_0_12px_rgba(201,162,75,0.6)] transition-[left,opacity] duration-[2400ms,500ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[phase=drawing]:left-[calc(100%-3px)] group-data-[phase=drawing]:opacity-100 group-data-[phase=coloring]:left-[calc(100%-3px)] group-data-[phase=done]:left-[calc(100%-3px)] motion-reduce:hidden"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-3 text-center font-hand text-[1.25rem] text-gold-deep transition-opacity duration-600 group-data-[phase=done]:opacity-0 motion-reduce:hidden"
      >
        {phase === "coloring" ? captions.coloring : captions.drawing}
      </span>
    </div>
  );
}
