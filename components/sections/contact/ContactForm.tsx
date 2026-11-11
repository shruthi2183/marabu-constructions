"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type LeadFormState } from "@/app/contact/actions";
import Button from "@/components/ui/Button";
import { reveal } from "@/components/ui/reveal";
import { contact } from "@/content/contact";
import { services } from "@/content/services";
import { site } from "@/content/site";
import type { LeadField } from "@/lib/leads";

// The contact form, submitted to the submitLead Server Action, which validates
// it and sends a WhatsApp alert to the team (see lib/whatsapp.ts). Shows
// per-field errors, a pending state, and a thank-you screen with a prefilled
// "continue on WhatsApp" link.

const fieldClass =
  "w-full border border-ink/22 bg-paper px-4 py-[0.85rem] text-[0.95rem] text-ink transition-[border-color,box-shadow] duration-250 placeholder:text-ink-muted/70 focus:border-gold focus:shadow-[0_0_0_3px_rgba(168,116,32,0.13)] aria-invalid:border-[#9b3b22]";
const labelClass = "mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-deep";
const errorClass = "mt-[0.4rem] text-[0.82rem] text-[#9b3b22]";
const panelClass =
  "border border-t-4 border-line border-t-gold bg-ivory px-[clamp(1.25rem,3vw,2.6rem)] py-11 shadow-[0_30px_60px_rgba(38,43,49,0.1)]";

const initialState: LeadFormState = { status: "idle" };
const FIELD_ORDER: LeadField[] = ["name", "phone", "email", "service", "message"];

export default function ContactForm() {
  // Bumping the key remounts the form, clearing it for another enquiry.
  const [round, setRound] = useState(0);
  return <LeadForm key={round} onAgain={() => setRound((r) => r + 1)} />;
}

function LeadForm({ onAgain }: { onAgain: () => void }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const { fields: f, sent } = contact.form;
  const errors = state.errors ?? {};
  const values = state.values;

  useEffect(() => {
    if (state.status === "invalid") {
      const first = FIELD_ORDER.find((k) => state.errors?.[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
    if (state.status === "sent") thanksRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    const whatsapp = `${site.contact.whatsapp.href}${state.summary ? `?text=${encodeURIComponent(state.summary)}` : ""}`;
    return (
      <div className={`${panelClass} flex flex-col justify-center text-center`} role="status">
        <h3 ref={thanksRef} tabIndex={-1} className="text-[1.7rem] outline-none">
          {sent.title}
        </h3>
        <p className="lede mx-auto mt-3 max-w-[30rem]">{sent.description}</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button href={whatsapp} target="_blank" rel="noopener noreferrer">
            {sent.whatsappLabel}
          </Button>
          <Button variant="text" onClick={onAgain}>
            {sent.again}
          </Button>
        </div>
      </div>
    );
  }

  const describe = (k: LeadField) => (errors[k] ? `contact-${k}-error` : undefined);
  const error = (k: LeadField) =>
    errors[k] ? (
      <p id={`contact-${k}-error`} className={errorClass}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} action={formAction} aria-describedby="contact-form-status" className={panelClass} {...reveal(120)}>
      {/* Honeypot for bots: off-screen and out of the tab order. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company-website">Company website</label>
        <input id="contact-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <div className="mb-5">
          <label htmlFor="contact-name" className={labelClass}>{f.name.label}</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={80}
            defaultValue={values?.name} aria-invalid={!!errors.name || undefined} aria-describedby={describe("name")}
            placeholder={f.name.placeholder} className={fieldClass} />
          {error("name")}
        </div>
        <div className="mb-5">
          <label htmlFor="contact-phone" className={labelClass}>{f.phone.label}</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={20}
            defaultValue={values?.phone} aria-invalid={!!errors.phone || undefined} aria-describedby={describe("phone")}
            placeholder={f.phone.placeholder} className={fieldClass} />
          {error("phone")}
        </div>
      </div>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <div className="mb-5">
          <label htmlFor="contact-email" className={labelClass}>{f.email.label}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={120}
            defaultValue={values?.email} aria-invalid={!!errors.email || undefined} aria-describedby={describe("email")}
            placeholder={f.email.placeholder} className={fieldClass} />
          {error("email")}
        </div>
        <div className="mb-5">
          <label htmlFor="contact-service" className={labelClass}>{f.service.label}</label>
          <select id="contact-service" name="service" required defaultValue={values?.service ?? ""}
            aria-invalid={!!errors.service || undefined} aria-describedby={describe("service")} className={fieldClass}>
            <option value="">{f.service.placeholder}</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
          {error("service")}
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="contact-message" className={labelClass}>{f.message.label}</label>
        <textarea id="contact-message" name="message" required maxLength={1000}
          defaultValue={values?.message} aria-invalid={!!errors.message || undefined} aria-describedby={describe("message")}
          placeholder={f.message.placeholder} className={`${fieldClass} min-h-[130px] resize-y`} />
        {error("message")}
      </div>
      <Button type="submit" disabled={pending} aria-busy={pending || undefined} className="w-full">
        {pending ? contact.form.pendingLabel : contact.form.submitLabel}
      </Button>
      <p id="contact-form-status" role="status" className="mt-[0.9rem] text-center font-hand text-[1.1rem] text-gold-deep">
        {state.status === "invalid" ? contact.form.invalid : state.status === "failed" ? contact.form.failed : contact.form.note}
      </p>
    </form>
  );
}
