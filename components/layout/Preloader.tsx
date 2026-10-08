"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

// First-load cover from the reference: logo, a sliding gold bar and the
// tagline. It lifts after the page has loaded (shown at least ~1.1s, at most
// 3s), then signals "marabu:ready" so entrance animations start behind it.
// Decorative: the page content underneath stays in the accessibility tree.
const MIN_MS = 1100;
const MAX_MS = 3000;

export default function Preloader({ tagline }: { tagline: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let finished = false;
    const timers: number[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      timers.push(
        window.setTimeout(() => {
          document.documentElement.dataset.ready = "true";
          window.dispatchEvent(new Event("marabu:ready"));
        }, 150),
      );
    };

    const onLoad = () =>
      timers.push(window.setTimeout(finish, Math.max(0, MIN_MS - performance.now())));

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    timers.push(window.setTimeout(finish, Math.max(0, MAX_MS - performance.now())));

    return () => {
      window.removeEventListener("load", onLoad);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-preloader=""
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-[1.6rem] bg-cream transition-[opacity,visibility] duration-700 ${done ? "invisible opacity-0" : ""}`}
    >
      <Logo label="" className="h-[min(180px,25vh)] animate-pre-in" />
      <div className="h-0.5 w-[200px] overflow-hidden bg-ink/12">
        <i className="block h-full w-2/5 animate-pre-bar bg-[linear-gradient(90deg,var(--color-gold-deep),var(--color-gold))]" />
      </div>
      <p className="px-6 text-center text-[0.68rem] font-medium uppercase tracking-[0.32em] text-gold-deep">
        {tagline}
      </p>
    </div>
  );
}
