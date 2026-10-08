import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { site } from "@/content/site";
import HeaderCta from "./HeaderCta";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";

// Sticky translucent header from the reference; it gains a soft shadow once
// the page has scrolled (data-scrolled is set by ScrollProgress).
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[80] border-b border-line bg-[rgb(247_241_227/0.93)] backdrop-blur-[10px] transition-shadow duration-400 [[data-scrolled=true]_&]:shadow-[0_10px_30px_rgba(38,43,49,0.08)]">
      <Container className="flex items-center justify-between gap-6 py-[0.7rem]">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Logo label="" className="h-[clamp(46px,6vw,58px)]" />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <nav aria-label="Primary navigation">
            <NavLinks layout="horizontal" />
          </nav>
          <HeaderCta />
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
