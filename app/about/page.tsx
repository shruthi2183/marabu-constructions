import type { Metadata } from "next";
import CtaPanel from "@/components/sections/CtaPanel";
import AboutHero from "@/components/sections/about/AboutHero";
import {
  CompassSection,
  PillarsSection,
  StorySection,
  TimelineSection,
} from "@/components/sections/about/AboutSections";
import GridBackdrop from "@/components/ui/GridBackdrop";
import Ticker from "@/components/ui/Ticker";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: about.metaTitle },
  description: about.metaDescription,
};

export default function AboutPage() {
  return (
    <>
      <GridBackdrop />
      <AboutHero />
      <Ticker closing={site.tagline} />
      <StorySection />
      <PillarsSection />
      <CompassSection />
      <TimelineSection />
      <CtaPanel variant="page" title={about.cta.title} />
    </>
  );
}
