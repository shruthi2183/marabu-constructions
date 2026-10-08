import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Rule from "@/components/ui/Rule";
import SplitText from "@/components/ui/SplitText";
import { reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

type CtaPanelProps = {
  /** Heading with optional *accent* markup. Defaults to the shared closing CTA. */
  title?: string;
  description?: ReactNode;
  /** Custom actions; defaults to the shared "Build With Us" button. */
  actions?: ReactNode;
  /**
   * "solid" (homepage): opaque cream band over the construction drawing.
   * "page": transparent over the graph-paper backdrop, no top padding.
   */
  variant?: "solid" | "page";
  /** Panel padding; the contact page's CTA strip is slightly tighter. */
  compact?: boolean;
};

// Closing call to action: a centred ivory panel with a word-split heading.
export default function CtaPanel({
  title = site.closingCta.title,
  description = site.closingCta.description,
  actions,
  variant = "solid",
  compact = false,
}: CtaPanelProps) {
  return (
    <section
      className={`relative pb-section ${variant === "solid" ? "bg-cream pt-section" : ""}`}
    >
      <Container>
        <div
          className={`relative overflow-hidden border border-line bg-ivory px-[clamp(1.5rem,5vw,3rem)] text-center ${compact ? "py-[clamp(3rem,6vw,5rem)]" : "py-[clamp(3.5rem,7vw,6rem)]"}`}
          {...reveal()}
        >
          <div className="relative mx-auto max-w-reading">
            <SplitText text={title} className="text-display-2" />
            <Rule delay={500} center className="mt-6" />
            <p className="lede mt-6" {...reveal(300)}>
              {description}
            </p>
          </div>
          <div
            className="relative mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
            {...reveal(450)}
          >
            {actions ?? (
              <Button href={site.closingCta.action.href}>{site.closingCta.action.label}</Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
