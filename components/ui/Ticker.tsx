import { services } from "@/content/services";
import { site } from "@/content/site";

// Dark marquee band listing the services. Decorative (the same information is
// in the page content), so it is hidden from assistive technology. The track
// is rendered twice so the -50% loop is seamless.
export default function Ticker({ closing = site.tickerClosing }: { closing?: string }) {
  const items = [...services.map((service) => service.title), closing];
  const run = (copy: number) =>
    items.map((item, i) => (
      <span key={`${copy}-${i}`} className="flex items-center">
        <span className="whitespace-nowrap px-8 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-cream/90">
          {item}
        </span>
        <span className="size-1.5 flex-none rotate-45 bg-gold" />
      </span>
    ));

  return (
    <div
      aria-hidden="true"
      className="relative z-[2] overflow-hidden border-y border-gold/35 bg-ink py-4"
    >
      <div className="flex w-max animate-ticker items-center">
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}
