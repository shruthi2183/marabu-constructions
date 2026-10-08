import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { reveal } from "@/components/ui/reveal";
import { home } from "@/content/home";

export default function ProcessSection() {
  const { eyebrow, title, description, steps } = home.process;

  return (
    <section className="relative border-y border-line bg-ivory py-section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-12" />

        {/* <ol> conveys the order to assistive tech; the large numerals are visual. */}
        <ol className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-ink pt-6" {...reveal(i * 140)}>
              <span aria-hidden="true" className="block font-display text-5xl leading-none text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-[1.45rem]">{step.title}</h3>
              <p className="mt-3 text-[0.95rem] text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
