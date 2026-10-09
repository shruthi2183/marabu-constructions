"use client";

import { useEffect } from "react";

// Starts the reference's entrance animations once the preloader has lifted:
// adds .is-in to [data-reveal] / [data-line] / [data-split] / [data-slide]
// elements as they scroll into view, and counts [data-count] numbers up from
// zero. Elements also marked [data-repeat] fade back out when they leave the
// middle band of the viewport and in again on return, in both directions.
// A MutationObserver picks up content from client-side navigations.
// With reduced motion everything is shown immediately at its final value.
const TARGETS = "[data-reveal],[data-line],[data-split],[data-slide]";

export default function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();
    let reveals: IntersectionObserver | null = null;
    let repeats: IntersectionObserver | null = null;
    let counters: IntersectionObserver | null = null;
    let mutations: MutationObserver | null = null;
    let frame = 0;

    const countUp = (el: HTMLElement) => {
      const end = Number(el.dataset.count);
      const startTime = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - startTime) / 1600, 1);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const scan = () => {
      frame = 0;
      document.querySelectorAll(TARGETS).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (reduceMotion) el.classList.add("is-in");
        else if (el.hasAttribute("data-repeat")) repeats?.observe(el);
        else reveals?.observe(el);
      });
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (reduceMotion) return; // Server-rendered final value stays.
        el.textContent = "0";
        counters?.observe(el);
      });
    };
    const scheduleScan = () => {
      if (!frame) frame = requestAnimationFrame(scan);
    };

    const start = () => {
      if (!reduceMotion) {
        reveals = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-in");
              reveals?.unobserve(entry.target);
            }),
          { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );
        repeats = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) =>
              entry.target.classList.toggle("is-in", entry.isIntersecting),
            ),
          { threshold: 0.2, rootMargin: "-14% 0px -14% 0px" },
        );
        counters = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              counters?.unobserve(entry.target);
              countUp(entry.target as HTMLElement);
            }),
          { threshold: 0.5 },
        );
      }
      scan();
      mutations = new MutationObserver(scheduleScan);
      mutations.observe(document.body, { childList: true, subtree: true });
    };

    if (root.dataset.ready) start();
    else window.addEventListener("marabu:ready", start, { once: true });

    return () => {
      window.removeEventListener("marabu:ready", start);
      cancelAnimationFrame(frame);
      reveals?.disconnect();
      repeats?.disconnect();
      counters?.disconnect();
      mutations?.disconnect();
    };
  }, []);

  return null;
}
