"use client";

import { useEffect, useRef } from "react";

// Gold page-progress bar along the top edge, and data-scrolled on <html> so
// the sticky header can pick up its shadow once the page moves.
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - root.clientHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`;
      const scrolled = String(window.scrollY > 24);
      if (root.dataset.scrolled !== scrolled) root.dataset.scrolled = scrolled;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Page height changes on navigation and as images load.
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left scale-x-0 bg-gold"
    />
  );
}
