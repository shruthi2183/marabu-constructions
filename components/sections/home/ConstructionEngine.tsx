"use client";

import { useLayoutEffect, useRef } from "react";

// Port of the reference's "construction engine". Scroll position through the
// build flow maps to progress 0–1 across twelve stages: each stage's strokes
// draw in sequence (stroke-dashoffset), its annotations fade in, and the
// temporary works (crane, bracing, scaffold, materials) appear mid-build and
// are cleared before handover. Progress is a pure function of scroll, so
// scrolling back up takes the building down again.
//
// Map: the flow's top = 0; the centre of stage section i = (i + 0.5) / 12;
// the centre of the finale = 1. Also renders the vertical "SITE PROGRESS"
// readout and the "scroll to begin" cue.
type DrawnStroke = { el: SVGGeometryElement; len: number; s0: number; t: number };
type Stage = { strokes: DrawnStroke[]; fades: SVGElement[]; a: number; b: number; fade: number };

const N = 12;
const TAU = Math.PI * 2;
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const docTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

export default function ConstructionEngine() {
  const pctRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  // Layout effect: strokes are hidden before the first paint, so returning to
  // the homepage never flashes the finished drawing.
  useLayoutEffect(() => {
    const svg = document.querySelector<SVGSVGElement>("[data-construction]");
    const flow = document.querySelector<HTMLElement>("[data-build-flow]");
    const finale = document.querySelector<HTMLElement>("[data-build-finale]");
    const pct = pctRef.current;
    const cue = cueRef.current;
    if (!svg || !flow || !finale || !pct || !cue) return;

    const part = <T extends Element>(name: string) =>
      svg.querySelector<T>(`[data-part="${name}"]`);
    const crane = part<SVGGElement>("craneC");
    const trolley = part<SVGRectElement>("trolleyC");
    const cable = part<SVGLineElement>("cableC");
    const hook = part<SVGGElement>("hookC");
    const bracing = part<SVGGElement>("bracingG");
    const scaffold = part<SVGGElement>("scaffoldG");
    const materials = part<SVGGElement>("materialsG");
    const spacers = Array.from(document.querySelectorAll<HTMLElement>("[data-build-stage]"));

    const stages: Stage[] = [];
    for (let i = 1; i <= N; i++) {
      const group = svg.querySelector(`[data-stage="${i}"]`);
      if (!group) continue;
      const fades = Array.from(group.querySelectorAll<SVGElement>(".fade"));
      const strokes: DrawnStroke[] = [];
      group
        .querySelectorAll<SVGGeometryElement>("path,line,polyline,rect,circle,ellipse")
        .forEach((el) => {
          if (el.classList.contains("fade")) return;
          let len = 0;
          try {
            len = el.getTotalLength();
          } catch {}
          len = Math.max(len, 6);
          el.style.strokeDasharray = String(len);
          el.style.strokeDashoffset = String(len);
          strokes.push({ el, len, s0: 0, t: 0 });
        });
      strokes.forEach((o, j) => (o.s0 = Math.min((j / Math.max(strokes.length, 1)) * 0.62, 0.62)));
      fades.forEach((el) => (el.style.opacity = "0"));
      stages.push({ strokes, fades, a: (i - 1) / N, b: i / N, fade: 0 });
    }
    document.documentElement.dataset.constructionReady = "true";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      stages.forEach((st) => {
        st.strokes.forEach((o) => (o.el.style.strokeDashoffset = "0"));
        st.fades.forEach((el) => (el.style.opacity = "1"));
      });
      [crane, bracing, scaffold, materials].forEach((g) => g && (g.style.opacity = "0"));
      pct.textContent = "SITE PROGRESS — 100%";
      return;
    }

    let map: [number, number][] = [];
    let flowTop = 0;
    let finaleBottom = 0;
    const computeMap = () => {
      flowTop = docTop(flow);
      finaleBottom = docTop(finale) + finale.offsetHeight;
      map = [[flowTop, 0]];
      spacers.forEach((s, idx) => {
        const cy = docTop(s) + s.offsetHeight / 2 - window.innerHeight / 2;
        map.push([Math.max(cy, flowTop + 1), (idx + 0.5) / N]);
      });
      const endY = docTop(finale) + finale.offsetHeight / 2 - window.innerHeight / 2;
      map.push([Math.max(endY, map[map.length - 1][0] + 1), 1]);
    };
    const progressAt = (y: number) => {
      if (!map.length || y <= map[0][0]) return 0;
      for (let i = 0; i < map.length - 1; i++) {
        const [ya, pa] = map[i];
        const [yb, pb] = map[i + 1];
        if (y <= yb) return pa + (pb - pa) * ((y - ya) / Math.max(yb - ya, 1));
      }
      return 1;
    };

    const updateBuild = (p: number) => {
      stages.forEach((st) => {
        const l = clamp((p - st.a) / (st.b - st.a));
        st.strokes.forEach((o) => {
          const t = clamp((l - o.s0) / 0.38);
          if (t === o.t) return; // Skip untouched strokes.
          o.t = t;
          o.el.style.strokeDashoffset = String(o.len * (1 - t));
        });
        const fo = clamp(l * 1.6);
        if (fo !== st.fade) {
          st.fade = fo;
          st.fades.forEach((el) => (el.style.opacity = String(fo)));
        }
      });

      if (crane && trolley && cable && hook) {
        crane.style.opacity = String(clamp((p - 0.185) / 0.045) * (1 - clamp((p - 0.52) / 0.045)));
        const tx = 260 + 430 * (0.5 - 0.5 * Math.cos(p * TAU * 2 + 0.4));
        const hy = 280 + 330 * (0.5 - 0.5 * Math.cos(p * TAU * 3));
        trolley.setAttribute("x", String(tx - 9));
        cable.setAttribute("x1", String(tx));
        cable.setAttribute("x2", String(tx));
        cable.setAttribute("y1", "170");
        cable.setAttribute("y2", String(hy));
        hook.setAttribute("transform", `translate(${tx},${hy})`);
      }
      if (bracing) bracing.style.opacity = String(clamp((p - 0.28) / 0.04) * (1 - clamp((p - 0.52) / 0.04)));
      if (scaffold) scaffold.style.opacity = String(clamp((p - 0.24) / 0.05) * (1 - clamp((p - 0.56) / 0.05)));
      if (materials) materials.style.opacity = String(clamp((p - 0.2) / 0.05) * (1 - clamp((p - 0.56) / 0.05)));

      pct.textContent = `SITE PROGRESS — ${Math.round(p * 100)}%`;
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const p = progressAt(y);
        updateBuild(p);
        const inZone = y + window.innerHeight > flowTop + 40 && y < finaleBottom;
        pct.dataset.show = String(inZone);
        cue.dataset.show = String(y > flowTop - window.innerHeight * 0.4 && p < 0.02);
      });
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        computeMap();
        onScroll();
      }, 150);
    };

    computeMap();
    updateBuild(0);
    onScroll();
    // Fonts and images settle after first paint; re-measure once they have.
    const settle = window.setTimeout(onResize, 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <p
        ref={pctRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-1/2 left-2.5 z-[60] hidden -translate-y-1/2 rotate-180 whitespace-nowrap font-hand text-[1.15rem] tracking-[0.14em] text-gold-deep opacity-0 transition-opacity duration-400 [writing-mode:vertical-rl] data-[show=true]:opacity-100 min-[901px]:block"
      >
        SITE PROGRESS — 0%
      </p>
      <div
        ref={cueRef}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-8 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.34em] text-ink-muted opacity-0 transition-opacity duration-500 data-[show=true]:opacity-100"
      >
        <span>Scroll to begin construction</span>
        <i className="h-10 w-px animate-cue bg-[linear-gradient(var(--color-gold),transparent)]" />
      </div>
    </>
  );
}
