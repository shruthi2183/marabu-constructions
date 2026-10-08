import CtaPanel from "@/components/sections/CtaPanel";
import BuildFlow from "@/components/sections/home/BuildFlow";
import ConstructionDrawing from "@/components/sections/home/ConstructionDrawing";
import ConstructionEngine from "@/components/sections/home/ConstructionEngine";
import HomeHero from "@/components/sections/home/HomeHero";
import ProcessSection from "@/components/sections/home/ProcessSection";
import WhySection from "@/components/sections/home/WhySection";
import Container from "@/components/ui/Container";
import GridBackdrop from "@/components/ui/GridBackdrop";
import StatStrip from "@/components/ui/StatStrip";
import Ticker from "@/components/ui/Ticker";
import { home } from "@/content/home";

export default function HomePage() {
  return (
    <>
      {/* Fixed backdrop: graph paper and the building drawn as you scroll. */}
      <GridBackdrop variant="home" className="max-md:opacity-45">
        <ConstructionDrawing />
      </GridBackdrop>
      <ConstructionEngine />

      <HomeHero />
      <Ticker />
      <BuildFlow />

      <section aria-label="Marabu by the numbers" className="relative bg-cream py-[calc(var(--spacing-section)*0.6)]">
        <Container>
          <StatStrip stats={home.stats} variant="home" />
        </Container>
      </section>

      <WhySection />
      <ProcessSection />
      <CtaPanel />
    </>
  );
}
