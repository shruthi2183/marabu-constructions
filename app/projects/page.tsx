import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/sections/CtaPanel";
import ProjectGallery from "@/components/sections/projects/ProjectGallery";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GridBackdrop from "@/components/ui/GridBackdrop";
import Rule from "@/components/ui/Rule";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitText from "@/components/ui/SplitText";
import StatStrip from "@/components/ui/StatStrip";
import Ticker from "@/components/ui/Ticker";
import { reveal } from "@/components/ui/reveal";
import { projectFilters, projects, projectsPage } from "@/content/projects";

export const metadata: Metadata = {
  title: { absolute: projectsPage.metaTitle },
  description: projectsPage.metaDescription,
};

export default function ProjectsPage() {
  const { hero, stats, gallery, note, cta } = projectsPage;

  return (
    <>
      <GridBackdrop />

      <section className="relative flex min-h-[78vh] items-center pt-8">
        <Container className="py-section lg:py-0">
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4" {...reveal()}>
              <span aria-hidden="true" className="relative inline-flex size-2 flex-none">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
                <span className="absolute inset-0 rounded-full bg-gold-deep" />
              </span>
              {hero.eyebrow}
            </p>
            <SplitText as="h1" text={hero.title} className="text-display-1" />
            <Rule delay={800} className="mt-6" />
            <p className="lede mt-6" {...reveal(900)}>
              {hero.description}
            </p>
            <div className="mt-[2.2rem] flex flex-wrap gap-4" {...reveal(1050)}>
              <Button href={hero.primary.href}>{hero.primary.label}</Button>
              <Button href={hero.secondary.href} variant="secondary">
                {hero.secondary.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Ticker />

      <section aria-label="Marabu by the numbers" className="relative py-[calc(var(--spacing-section)*0.6)]">
        <Container>
          <StatStrip stats={stats} />
        </Container>
      </section>

      <section id="gallery" className="relative scroll-mt-24 pt-[calc(var(--spacing-section)*0.6)] pb-section">
        <Container>
          <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} className="mb-12" />
          <ProjectGallery projects={projects} filters={projectFilters} emptyText={gallery.empty} />

          <div className="mt-12 border border-dashed border-gold-deep/40 bg-ivory/70 p-9 text-center" {...reveal()}>
            <span className="hand-tag block text-[1.5rem]">
              {note.hand}{" "}
              <Link href={note.link.href} className="-my-2 inline-block py-2 underline">
                {note.link.label}
              </Link>
            </span>
            <p className="lede mt-[0.6rem]">{note.description}</p>
          </div>
        </Container>
      </section>

      <CtaPanel variant="page" title={cta.title} />
    </>
  );
}
