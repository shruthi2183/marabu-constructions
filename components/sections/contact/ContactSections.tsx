import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Rule from "@/components/ui/Rule";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitText from "@/components/ui/SplitText";
import { reveal } from "@/components/ui/reveal";
import { contact } from "@/content/contact";
import { services } from "@/content/services";
import { emailHref, site, whatsappHref } from "@/content/site";
import PhoneStage from "./PhoneStage";

const tileIcons = {
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  email: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
  office: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
};

function Tile({ icon, label, children }: { icon: keyof typeof tileIcons; label: string; children: ReactNode }) {
  return (
    <div className="mb-4 flex gap-[1.1rem] border border-line bg-ivory p-6 transition-[translate,border-color] duration-350 ease-marabu hover:translate-x-1.5 hover:border-gold">
      <span aria-hidden="true" className="grid size-[50px] flex-none place-items-center border-[1.5px] border-gold bg-cream text-gold-deep">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {tileIcons[icon]}
        </svg>
      </span>
      <div>
        <b className="mb-[0.3rem] block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">{label}</b>
        <div className="text-[0.95rem] font-normal">{children}</div>
      </div>
    </div>
  );
}

const fieldClass =
  "w-full border border-ink/22 bg-paper px-4 py-[0.85rem] text-[0.95rem] text-ink transition-[border-color,box-shadow] duration-250 placeholder:text-ink-muted/70 focus:border-gold focus:shadow-[0_0_0_3px_rgba(168,116,32,0.13)]";
const labelClass = "mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-deep";

export function ContactHero() {
  const { eyebrow, title, description, callLabel, whatsappLabel, image, captions, note } = contact.hero;
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
          <div className="mt-[2.2rem] flex flex-wrap gap-4" {...reveal(1200)}>
            <Button href={site.contact.phone.href}>{callLabel}</Button>
            <Button href={whatsappHref} variant="secondary" target="_blank" rel="noopener noreferrer">
              {whatsappLabel}
            </Button>
          </div>
        </div>
        <div {...reveal(350)}>
          <PhoneStage image={image} captions={captions} note={note} />
        </div>
      </Container>
    </section>
  );
}

export function ContactGrid() {
  const { reach, form } = contact;
  const { phone, email, address } = site.contact;
  const f = form.fields;

  return (
    <section aria-labelledby="reach-heading" className="relative py-section">
      <Container>
        <SectionHeading id="reach-heading" eyebrow={reach.eyebrow} title={reach.title} className="mb-12" />

        <div className="grid gap-12 min-[901px]:grid-cols-[0.92fr_1.08fr]">
          <div {...reveal()}>
            <Tile icon="phone" label={reach.tiles.phone.label}>
              <a href={phone.href} className="-my-[13px] inline-block py-[13px] font-semibold transition-colors hover:text-gold-deep">
                {phone.display}
              </a>
              <br />
              {reach.tiles.phone.note}
            </Tile>
            <Tile icon="email" label={reach.tiles.email.label}>
              <a href={emailHref} className="-my-[13px] inline-block break-all py-[13px] transition-colors hover:text-gold-deep">
                {email}
              </a>
              <br />
              {reach.tiles.email.note}
            </Tile>
            <Tile icon="office" label={reach.tiles.office.label}>
              <address className="not-italic">
                {address[0]}
                <br />
                {address[1]}
              </address>
            </Tile>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {reach.whatsappLabel}
              </Button>
              <Button href={emailHref} variant="secondary">
                {reach.emailLabel}
              </Button>
            </div>
          </div>

          {/* STRUCTURE ONLY: not connected to any backend. No action, and the submit
              button is disabled, so nothing is sent. Wire up the chosen submission
              method, enable the button and remove form.status together. */}
          <form
            aria-describedby="contact-form-status"
            className="border border-t-4 border-line border-t-gold bg-ivory px-[clamp(1.25rem,3vw,2.6rem)] py-11 shadow-[0_30px_60px_rgba(38,43,49,0.1)]"
            {...reveal(120)}
          >
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div className="mb-5">
                <label htmlFor="contact-name" className={labelClass}>{f.name.label}</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder={f.name.placeholder} className={fieldClass} />
              </div>
              <div className="mb-5">
                <label htmlFor="contact-phone" className={labelClass}>{f.phone.label}</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required placeholder={f.phone.placeholder} className={fieldClass} />
              </div>
            </div>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <div className="mb-5">
                <label htmlFor="contact-email" className={labelClass}>{f.email.label}</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={f.email.placeholder} className={fieldClass} />
              </div>
              <div className="mb-5">
                <label htmlFor="contact-service" className={labelClass}>{f.service.label}</label>
                <select id="contact-service" name="service" required defaultValue="" className={fieldClass}>
                  <option value="">{f.service.placeholder}</option>
                  {services.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="contact-message" className={labelClass}>{f.message.label}</label>
              <textarea id="contact-message" name="message" required placeholder={f.message.placeholder} className={`${fieldClass} min-h-[130px] resize-y`} />
            </div>
            <Button type="submit" disabled className="w-full">
              {form.submitLabel}
            </Button>
            <p id="contact-form-status" className="mt-[0.9rem] text-center font-hand text-[1.1rem] text-gold-deep">
              {form.status}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

export function ContactCta() {
  const { cta } = contact;
  return (
    <section className="relative pb-section">
      <Container>
        <div
          className="relative overflow-hidden border border-line bg-ivory px-[clamp(1.5rem,5vw,3rem)] py-[clamp(3rem,6vw,5rem)] text-center"
          {...reveal()}
        >
          <div className="mx-auto max-w-reading">
            <SplitText text={cta.title} className="text-display-2" />
            <Rule delay={500} center className="mt-6" />
            <p className="lede mt-6" {...reveal(300)}>
              {cta.description}
            </p>
          </div>
          <div className="mt-9 flex flex-col items-center gap-5" {...reveal(450)}>
            <Button href={site.contact.phone.href}>{contact.hero.callLabel}</Button>
            <Button href={whatsappHref} variant="text" target="_blank" rel="noopener noreferrer">
              {cta.whatsappLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
