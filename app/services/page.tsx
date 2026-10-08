import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/cards/ServiceCard";
import CtaPanel from "@/components/sections/CtaPanel";
import ServicesHero from "@/components/sections/services/ServicesHero";
import Container from "@/components/ui/Container";
import GridBackdrop from "@/components/ui/GridBackdrop";
import Rule from "@/components/ui/Rule";
import SplitText from "@/components/ui/SplitText";
import Ticker from "@/components/ui/Ticker";
import { reveal } from "@/components/ui/reveal";
import { services, servicesPage } from "@/content/services";

export const metadata: Metadata = {
  title: { absolute: servicesPage.metaTitle },
  description: servicesPage.metaDescription,
};

export default function ServicesPage() {
  const { list, more } = servicesPage;

  return (
    <>
      <GridBackdrop />
      <ServicesHero />
      <Ticker />

      <section aria-labelledby="services-list-heading" className="relative py-section">
        <Container>
          <div className="mb-4 max-w-reading">
            <p className="eyebrow" {...reveal()}>
              {list.eyebrow}
            </p>
            <SplitText id="services-list-heading" text={list.title} className="mt-4 text-display-2" />
            <Rule delay={400} className="mt-6" />
          </div>

          <ul className="mt-10">
            {services.map((service, i) => (
              <li key={service.slug}>
                <ServiceCard service={service} index={i + 1} />
              </li>
            ))}
          </ul>

          <Link
            href={more.action.href}
            data-sketch-hover=""
            className="group mt-12 flex flex-col justify-between gap-6 border border-ink bg-ink p-[2.2rem] text-cream transition-[translate,border-color] duration-400 ease-marabu hover:-translate-y-1 hover:border-gold-deep"
            {...reveal()}
          >
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">{more.kicker}</p>
              <h3 className="mt-[0.8rem] text-[1.7rem] text-cream">{more.title}</h3>
              <p className="mt-[0.8rem] max-w-[40rem] text-cream/70">{more.description}</p>
            </div>
            <span className="inline-flex gap-[0.6rem] text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-gold transition-[gap] duration-300 group-hover:gap-[1.1rem]">
              {more.action.label} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </Container>
      </section>

      <CtaPanel variant="page" />
    </>
  );
}
