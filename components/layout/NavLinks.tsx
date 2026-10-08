"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { isActivePath, primaryNav } from "./navigation";

const layouts = {
  horizontal: {
    list: "flex items-center gap-8",
    link: "inline-flex min-h-11 items-center border-b-2 text-[0.8rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200",
    idle: "border-transparent text-ink-muted hover:border-silver hover:text-ink",
    active: "border-gold text-ink",
  },
  vertical: {
    list: "flex flex-col",
    link: "flex min-h-[3.25rem] items-center border-b border-l-2 border-b-line pl-4 font-display text-2xl transition-colors duration-200",
    idle: "border-l-transparent text-ink-muted hover:border-l-gold hover:text-ink",
    active: "border-l-gold text-ink",
  },
} as const;

type NavLinksProps = {
  layout: keyof typeof layouts;
  onLinkClick?: () => void;
};

function List({
  layout,
  onLinkClick,
  pathname,
}: NavLinksProps & { pathname: string | null }) {
  const styles = layouts[layout];

  return (
    <ul className={styles.list}>
      {primaryNav.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onLinkClick}
              className={`${styles.link} ${active ? styles.active : styles.idle}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ActiveList(props: NavLinksProps) {
  return <List {...props} pathname={usePathname()} />;
}

// With cacheComponents, usePathname can suspend on routes whose params are only
// known at request time. The fallback renders the same links without the
// current-page indicator so the rest of the layout can still be prerendered.
export default function NavLinks(props: NavLinksProps) {
  return (
    <Suspense fallback={<List {...props} pathname={null} />}>
      <ActiveList {...props} />
    </Suspense>
  );
}
