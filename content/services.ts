import type { ContentImage, Cta } from "./site";

// The five Marabu services (approved reference copy).

export type Service = {
  slug: string; // Unique, URL-safe id; also used for a future /services/[slug] page
  title: string;
  summary: string;
  points: string[];
  image?: ContentImage;
  // Set once a detail page exists. The reference links each service to
  // /services/<slug>, but those pages have not been built yet.
  href?: string;
};

export const services: Service[] = [
  {
    slug: "constructions",
    title: "Constructions",
    summary:
      "Turnkey residential and commercial builds — one accountable team from excavation to final finish, engineer-checked at every stage.",
    points: [
      "RCC & structural steel execution",
      "Quality-staged materials, milestone billing",
      "Weekly photo & video reports",
    ],
    image: {
      src: "/images/services/constructions.webp",
      alt: "Hand-drawn construction site sketch with steel connections, scaffolding and caution tape",
      width: 1200,
      height: 670,
    },
  },
  {
    slug: "planning-and-consulting",
    title: "Planning & Consulting",
    summary:
      "Layouts, structural design, estimates and approvals — every strong building is decided on paper before a single brick moves.",
    points: [
      "3D elevations & working drawings",
      "Itemised, transparent estimates",
      "Approvals & vastu-conscious planning",
    ],
    image: {
      src: "/images/services/planning-and-consulting.webp",
      alt: "Hand-drawn office scene with laptops, books, coffee cups and sketching materials",
      width: 528,
      height: 944,
    },
  },
  {
    slug: "interior-designing",
    title: "Interior Designing",
    summary:
      "Kitchens, lighting, wardrobes and finishes sketched around your life — then executed snag-free by our own interior team.",
    points: [
      "Concept boards & 3D views",
      "Modular kitchens & joinery",
      "Turnkey execution, snag-free handover",
    ],
    image: {
      src: "/images/services/interior-designing.webp",
      alt: "Hand-drawn kitchen design with cabinetry, island, built-in oven and stainless steel backsplash annotations",
      width: 672,
      height: 376,
    },
  },
  {
    slug: "infrastructure-fabrication",
    title: "Infrastructure Fabrication",
    summary:
      "Steel sheds, trusses and industrial structures — engineered for load, fabricated in-house, erected on schedule.",
    points: [
      "Factory sheds & godowns",
      "Trusses, purlins & roofing",
      "MS fabrication & site erection",
    ],
    image: {
      src: "/images/services/infrastructure-fabrication.webp",
      alt: "Hand-drawn canopy structure sketch with 15.5m span, roof curve and stall layout annotations",
      width: 512,
      height: 512,
    },
  },
  {
    slug: "villas",
    title: "Villas",
    summary:
      "Bespoke villas designed around your family and your plot — a single point of ownership from first sketch to final key.",
    points: [
      "Custom design & elevations",
      "Landscape & compound planning",
      "Premium finishes & fittings",
    ],
    image: {
      src: "/images/services/villas.webp",
      alt: "Hand-drawn modern curvilinear villa with concrete and timber facade, glass windows, trees and stone pathway",
      width: 504,
      height: 504,
    },
  },
];

export const servicesPage = {
  metaTitle: "Services — Marabu Constructions | What We Draw, We Build",
  metaDescription:
    "Marabu Constructions services — constructions, planning & consulting, interior designing, infrastructure fabrication and villas across Salem and Tamil Nadu.",

  hero: {
    eyebrow: "Our Services · Salem, Tamil Nadu",
    title: "What we *draw*, we *build*.",
    description:
      "Five crafts, one accountable team — from the first pencil line to the final key. Pick a service to see exactly how we run it.",
    hand: "psst — move your cursor… you're sketching now ✎",
    image: {
      src: "/images/services/hero-masonry.webp",
      alt: "Hand-drawn sketch of brick masonry wall construction with workers, scaffolding and crane",
      width: 1200,
      height: 674,
    },
  },

  list: {
    eyebrow: "Five Crafts",
    title: "Pick a *line*. We'll build it.",
  },

  more: {
    kicker: "And Everything Between",
    title: "Something else in mind?",
    description:
      "Renovations, project management, structural consulting — if it stands, we plan it first. Bring us the idea; we'll bring the pencil.",
    action: { label: "Get in Touch", href: "/contact" } as Cta,
  },
};
