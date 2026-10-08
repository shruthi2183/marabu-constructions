import type { CSSProperties } from "react";

// Attribute helpers for the reveal system (see globals.css and
// components/layout/RevealController.tsx). Spread onto an element:
//   <p {...reveal(900)}>…</p>

function delayStyle(delay: number, style?: CSSProperties): CSSProperties | undefined {
  if (!delay && !style) return undefined;
  return { ...style, ...(delay ? { transitionDelay: `${delay}ms` } : {}) };
}

/** Fade and rise into view. */
export function reveal(delay = 0, style?: CSSProperties) {
  return { "data-reveal": "", style: delayStyle(delay, style) };
}

/** Slide in from the left ("l") or right ("r"). */
export function slide(from: "l" | "r", delay = 0, style?: CSSProperties) {
  return { "data-slide": from, style: delayStyle(delay, style) };
}
