"use client";

import { useEffect, useRef } from "react";

// "The pencil actually draws": a graphite trail follows the cursor, sheds a
// little dust on fast moves, and leaves a scribble where you click. Ported
// from the reference. Fine pointers only, never with reduced motion, and the
// animation loop sleeps whenever nothing is left to draw.
const LIFE = 1600;
const HOVER_TARGETS = "a,button,[data-sketch-hover]";

type Point = { x: number; y: number; t: number; w: number; a: number };
type Dust = { x: number; y: number; vx: number; vy: number; r: number; life: number; decay: number };
type Scribble = { x: number; y: number; life: number; segs: { x: number; y: number }[] };

export default function SketchTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();

    const pts: Point[] = [];
    const dust: Dust[] = [];
    const scribbles: Scribble[] = [];
    let last = { x: width / 2, y: height / 2 };
    let hoverLink = false;
    let frame = 0;

    const draw = () => {
      frame = 0;
      const now = performance.now();
      ctx.clearRect(0, 0, width, height);

      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      if (pts.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const age = 1 - (now - b.t) / LIFE;
          if (age <= 0) continue;
          const taper = 0.35 + age * 0.65;

          ctx.strokeStyle = `rgba(91,99,108,${(age * 0.09 * b.a * 3).toFixed(3)})`;
          ctx.lineWidth = 5 * b.w * taper;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          ctx.strokeStyle = `rgba(38,43,49,${(age * 0.5 * b.a).toFixed(3)})`;
          ctx.lineWidth = 1.3 * b.w * taper;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          if (Math.random() < 0.12) {
            ctx.strokeStyle = `rgba(251,248,239,${(age * 0.5).toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x - 1, a.y - 1);
            ctx.lineTo(b.x - 1, b.y - 1);
            ctx.stroke();
          }

          if (hoverLink) {
            ctx.strokeStyle = `rgba(138,90,16,${(age * 0.3 * b.a).toFixed(3)})`;
            ctx.lineWidth = 2.2 * b.w * taper;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let d = dust.length - 1; d >= 0; d--) {
        const p = dust[d];
        p.vy += 0.015;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          dust.splice(d, 1);
          continue;
        }
        ctx.fillStyle = `rgba(91,99,108,${(p.life * p.life * 0.45).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let s = scribbles.length - 1; s >= 0; s--) {
        const sc = scribbles[s];
        sc.life -= 0.012;
        if (sc.life <= 0) {
          scribbles.splice(s, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(38,43,49,${(sc.life * 0.55).toFixed(3)})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(sc.x, sc.y);
        sc.segs.forEach((seg) => ctx.lineTo(seg.x, seg.y));
        ctx.stroke();
        ctx.strokeStyle = `rgba(138,90,16,${(sc.life * 0.25).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sc.x, sc.y, 26 * (1 - sc.life) + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Keep animating only while something is still fading out.
      if (pts.length > 1 || dust.length || scribbles.length) frame = requestAnimationFrame(draw);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 2) {
        pts.push({
          x: e.clientX + (Math.random() - 0.5) * 1.6,
          y: e.clientY + (Math.random() - 0.5) * 1.6,
          t: performance.now(),
          w: 0.6 + Math.random() * 0.8,
          a: 0.35 + Math.random() * 0.3,
        });
        if (dist > 14) {
          const n = Math.min(1 + dist / 40, 4) | 0;
          for (let i = 0; i < n; i++) {
            dust.push({
              x: e.clientX + (Math.random() - 0.5) * 8,
              y: e.clientY + (Math.random() - 0.5) * 8,
              vx: -dx * 0.02 + (Math.random() - 0.5) * 0.8,
              vy: -dy * 0.02 - 0.3 - Math.random() * 0.5,
              r: 0.5 + Math.random() * 1.4,
              life: 1,
              decay: 0.02 + Math.random() * 0.03,
            });
          }
        }
        wake();
      }
      last = { x: e.clientX, y: e.clientY };
      hoverLink = !!(e.target instanceof Element && e.target.closest(HOVER_TARGETS));
    };

    const onDown = (e: MouseEvent) => {
      const s: Scribble = { x: e.clientX, y: e.clientY, life: 1, segs: [] };
      let angle = Math.random() * Math.PI * 2;
      for (let i = 0; i < 14; i++) {
        angle += (Math.random() - 0.5) * 1.6;
        const d = 3 + Math.random() * 7;
        s.segs.push({
          x: e.clientX + Math.cos(angle) * d * ((i / 14) * 1.3),
          y: e.clientY + Math.sin(angle) * d * ((i / 14) * 1.3),
        });
      }
      scribbles.push(s);
      for (let j = 0; j < 10; j++) {
        const a = Math.random() * Math.PI * 2;
        dust.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * (1 + Math.random() * 2),
          vy: Math.sin(a) * (1 + Math.random() * 2) - 0.5,
          r: 0.5 + Math.random() * 1.6,
          life: 1,
          decay: 0.025 + Math.random() * 0.02,
        });
      }
      wake();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120]"
    />
  );
}
