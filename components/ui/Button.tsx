import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

// Reference ".btn": 48px min height, 2px corners, uppercase tracked label,
// a 2px lift on hover. "text" is the reference's underlined "phone-link".
const base =
  "inline-flex items-center justify-center gap-2 text-center text-[0.85rem] font-medium uppercase tracking-[0.14em] transition-[background-color,color,border-color,translate] duration-250 disabled:opacity-50";

const variants = {
  primary:
    "min-h-12 rounded-subtle border border-ink bg-ink px-[1.9rem] py-[0.8rem] text-cream hover:-translate-y-0.5 hover:border-gold-deep hover:bg-gold-deep disabled:hover:translate-y-0 disabled:hover:border-ink disabled:hover:bg-ink",
  secondary:
    "min-h-12 rounded-subtle border border-ink bg-transparent px-[1.9rem] py-[0.8rem] text-ink hover:-translate-y-0.5 hover:bg-ink hover:text-cream",
  text: "min-h-12 normal-case tracking-normal text-[0.9rem] font-light text-gold-deep underline decoration-gold underline-offset-8 hover:text-ink",
} as const;

type Variant = keyof typeof variants;

type ButtonAsLink = Omit<ComponentPropsWithoutRef<"a">, "className"> & {
  href: string;
};

type ButtonAsButton = Omit<ComponentPropsWithoutRef<"button">, "className"> & {
  href?: undefined;
};

export type ButtonProps = (ButtonAsLink | ButtonAsButton) & {
  variant?: Variant;
  className?: string;
};

// Renders an internal Link, a plain <a> (external, #anchor, mailto:, tel:), or
// a <button> depending on whether `href` is given.
export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = [base, variants[variant], className].filter(Boolean).join(" ");

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return href.startsWith("/") ? (
      <Link href={href} className={classes} {...rest} />
    ) : (
      <a href={href} className={classes} {...rest} />
    );
  }

  const { type = "button", ...rest } = props;

  return <button type={type} className={classes} {...rest} />;
}
