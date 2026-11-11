"use server";

import { headers } from "next/headers";
import { parseLead, type LeadErrors, type LeadValues } from "@/lib/leads";
import { alertText, sendLeadAlert } from "@/lib/whatsapp";

// Contact-form submission. A public endpoint: no login exists, so the guards
// are a honeypot field, a per-IP rate limit and full server-side validation.

export type LeadFormState = {
  status: "idle" | "invalid" | "sent" | "failed";
  errors?: LeadErrors;
  values?: LeadValues;
  /** Prefilled "continue on WhatsApp" text for the success screen. */
  summary?: string;
};

// Best-effort, per server instance (resets on restart / differs between
// serverless instances) — enough to blunt a burst from one address.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear(); // keep memory bounded
  return hits.length > MAX_PER_WINDOW;
}

export async function submitLead(_prev: LeadFormState, form: FormData): Promise<LeadFormState> {
  // Honeypot: hidden from people, filled in by bots. Pretend it worked.
  if (form.get("company_website")) return { status: "sent" };

  const parsed = parseLead(form);
  if (!parsed.lead) return { status: "invalid", errors: parsed.errors, values: parsed.values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    console.warn(`[lead] rate limited ${ip}`);
    return { status: "failed", values: parsed.values };
  }

  const { lead } = parsed;
  const result = await sendLeadAlert(lead);
  if (!result.ok) {
    // Keep the enquiry in the server log so it can be followed up by hand.
    console.error(`[lead] NOT DELIVERED (${result.error}):\n${alertText(lead)}`);
    return { status: "failed", values: parsed.values };
  }

  return {
    status: "sent",
    summary: `Hi Marabu Constructions, I'm ${lead.name}. I just sent an enquiry on your website about ${lead.service}.`,
  };
}
