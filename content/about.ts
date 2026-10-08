// About page content (approved reference copy). See content/site.ts for the
// *accent* markup convention.

import { site, type ContentImage, type Cta, type Stat } from "./site";

export type Pillar = {
  icon: "shield" | "gem" | "compass" | "people";
  title: string;
  description: string;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
  hand?: string;
};

export const about = {
  metaTitle: "About Us — Marabu Constructions | Precision in Every Angle, Strength in Every Build",
  metaDescription:
    "The story of Marabu Constructions — a unit of Marabu Groups, Salem. 18+ years of craft, values that don't bend, and a timeline drawn one year at a time.",

  hero: {
    eyebrow: `About Marabu · ${site.parent}`,
    title: "The story behind *the lines*.",
    description:
      "Marabu Constructions is a unit of Marabu Groups, Salem — 18 years of engineer-led building, from bare grid lines to handed-over homes. Watch our mark draw itself in pencil, color itself in, and resolve into the logo — exactly how every Marabu project is made.",
    hand: "every line on this page is drawn, not printed ✎",
    primary: { label: "Read the Timeline", href: "#timeline" } as Cta,
    secondary: { label: "Explore Services", href: "/services" } as Cta,
    captions: {
      drawing: "watch — the logo draws itself ✎",
      coloring: "…then it colors itself ✎",
    },
  },

  story: {
    eyebrow: "Who We Are",
    title: "A drafting board, a theodolite, and *one belief*",
    quote:
      "Marabu began with a simple conviction: Salem deserved buildings made with both patience and precision. Every drawing reviewed and signed by a certified engineer — never a salesman. Every angle checked twice, every budget checked thrice.",
    body: "Today we build across five crafts — villas, interiors, planning, fabrication and turnkey construction — with the same pencil-first discipline. The tools got faster; the honesty didn't change.",
    stats: [
      { value: site.facts.years, label: "Years of Experience" },
      { value: site.facts.projects, label: "Projects Delivered" },
      { value: site.facts.clients, label: "Happy Clients" },
      { value: site.facts.team, label: "Engineers & Artisans" },
    ] as Stat[],
  },

  pillars: {
    eyebrow: "What We Stand On",
    title: "Four lines we *never smudge*",
    items: [
      {
        icon: "shield",
        title: "Built on Trust",
        description:
          "Honesty, transparency and reliability as the foundation of every client relationship.",
      },
      {
        icon: "gem",
        title: "Quality That Endures",
        description:
          "Premium materials and rigorous standards, so every structure outlasts its warranty.",
      },
      {
        icon: "compass",
        title: "Design That Inspires",
        description:
          "Innovation blended with functionality and aesthetics — spaces that feel sketched around you.",
      },
      {
        icon: "people",
        title: "Client-Centric Approach",
        description:
          "One accountable team, weekly photo updates, and decisions made with you — not for you.",
      },
    ] as Pillar[],
  },

  compass: {
    eyebrow: "Our Compass",
    title: "Vision · Mission · *Values*",
    items: [
      {
        kicker: "01 — Vision",
        title: "Where we're headed",
        description:
          "To be the most trusted name in construction and real estate across Tamil Nadu — the firm people recommend without being asked.",
      },
      {
        kicker: "02 — Mission",
        title: "What we do daily",
        description:
          "To design and deliver spaces of lasting value through superior craftsmanship, transparent processes and on-time handovers.",
      },
      {
        kicker: "03 — Values",
        title: "What drives decisions",
        description:
          "Integrity, quality, safety and client focus — the plumb line every decision is checked against, with zero exceptions.",
      },
    ],
  },

  timeline: {
    eyebrow: "The Journey",
    title: "Drawn one year at a *time*",
    description: "Eighteen years, compressed to a page you can scroll in a minute.",
    milestones: [
      {
        year: "2007",
        title: "The First Line",
        description:
          "Marabu Constructions is founded in Salem — a drafting board, a theodolite, and one belief.",
        hand: "every landmark starts as geometry",
      },
      {
        year: "2010",
        title: "First Fifty Families",
        description:
          "Fifty homes delivered across Salem and Namakkal — the first wave of word-of-mouth we still live on.",
      },
      {
        year: "2013",
        title: "Into Commercial",
        description:
          "Our first mixed-use commercial block is handed over — daylight, footfall and low-maintenance by design.",
      },
      {
        year: "2016",
        title: "Interior Studio Opens",
        description:
          "A dedicated interior design team launches — kitchens and joinery sketched around real lives.",
        hand: "rooms get rooms",
      },
      {
        year: "2018",
        title: "A Decade of Craft",
        description:
          "Ten years in — 150+ projects, zero shortcuts. The pencil-first discipline becomes company policy, on paper.",
      },
      {
        year: "2020",
        title: "Steel & Structure",
        description:
          "The infrastructure fabrication unit begins — sheds, trusses and industrial structures, welded once.",
      },
      {
        year: "2023",
        title: "Beyond Salem",
        description:
          "Projects delivered across Coimbatore, Trichy and Hosur — the sketchbook travels well.",
      },
      {
        year: "2025",
        title: "250+ Landmarks",
        description:
          "And every plan still begins with a pencil. The next line on the timeline could be yours.",
        hand: "let's draw it together ✎",
      },
    ] as Milestone[],
  },

  desk: {
    title: "The Desk It All Happens On",
    role: "The Marabu drafting desk · Salem",
    hand: `"${site.quote}"`,
    description:
      "Every Marabu project — villa, bridge or shed — is still reviewed at this desk before a single line goes to site.",
    image: {
      src: "/images/about/drafting-desk.webp",
      alt: "Architect's design desk with blueprints, a lamp, drafting compass and measuring tools",
      width: 408,
      height: 728,
    } as ContentImage,
    primary: { label: "Build With Us", href: "/contact" } as Cta,
    secondary: { label: "See the Work", href: "/projects" } as Cta,
  },

  cta: {
    title: "The next line is *yours*.",
  },
};
