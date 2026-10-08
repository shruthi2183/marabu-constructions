"use client";

import {
  type FocusEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import HeaderCta from "./HeaderCta";
import NavLinks from "./NavLinks";

const MENU_ID = "mobile-navigation";
// Matches Tailwind's `lg` breakpoint, where the desktop navigation takes over.
const DESKTOP_QUERY = "(min-width: 64rem)";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // cacheComponents keeps routes mounted (hidden) via <Activity>, so reset the
  // menu whenever this component is hidden instead of relying on unmounting.
  useLayoutEffect(() => close, [close]);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onDesktopChange = () => desktop.matches && close();

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", close);
    desktop.addEventListener("change", onDesktopChange);

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", close);
      desktop.removeEventListener("change", onDesktopChange);
    };
  }, [open, close]);

  // Close when keyboard focus moves outside the menu, so the scroll lock never
  // lingers behind a menu the user has tabbed away from.
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !containerRef.current?.contains(next)) close();
  };

  return (
    <div ref={containerRef} onBlur={onBlur} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-[0.7rem] text-[0.8rem] font-medium uppercase tracking-[0.14em] text-ink"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute top-0 left-0 h-[1.5px] w-5 bg-ink transition-transform duration-350 ${open ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`absolute top-2.5 left-0 h-[1.5px] w-5 bg-ink transition-transform duration-350 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id={MENU_ID}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 animate-menu-in border-b border-line bg-cream shadow-[0_24px_40px_rgba(38,43,49,0.12)]"
      >
        <nav aria-label="Primary navigation" className="flex flex-col px-gutter pt-4 pb-8">
          <NavLinks layout="vertical" onLinkClick={close} />
          <HeaderCta onClick={close} className="mt-7 w-full" />
        </nav>
      </div>

      {/* Invisible layer below the menu: clicking the page closes it. */}
      {open && (
        <div
          aria-hidden="true"
          onClick={close}
          className="absolute inset-x-0 top-full z-30 h-screen"
        />
      )}
    </div>
  );
}
