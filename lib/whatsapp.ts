// Lead alerts over the Meta WhatsApp Cloud API (server only — reads secrets
// from the environment; never import this from a Client Component).
//
// Configuration (.env.local locally, the host's environment in production;
// see .env.example):
//   WHATSAPP_TOKEN            access token (temporary, then a system-user token)
//   WHATSAPP_PHONE_NUMBER_ID  the *sending* number's ID from WhatsApp → API Setup
//   WHATSAPP_TO               number that receives the alerts, digits only (918489055666)
//   WHATSAPP_TEMPLATE         approved template name: "new_lead_alert" (body has
//                             {{1}} name, {{2}} phone/email, {{3}} service, {{4}} message),
//                             or "hello_world" to test the connection only
//   WHATSAPP_TEMPLATE_LANG    template language code (default "en"; hello_world uses "en_US")
//   WHATSAPP_API_VERSION      Graph API version shown in API Setup's sample request
//
// Without WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_TO it runs in
// dry-run mode: the alert is printed to the server log instead of sent.

import type { Lead } from "./leads";

export type AlertResult = { ok: true; mode: "sent" | "dry-run" } | { ok: false; mode: "sent"; error: string };

// Template parameters may not contain newlines, tabs or 4+ consecutive spaces.
const param = (value: string, max: number) => {
  const flat = value.replace(/[\r\n\t]+/g, " · ").replace(/ {2,}/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
};

export function alertText(lead: Lead) {
  return [
    "New enquiry from the Marabu Constructions website.",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}${lead.email ? ` · ${lead.email}` : ""}`,
    `Service: ${lead.service}`,
    `Message: ${lead.message}`,
  ].join("\n");
}

export async function sendLeadAlert(lead: Lead): Promise<AlertResult> {
  const { WHATSAPP_TOKEN: token, WHATSAPP_PHONE_NUMBER_ID: phoneNumberId, WHATSAPP_TO: to } = process.env;
  const template = process.env.WHATSAPP_TEMPLATE || "new_lead_alert";
  const version = process.env.WHATSAPP_API_VERSION || "v23.0";

  if (!token || !phoneNumberId || !to) {
    console.info(`[lead] WhatsApp not configured — dry run. Would send to ${to || "(WHATSAPP_TO unset)"}:\n${alertText(lead)}`);
    return { ok: true, mode: "dry-run" };
  }

  const isConnectionTest = template === "hello_world";
  const language = process.env.WHATSAPP_TEMPLATE_LANG || (isConnectionTest ? "en_US" : "en");
  const body = {
    messaging_product: "whatsapp",
    to: to.replace(/\D/g, ""),
    type: "template",
    template: {
      name: template,
      language: { code: language },
      ...(isConnectionTest
        ? {}
        : {
            components: [
              {
                type: "body",
                parameters: [
                  param(lead.name, 80),
                  param(`${lead.phone}${lead.email ? ` · ${lead.email}` : ""}`, 160),
                  param(lead.service, 60),
                  param(lead.message, 700),
                ].map((text) => ({ type: "text", text })),
              },
            ],
          }),
    },
  };

  try {
    const res = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (res.ok) return { ok: true, mode: "sent" };
    const detail = await res.text().catch(() => "");
    // Meta's error body names the problem (expired token, template not approved,
    // recipient not in the test list…). It never contains the token.
    console.error(`[lead] WhatsApp API ${res.status}: ${detail.slice(0, 500)}`);
    return { ok: false, mode: "sent", error: `WhatsApp API ${res.status}` };
  } catch (err) {
    console.error("[lead] WhatsApp request failed:", err);
    return { ok: false, mode: "sent", error: "network" };
  }
}
