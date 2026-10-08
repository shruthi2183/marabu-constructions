import Link from "next/link";
import { cacheLife } from "next/cache";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { emailHref, site } from "@/content/site";
import { contactCta, primaryNav } from "./navigation";

// Cache Components rejects reading the current time during prerendering,
// so the year is computed inside a cached scope and refreshed daily.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const contactLink = "inline-flex min-h-11 items-center transition-colors duration-200 hover:text-ink";

export default function SiteFooter() {
  const { phone, email, address } = site.contact;

  return (
    <footer className="relative border-t border-line bg-cream">
      <Container>
        <div className="flex flex-col gap-12 py-16 md:flex-row md:flex-wrap md:items-start md:justify-between">
          <Link href="/" aria-label={`${site.name} — home`} className="self-start">
            <Logo label="" className="h-[clamp(86px,11vw,112px)]" />
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-12 sm:flex sm:gap-8">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.9rem] text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-1 text-[0.9rem] text-ink-muted">
            <p className="font-display text-2xl text-ink">Planning a project?</p>
            <a href={phone.href} className={contactLink}>
              {phone.display}
            </a>
            <a href={emailHref} className={contactLink}>
              {email}
            </a>
            <address className="max-w-72 not-italic">{address.join(" ")}</address>
            <Link href={contactCta.href} className={`${contactLink} mt-1 self-start`}>
              {contactCta.label}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 text-[0.85rem] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.name} · {site.parent}. All rights reserved.
          </p>
          <p className="font-display text-base italic text-gold-deep">“{site.quote}”</p>
        </div>
      </Container>
    </footer>
  );
}
