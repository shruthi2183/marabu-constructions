import type { ReactNode } from "react";

// Drawing-sheet frame from the reference heroes: hairline border, a dashed
// inner margin, and gold corner ticks.
const ticks = [
  "-top-px -left-px border-t-2 border-l-2",
  "-top-px -right-px border-t-2 border-r-2",
  "-bottom-px -left-px border-b-2 border-l-2",
  "-bottom-px -right-px border-b-2 border-r-2",
];

type FramedStageProps = {
  children: ReactNode;
  className?: string;
  /** Dashed inner margin drawn as an overlay (about/contact) or as a wrapper (services). */
  dashed?: "overlay" | "inner";
  id?: string;
};

export default function FramedStage({
  children,
  className,
  dashed = "overlay",
  id,
}: FramedStageProps) {
  return (
    <div
      id={id}
      className={["relative aspect-[4/5] border border-line bg-ivory/60", className]
        .filter(Boolean)
        .join(" ")}
    >
      {dashed === "overlay" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 border border-dashed border-gold-deep/30"
        />
      )}
      {ticks.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute size-[18px] border-0 border-gold ${position}`}
        />
      ))}
      {dashed === "inner" ? (
        <div className="flex h-full items-center justify-center overflow-hidden border border-dashed border-gold-deep/30">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
