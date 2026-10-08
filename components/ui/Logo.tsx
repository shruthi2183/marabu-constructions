// The Marabu logo, displayed exactly as the reference design does: the
// unmodified public/images/marabu-logo.svg (2000×1440 canvas) shown through a
// viewBox cropped to the mark (394 266 1212 976), so it is legible at small
// sizes. The file itself is never edited.
const CROP = { x: 394, y: 266, width: 1212, height: 976 };

type LogoProps = {
  /** Set the height (e.g. "h-14"); width follows the cropped aspect ratio. */
  className?: string;
  /** Accessible name. Pass "" when a parent link already names it. */
  label?: string;
};

export default function Logo({ className, label = "Marabu Constructions" }: LogoProps) {
  return (
    <svg
      viewBox={`${CROP.x} ${CROP.y} ${CROP.width} ${CROP.height}`}
      className={["block w-auto", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: `${CROP.width} / ${CROP.height}` }}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <image href="/images/marabu-logo.svg" width="2000" height="1440" />
    </svg>
  );
}
