import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FramedStage from "@/components/ui/FramedStage";
import Rule from "@/components/ui/Rule";
import SplitText from "@/components/ui/SplitText";
import { reveal } from "@/components/ui/reveal";
import { about } from "@/content/about";
import LogoReveal from "./LogoReveal";

export default function AboutHero() {
  const { eyebrow, title, description, hand, primary, secondary, captions } = about.hero;

  return (
    <section className="relative flex min-h-[92vh] items-center pt-8">
      <Container className="grid items-center gap-16 py-section lg:grid-cols-2 lg:py-0">
        <div className="max-w-[560px]">
          <p className="eyebrow mb-4" {...reveal()}>
            <span aria-hidden="true" className="relative inline-flex size-2 flex-none">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
              <span className="absolute inset-0 rounded-full bg-gold-deep" />
            </span>
            {eyebrow}
          </p>
          <SplitText as="h1" text={title} className="text-display-1" />
          <Rule delay={800} className="mt-6" />
          <p className="lede mt-6" {...reveal(900)}>
            {description}
          </p>
          <p className="hand-tag mt-[1.2rem] block" {...reveal(1050)}>
            {hand}
          </p>
          <div className="mt-[2.2rem] flex flex-wrap gap-4" {...reveal(1200)}>
            <Button href={primary.href}>{primary.label}</Button>
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          </div>
        </div>

        <div {...reveal(350)}>
          <FramedStage className="p-6">
            <LogoReveal captions={captions} />
          </FramedStage>
        </div>
      </Container>
    </section>
  );
}
