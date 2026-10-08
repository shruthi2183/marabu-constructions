import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Rule from "@/components/ui/Rule";
import SplitText from "@/components/ui/SplitText";
import { reveal, slide } from "@/components/ui/reveal";
import { home } from "@/content/home";

// The twelve-stage narrative scrolled over the fixed construction drawing.
// Each stage is a spacer section; ConstructionEngine maps their centres to
// drawing progress. Cards alternate sides and slide in from their own side.
export default function BuildFlow() {
  const { finale } = home;

  return (
    <div id="flow" data-build-flow="" className="overflow-x-clip">
      <h2 className="sr-only">
        The Marabu build sequence
      </h2>

      {home.stages.map((stage, i) => {
        const right = i % 2 === 1;
        return (
          <section
            key={stage.label}
            data-build-stage=""
            className={`relative flex min-h-[48vh] items-center justify-center md:min-h-[55vh] ${right ? "md:justify-end" : "md:justify-start"}`}
          >
            <Container className={`flex ${right ? "md:justify-end" : ""}`}>
              <div
                data-sketch-hover=""
                className={`w-full border border-line bg-[rgb(251_248_239/0.92)] px-6 py-[1.35rem] shadow-[0_12px_34px_rgba(38,43,49,0.10)] backdrop-blur-[6px] md:max-w-[380px] ${right ? "border-r-[3px] border-r-gold" : "border-l-[3px] border-l-gold"}`}
                {...slide(right ? "r" : "l")}
              >
                <p className="font-display text-[0.78rem] uppercase tracking-[0.28em] text-gold-deep">
                  {stage.label}
                </p>
                <h3 className="mt-[0.35rem] mb-[0.45rem] text-[1.55rem]">{stage.title}</h3>
                <p className="text-[0.93rem] text-ink-muted">{stage.body}</p>
                {stage.hand && (
                  <span className="hand-tag mt-[0.7rem] block text-[1.12rem]">{stage.hand}</span>
                )}
              </div>
            </Container>
          </section>
        );
      })}

      <section
        data-build-finale=""
        className="relative flex min-h-[92vh] items-center justify-center"
      >
        <Container className="flex justify-center">
          <div
            className="w-full border border-t-4 border-line border-t-gold bg-[rgb(251_248_239/0.94)] px-[2.1rem] py-[2.4rem] text-center shadow-[0_22px_55px_rgba(38,43,49,0.13)] md:max-w-[430px]"
            {...reveal()}
          >
            <p className="eyebrow eyebrow-center">{finale.eyebrow}</p>
            <SplitText text={finale.title} className="my-4 text-display-2" />
            <Rule delay={500} center className="mb-5" />
            <p className="lede" {...reveal(250)}>
              {finale.description}
            </p>
            <div className="mt-10 flex flex-col items-center gap-5" {...reveal(400)}>
              <Button href={finale.action.href}>{finale.action.label}</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
