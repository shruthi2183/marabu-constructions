// Thin gold rule drawn in from the left (or from the centre) on reveal.
type RuleProps = {
  width?: string;
  delay?: number;
  center?: boolean;
  className?: string;
};

export default function Rule({ width = "4rem", delay = 0, center = false, className }: RuleProps) {
  return (
    <span
      aria-hidden="true"
      data-line=""
      className={["rule", center && "mx-auto", className].filter(Boolean).join(" ")}
      style={{
        width,
        transitionDelay: delay ? `${delay}ms` : undefined,
        transformOrigin: center ? "center" : undefined,
      }}
    />
  );
}
