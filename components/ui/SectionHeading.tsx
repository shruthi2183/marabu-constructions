import type { ReactNode } from "react";
import Rule from "./Rule";
import SplitText from "./SplitText";
import { reveal } from "./reveal";

type SectionHeadingProps = {
  /** Heading text with optional *accent* markup. */
  title: string;
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** Heading level. Choose by document outline, not visual size. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  id?: string;
  className?: string;
};

// Reference "sec-head": eyebrow, word-split display heading, a drawn gold
// rule, and an optional lede.
export default function SectionHeading({
  title,
  eyebrow,
  description,
  as = "h2",
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={["max-w-reading", centered && "mx-auto text-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <p className={`eyebrow ${centered ? "eyebrow-center" : ""}`} {...reveal()}>
          {eyebrow}
        </p>
      )}
      <SplitText
        as={as}
        id={id}
        text={title}
        className={`mt-4 ${as === "h1" ? "text-display-1" : "text-display-2"}`}
      />
      <Rule delay={400} center={centered} className="mt-6" />
      {description && (
        <p className="lede mt-6" {...reveal(200)}>
          {description}
        </p>
      )}
    </div>
  );
}
