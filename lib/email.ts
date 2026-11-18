// Lead alerts by email through Resend's HTTP API (server only — reads a secret
// from the environment; never import this from a Client Component).
//
// Configuration (.env.local locally, the host's environment in production;
// see .env.example):
//   RESEND_API_KEY   API key with "Sending access" (resend.com → API Keys)
//   LEAD_EMAIL_TO    inbox that receives alerts. Until a domain is verified in
//                    Resend, this must be the address the Resend account uses.
//   LEAD_EMAIL_FROM  optional sender, e.g. "Marabu Website <leads@your-domain>"
//                    once that domain is verified; defaults to Resend's
//                    onboarding sender.
//
// Without RESEND_API_KEY or LEAD_EMAIL_TO it runs in dry-run mode: the alert
// is printed to the server log instead of sent.

import type { Lead } from "./leads";
import type { AlertResult } from "./whatsapp";

const DEFAULT_FROM = "Marabu Website <onboarding@resend.dev>";

// Lead fields are untrusted text: escape before putting them into HTML.
const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function render(lead: Lead) {
  const phoneDigits = lead.phone.replace(/[^\d+]/g, "");
  const rows: [string, string][] = [
    ["Name", escape(lead.name)],
    ["Phone", `<a href="tel:${phoneDigits}">${escape(lead.phone)}</a>`],
    ["Email", lead.email ? `<a href="mailto:${escape(lead.email)}">${escape(lead.email)}</a>` : "—"],
    ["Service", escape(lead.service)],
    ["Project", escape(lead.message).replace(/\r?\n/g, "<br>")],
  ];
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#262b31;max-width:560px">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a5a10">Marabu Constructions · Website</p>
  <h2 style="margin:0 0 16px;font-size:20px">New enquiry from ${escape(lead.name)}</h2>
  <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:15px">
    ${rows.map(([k, v]) => `<tr><td style="border-bottom:1px solid #e6dcc6;color:#5b636c;width:90px;vertical-align:top">${k}</td><td style="border-bottom:1px solid #e6dcc6">${v}</td></tr>`).join("\n    ")}
  </table>
  <p style="margin:16px 0 0;font-size:13px;color:#5b636c">Call back within one working day — that's what the site promises.</p>
</div>`;
  const text = [
    `New enquiry from ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "—"}`,
    `Service: ${lead.service}`,
    `Project: ${lead.message}`,
  ].join("\n");
  return { html, text };
}

export async function sendLeadEmail(lead: Lead): Promise<AlertResult> {
  const { RESEND_API_KEY: key, LEAD_EMAIL_TO: to } = process.env;
  const subject = `New enquiry: ${lead.name} – ${lead.service}`;
  const { html, text } = render(lead);

  if (!key || !to) {
    console.info(`[lead] Email not configured — dry run. Would email ${to || "(LEAD_EMAIL_TO unset)"}: ${subject}`);
    return { ok: true, mode: "dry-run" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || DEFAULT_FROM,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        subject,
        html,
        text,
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (res.ok) return { ok: true, mode: "sent" };
    // Resend's error body names the problem (invalid key, recipient not allowed
    // without a verified domain…). It never contains the key.
    console.error(`[lead] Resend API ${res.status}: ${(await res.text().catch(() => "")).slice(0, 500)}`);
    return { ok: false, mode: "sent", error: `Resend API ${res.status}` };
  } catch (err) {
    console.error("[lead] Resend request failed:", err);
    return { ok: false, mode: "sent", error: "network" };
  }
}
