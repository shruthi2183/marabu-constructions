import type { Metadata } from "next";
import { ContactCta, ContactGrid, ContactHero } from "@/components/sections/contact/ContactSections";
import GridBackdrop from "@/components/ui/GridBackdrop";
import Ticker from "@/components/ui/Ticker";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: { absolute: contact.metaTitle },
  description: contact.metaDescription,
};

export default function ContactPage() {
  return (
    <>
      <GridBackdrop />
      <ContactHero />
      <Ticker />
      <ContactGrid />
      <ContactCta />
    </>
  );
}
