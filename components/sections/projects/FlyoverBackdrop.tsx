// Pencil sketch of a highway interchange laid over the projects page's
// graph paper. Two ink layers (generated from one drawing, transparent so
// the paper shows through) are swept in from the foreground to the horizon:
// first the bold outlines, then the full shading, so the flyover reads as
// being built from scratch. The animation waits for the preloader
// (html[data-ready]); without JavaScript or with reduced motion the
// finished drawing is shown. Styles live in globals.css ("Flyover sketch").
export default function FlyoverBackdrop() {
  return (
    <div className="flyover">
      <div className="flyover-layer flyover-lines" />
      <div className="flyover-layer flyover-sketch" />
    </div>
  );
}
