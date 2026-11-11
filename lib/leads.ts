// Contact-form lead: server-side validation and normalisation. Every field
// arrives from an untrusted POST (Server Actions are public endpoints), so
// nothing here trusts the browser's own `required` / `type` checks.

import { services } from "@/content/services";

export type Lead = {
  name: string;
  phone: string; // normalised, e.g. "+91 98765 43210"
  email: string; // "" when not given
  service: string;
  message: string;
};

export type LeadField = keyof Lead;
export type LeadErrors = Partial<Record<LeadField, string>>;
export type LeadValues = Record<LeadField, string>;

const LIMITS = { name: [2, 80], email: [0, 120], message: [10, 1000] } as const;
const SERVICE_TITLES = services.map((s) => s.title);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (form: FormData, key: LeadField) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
};

/** Indian mobile (10 digits starting 6–9, optional +91 / 91 / 0 prefix) or
 *  any international number written with a leading "+" (8–15 digits). */
export function normalisePhone(raw: string): string | null {
  const compact = raw.replace(/[\s\-().]/g, "");
  const indian = compact.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  if (indian) return `+91 ${indian[1].slice(0, 5)} ${indian[1].slice(5)}`;
  if (/^\+\d{8,15}$/.test(compact)) return compact;
  return null;
}

export function parseLead(form: FormData): { lead: Lead; errors?: undefined; values: LeadValues } | { lead?: undefined; errors: LeadErrors; values: LeadValues } {
  const values: LeadValues = {
    name: text(form, "name"),
    phone: text(form, "phone"),
    email: text(form, "email"),
    service: text(form, "service"),
    message: text(form, "message"),
  };
  const errors: LeadErrors = {};

  if (values.name.length < LIMITS.name[0]) errors.name = "Please tell us your name.";
  else if (values.name.length > LIMITS.name[1]) errors.name = `Please keep your name under ${LIMITS.name[1]} characters.`;

  const phone = normalisePhone(values.phone);
  if (!values.phone) errors.phone = "Please add a phone number so we can call you back.";
  else if (!phone) errors.phone = "Please enter a valid mobile number, e.g. 98765 43210.";

  if (values.email && (!EMAIL.test(values.email) || values.email.length > LIMITS.email[1]))
    errors.email = "That email doesn't look right — or leave it blank.";

  if (!SERVICE_TITLES.includes(values.service)) errors.service = "Please choose a service.";

  if (values.message.length < LIMITS.message[0])
    errors.message = "Please add a few words about your project (plot, location, timeline…).";
  else if (values.message.length > LIMITS.message[1])
    errors.message = `Please keep it under ${LIMITS.message[1]} characters — we'll discuss the rest on the call.`;

  if (Object.keys(errors).length || !phone) return { errors, values };
  return { lead: { ...values, phone }, values };
}
