import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Rule from "@/components/ui/Rule";
import SplitText from "@/components/ui/SplitText";
import { reveal } from "@/components/ui/reveal";
import { home } from "@/content/home";

// Full-height hero over the (still empty) construction drawing.
export default function HomeHero() {
  const { eyebrow, title, description, primary, secondary } = home.hero;

  return (
    <section className="relative flex min-h-screen items-center">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow eyebrow-center mb-4" {...reveal()}>
            <span aria-hidden="true" className="relative inline-flex size-2 flex-none">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
              <span className="absolute inset-0 rounded-full bg-gold-deep" />
            </span>
            {eyebrow}
          </p>
          <SplitText as="h1" text={title} className="text-display-1" />
          <Rule delay={800} center className="mt-6" />
          <p className="lede mt-6" {...reveal(900)}>
            {description}
          </p>
          <div className="mt-[2.2rem] flex flex-wrap justify-center gap-4" {...reveal(1050)}>
            <Button href={primary.href}>{primary.label}</Button>
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
