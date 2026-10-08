import type { ReactNode } from "react";

// Fixed graph-paper backdrop behind the page (34px grid, faded towards the
// edges). The homepage passes its construction drawing as children.
const grid =
  "bg-[linear-gradient(rgb(38_43_49/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(38_43_49/0.05)_1px,transparent_1px)] bg-[size:34px_34px]";

export default function GridBackdrop({
  variant = "page",
  children,
  className,
}: {
  variant?: "page" | "home";
  children?: ReactNode;
  className?: string;
}) {
  const mask =
    variant === "home"
      ? "[mask-image:radial-gradient(ellipse_at_50%_55%,black_45%,transparent_82%)]"
      : "[mask-image:radial-gradient(ellipse_at_50%_45%,black_40%,transparent_82%)]";

  return (
    <div
      aria-hidden="true"
      className={["pointer-events-none fixed inset-0 -z-10 bg-cream", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={`absolute inset-0 ${grid} ${mask}`} />
      {children}
    </div>
  );
}
