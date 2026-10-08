// Homepage content (approved reference copy). See content/site.ts for the
// *accent* markup convention.

import { site, type Cta, type Stat } from "./site";

export type BuildStage = {
  label: string;
  title: string;
  body: string;
  hand?: string;
};

export const home = {
  metaTitle: "Marabu Constructions — Precision in Every Angle, Strength in Every Build",

  hero: {
    eyebrow: `${site.parent} · ${site.location}`,
    title: "*Precision* in every angle. *Strength* in every build.",
    description:
      "Villas, interiors, bridges, fabrication sheds — every Marabu project runs the same honest sequence. Keep scrolling: behind this page, one of our buildings rises from bare grid lines to handover.",
    primary: { label: "Watch the Build", href: "#flow" } as Cta,
    secondary: { label: "Explore Services", href: "/services" } as Cta,
  },

  // The twelve construction stages narrated alongside the drawing.
  stages: [
    {
      label: "Stage 01 · Setting Out",
      title: "Every project begins as geometry",
      body: "Whether it's a villa, a bridge or a fabrication shed — grids strung, benchmarks fixed, levels transferred to ±0.00 before anything moves.",
    },
    {
      label: "Stage 02 · Foundations",
      title: "Engineered to the soil, not to habit",
      body: "Pad footings, piles or raft — designed from the soil report and cast on blinding. The invisible storey, checked hardest.",
      hand: "no structure outruns its foundation",
    },
    {
      label: "Stage 03 · The Skeleton",
      title: "Bones of concrete & steel",
      body: "Columns rise, slabs land on bolted bearing plates — concrete frame or structural steel, the same discipline either way.",
    },
    {
      label: "Stage 04 · Level on Level",
      title: "A rhythm you can trust",
      body: "Floor follows floor, decks span, bracing holds everything true while the structure finds its strength — villa or viaduct alike.",
    },
    {
      label: "Stage 05 · Topping Out",
      title: "The last beam is gold",
      body: "The final member goes up painted gold — the ironworkers' tradition we honour on every Marabu site, from shed roof to bridge deck.",
      hand: "topped out — safely, together",
    },
    {
      label: "Stage 06 · Core & Circulation",
      title: "A building is also a route",
      body: "Lifts, stairs and ramps thread the frame — circulation planned as carefully as structure, accessible end to end.",
    },
    {
      label: "Stage 07 · Closing It In",
      title: "Roof on, weather out",
      body: "Gable, skylight or curved shell — the envelope goes on detailed to the millimetre, dry below from the first sheet.",
    },
    {
      label: "Stage 08 · Fit-Out",
      title: "Interiors take shape",
      body: "Kitchens, joinery, false ceilings, cladding — our interior studio fits the building around real lives, not the other way round.",
    },
    {
      label: "Stage 09 · The Details",
      title: "The part everyone remembers",
      body: "Railings, steps, terraces, planting, the last coat of finish — small lines that separate a build from a home.",
      hand: "measure twice — admire forever",
    },
    {
      label: "Stage 10 · Services & Load Path",
      title: "Breath and bones",
      body: "Ducts, conduits, fire lines — and the load path from roof to footing marked, checked and signed in gold.",
    },
    {
      label: "Stage 11 · Life at 1.8 m",
      title: "The only load that matters",
      body: "People move through at human scale — families in villas, crowds on bridges, teams in workspaces. The building finally becomes itself.",
    },
    {
      label: "Stage 12 · Handover",
      title: "Keys, warranty, pride",
      body: "Snags closed to zero, documents bound, warranty handed over — every trade, one signature. That's the Marabu sequence.",
    },
  ] as BuildStage[],

  finale: {
    eyebrow: "100% · Handed Over",
    title: "Built on *paper*. Kept on *site*.",
    description:
      "Twelve stages — the same sequence we run on every project, whatever we're building, checked by an engineer at each one.",
    action: { label: "Build With Us", href: "/contact" } as Cta,
  },

  stats: [
    { value: site.facts.years, label: "Years of Craft" },
    { value: site.facts.projects, label: "Projects Delivered" },
    { value: site.facts.clients, label: "Happy Clients" },
    { value: site.facts.team, label: "Engineers & Artisans" },
  ] as Stat[],

  why: {
    eyebrow: "Why Marabu",
    title: "The *plumb line* we never bend.",
    items: [
      {
        title: "Engineer-led, always",
        description:
          "Every drawing is reviewed and signed by a certified engineer — not a salesman. Angles checked twice, budgets checked thrice.",
      },
      {
        title: "One accountable team",
        description:
          "From the first sketch to the final key, a single point of contact owns your project. No hand-offs, no finger-pointing.",
      },
      {
        title: "Transparency on paper",
        description:
          "Itemised estimates, milestone billing and weekly photo updates — you'll never have to guess your project's progress.",
      },
    ],
  },

  process: {
    eyebrow: "How We Work",
    title: "From pencil to *key*.",
    description: "The same twelve stages you just watched — condensed to a promise.",
    steps: [
      {
        title: "Consult & Study",
        description:
          "We visit your plot, listen to your vision and study the land — sunlight, soil, slope and street.",
      },
      {
        title: "Sketch & Estimate",
        description:
          "Layouts, 3D elevations and an itemised quotation — revised until you smile before we begin.",
      },
      {
        title: "Build & Hand Over",
        description:
          "Certified engineers on site, weekly updates, and a snag-free handover with documents and warranty.",
      },
    ],
  },
};
