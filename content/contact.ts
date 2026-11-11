// Contact page content (approved reference copy). See content/site.ts for the
// *accent* markup convention.

import { site, type ContentImage } from "./site";

export const contact = {
  metaTitle: "Contact Us — Marabu Constructions | Let's Build Your Dream Together",
  metaDescription:
    "Contact Marabu Constructions, Salem — call +91 90804 55007, WhatsApp or write to marabuconstructions@gmail.com. Let's build your dream together.",

  hero: {
    eyebrow: `Contact Marabu · ${site.location}`,
    title: "Let's build your *dream* together.",
    description:
      "Call, WhatsApp or write to us — every enquiry gets a personal reply within one working day. And yes, that phone on the right really is ringing for you.",
    callLabel: `Call ${site.contact.phone.display}`,
    whatsappLabel: "Chat on WhatsApp",
    image: {
      src: "/images/contact/ring-phone.webp",
      alt: "Hand-drawn sketch of a vintage rotary telephone ringing, with the receiver lifted and a RING RING!! speech bubble",
      width: 1024,
      height: 1024,
    } as ContentImage,
    captions: {
      drawing: "watch — the pencil draws the phone ✎",
      ringing: "…it's ringing — RING RING!! ☎",
      details: "go on — pick up ✎",
    },
    note: `☎ ${site.contact.phone.person} · ${site.contact.phone.display} — we're listening`,
  },

  reach: {
    eyebrow: "Reach Us",
    title: "Every channel, *one reply*",
    tiles: {
      phone: { label: "Call / WhatsApp", note: "Call or message — we pick up." },
      email: { label: "Email", note: "Write anytime — replies within a day." },
      office: { label: "Head Office" },
    },
    whatsappLabel: "WhatsApp Us",
    emailLabel: "Write an Email",
  },

  form: {
    fields: {
      name: { label: "Your Name", placeholder: "e.g. Ramesh Kumar" },
      phone: { label: "Phone", placeholder: "+91 ·····" },
      email: { label: "Email", placeholder: "you@email.com (optional)" },
      service: { label: "Service Needed", placeholder: "Select a service…" },
      message: { label: "Tell Us About Your Project", placeholder: "Plot size, location, budget range, timeline…" },
    },
    submitLabel: "Request a Free Consultation",
    pendingLabel: "Sending…",
    note: "We reply to every enquiry within one working day.",
    invalid: "Please check the highlighted fields.",
    sent: {
      title: "Thank you — your enquiry is with us.",
      description: "Our engineer will call you within one working day. Want to talk sooner?",
      whatsappLabel: "Continue on WhatsApp",
      again: "Send another enquiry",
    },
    failed:
      "Sorry — we couldn't send your enquiry just now. Please call or WhatsApp us and we'll take it from there.",
  },

  cta: {
    title: "Prefer that *we call you*?",
    description:
      "Drop your number in the form above — or just call. Either way, the phone's already off the hook.",
    whatsappLabel: "or WhatsApp us instead",
  },
};
