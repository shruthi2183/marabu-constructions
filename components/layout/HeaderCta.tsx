"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";
import { contactCta } from "./navigation";

// Header call to action. Everywhere it leads to /contact ("Get in Touch");
// on the contact page itself it becomes a direct "Call Now" phone link, as in
// the reference.
type HeaderCtaProps = { className?: string; onClick?: () => void };

function Cta({ pathname, className, onClick }: HeaderCtaProps & { pathname: string | null }) {
  const onContact = pathname === "/contact";
  return (
    <Button
      href={onContact ? site.contact.phone.href : contactCta.href}
      className={className}
      onClick={onClick}
    >
      {onContact ? "Call Now" : contactCta.label}
    </Button>
  );
}

function ActiveCta(props: HeaderCtaProps) {
  return <Cta {...props} pathname={usePathname()} />;
}

// usePathname can suspend on routes with request-time params (cacheComponents);
// the fallback is the default CTA.
export default function HeaderCta(props: HeaderCtaProps) {
  return (
    <Suspense fallback={<Cta {...props} pathname={null} />}>
      <ActiveCta {...props} />
    </Suspense>
  );
}
