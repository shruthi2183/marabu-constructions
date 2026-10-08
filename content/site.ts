// Site-wide content for Marabu Constructions.
//
// Copy comes from the approved HTML reference (reference/marabu-html/),
// confirmed by the client on 2026-10-08 as real company information.
//
// Accent markup: wrap words in *asterisks* to set them in the italic gold
// accent style (rendered by components/ui/SplitText.tsx).

export type Cta = {
  label: string;
  href: string;
};

export type ContentImage = {
  src: string; // Path under public/, e.g. "/images/services/villas.webp"
  alt: string; // Describe the image; use "" only if purely decorative
  width: number;
  height: number;
};

export type Stat = {
  value: number;
  label: string;
};

const whatsappNumber = "919080455007";
const whatsappMessage = "Hi Marabu Constructions, I'd like to discuss a project.";

export const site = {
  name: "Marabu Constructions",
  parent: "A Unit of Marabu Groups",
  location: "Salem, Tamil Nadu",
  tagline: "Precision in Every Angle · Strength in Every Build",
  quote: "Let's turn your vision into reality.",
  description:
    "Marabu Constructions (A Unit of Marabu Groups), Salem — constructions, planning & consulting, interior designing, infrastructure fabrication and villas across Tamil Nadu.",

  contact: {
    phone: { display: "+91 90804 55007", href: "tel:+919080455007", person: "Er. Arul Selvan R" },
    whatsapp: {
      href: `https://wa.me/${whatsappNumber}`,
      withMessage: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    },
    email: "marabuconstructions@gmail.com",
    address: ["Dheeran Chinnamalai Street, Burns Colony,", "Mamangam, Salem – 636 005"],
  },

  // Company figures, shown with a "+" suffix.
  facts: {
    years: 18,
    projects: 250,
    clients: 120,
    team: 40,
    districts: 6,
  },

  // Closing ticker phrase used on most pages.
  tickerClosing: "Let's Build Your Dream Together",

  closingCta: {
    title: "Let's build your *dream* together.",
    description:
      "Bring us your plot, your plan, or an idea on the back of an envelope — we'll take it from there.",
    action: { label: "Build With Us", href: "/contact" } as Cta,
  },
};

export const whatsappHref = site.contact.whatsapp.withMessage;
export const emailHref = `mailto:${site.contact.email}`;
