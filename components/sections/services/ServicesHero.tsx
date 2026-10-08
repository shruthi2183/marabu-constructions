import Image from "next/image";
import Container from "@/components/ui/Container";
import FramedStage from "@/components/ui/FramedStage";
import Rule from "@/components/ui/Rule";
import SplitText from "@/components/ui/SplitText";
import { reveal } from "@/components/ui/reveal";
import { servicesPage } from "@/content/services";

export default function ServicesHero() {
  const { eyebrow, title, description, hand, image } = servicesPage.hero;

  return (
    <section className="relative flex min-h-[88vh] items-center pt-8">
      <Container className="grid items-center gap-14 py-section lg:grid-cols-[7fr_5fr] lg:py-0">
        <div className="max-w-[600px]">
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
        </div>

        <div {...reveal(300)}>
          <FramedStage dashed="inner" className="p-5">
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover [filter:sepia(0.15)_contrast(1.05)]"
              />
            </div>
          </FramedStage>
        </div>
      </Container>
    </section>
  );
}
