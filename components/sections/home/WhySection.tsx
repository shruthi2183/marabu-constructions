import Container from "@/components/ui/Container";
import Rule from "@/components/ui/Rule";
import SplitText from "@/components/ui/SplitText";
import { reveal } from "@/components/ui/reveal";
import { home } from "@/content/home";

export default function WhySection() {
  const { eyebrow, title, items } = home.why;

  return (
    <section className="relative bg-cream py-section">
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="max-w-reading">
          <p className="eyebrow" {...reveal()}>
            {eyebrow}
          </p>
          <SplitText text={title} className="mt-4 text-display-2" />
          <Rule delay={400} className="mt-6" />
        </div>

        <ul className="border-b border-line">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="grid gap-3 border-t border-line py-8 sm:grid-cols-[2.5rem_1fr] sm:gap-6"
            >
              <Rule width="2.5rem" delay={i * 150} className="mt-4" />
              <div {...reveal(100 + i * 150)}>
                <h3 className="text-[1.45rem]">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] text-ink-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
