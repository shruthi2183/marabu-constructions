import { Fragment, type CSSProperties, type ElementType, type ReactNode } from "react";

// Text with *accent* markup (see content/site.ts).
type Segment = { text: string; accent: boolean };

function parse(text: string): Segment[] {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}

export function plainText(text: string) {
  return text.replace(/\*/g, "");
}

/** Renders *accent* markup without animation. */
export function AccentText({ text }: { text: string }) {
  return (
    <>
      {parse(text).map((segment, i) =>
        segment.accent ? (
          <em key={i} className="w-accent">
            {segment.text}
          </em>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        ),
      )}
    </>
  );
}

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

// Heading whose words rise one by one from behind a mask (85ms stagger) when
// RevealController marks it .is-in. The accessible name is the plain sentence;
// the per-word spans are hidden from assistive technology.
export default function SplitText({ text, as: Tag = "h2", className, id, style }: SplitTextProps) {
  // Words in order, each noting whether whitespace precedes it in the source,
  // so punctuation stays attached to an accented word ("paper.").
  const words: { word: string; accent: boolean; space: boolean }[] = [];
  let pendingSpace = false;
  parse(text).forEach((segment) => {
    segment.text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        pendingSpace = true;
        return;
      }
      words.push({ word: part, accent: segment.accent, space: pendingSpace && words.length > 0 });
      pendingSpace = false;
    });
  });

  return (
    <Tag data-split="" id={id} className={className} style={style} aria-label={plainText(text)}>
      <span aria-hidden="true">
        {words.map(({ word, accent, space }, i): ReactNode => (
          <Fragment key={i}>
            {space && " "}
            <span className="w-mask">
              <span
                className={accent ? "w w-accent" : "w"}
                style={{ transitionDelay: `${i * 85}ms` }}
              >
                {word}
              </span>
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
