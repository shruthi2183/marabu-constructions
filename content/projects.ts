import { site, type ContentImage, type Cta, type Stat } from "./site";

// Project portfolio.
//
// No approved project information has been provided yet, so the entries below
// are PLACEHOLDERS (the reference's demo projects, stock photos and sample
// videos were deliberately not migrated). Replace them with approved projects.
//
// To add a project with media:
//   type  — one of the filter categories below (omit to show under "All Works" only)
//   media — { kind: "image", src } for a photo, or { kind: "video", src: <YouTube URL> }
//   thumb — the card image (for videos, e.g. a site photo or YouTube thumbnail)

export type ProjectType = "villas" | "commercial" | "interiors" | "infrastructure";

export type Project = {
  slug: string;
  title: string;
  category: string; // Card tag, e.g. "Villa"
  type?: ProjectType;
  summary: string; // Card text
  description?: string; // Longer text shown in the lightbox
  location?: string;
  year?: string;
  size?: string; // e.g. "4 800 sq.ft"
  thumb?: ContentImage;
  media?: { kind: "image" | "video"; src: string; label?: string };
  featured: boolean;
  href?: string;
};

export const projectFilters: { value: "all" | ProjectType; label: string }[] = [
  { value: "all", label: "All Works" },
  { value: "villas", label: "Villas" },
  { value: "commercial", label: "Commercial" },
  { value: "interiors", label: "Interiors" },
  { value: "infrastructure", label: "Infrastructure" },
];

export const projects: Project[] = [
  {
    slug: "placeholder-project-1",
    title: "[Replace with approved project name]",
    category: "[Replace with approved category]",
    summary: "[Replace with approved project description]",
    featured: true,
  },
  {
    slug: "placeholder-project-2",
    title: "[Replace with approved project name]",
    category: "[Replace with approved category]",
    summary: "[Replace with approved project description]",
    featured: true,
  },
  {
    slug: "placeholder-project-3",
    title: "[Replace with approved project name]",
    category: "[Replace with approved category]",
    summary: "[Replace with approved project description]",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectsPage = {
  metaTitle: "Projects — Marabu Constructions | Lines That Became Landmarks",
  metaDescription:
    "Selected work by Marabu Constructions — villas, interiors, commercial and industrial projects across Salem and Tamil Nadu. Every one began as a pencil sketch.",

  hero: {
    eyebrow: `Our Portfolio · ${site.location}`,
    title: "Lines that became *landmarks*.",
    description:
      "Each one began on the same drafting desk — as a pencil line. Filter by craft, open any card for the full story, photo or walkthrough video. New projects are added here as we hand them over.",
    primary: { label: "Browse the Work", href: "#gallery" } as Cta,
    secondary: { label: "Start Yours", href: "/contact" } as Cta,
  },

  stats: [
    { value: site.facts.projects, label: "Projects Delivered" },
    { value: site.facts.clients, label: "Happy Clients" },
    { value: site.facts.years, label: "Years of Craft" },
    { value: site.facts.districts, label: "Districts Served" },
  ] as Stat[],

  gallery: {
    eyebrow: "Selected Work",
    title: "The *sketchbook*, opened",
    empty: "No projects in this category yet.",
  },

  note: {
    hand: "more work in the sketchbook —",
    link: { label: "ask for the full portfolio →", href: "/contact" } as Cta,
    description:
      "We add projects here as we hand them over — photos and walkthrough videos, straight from site.",
  },

  cta: {
    title: "The next card here could be *yours*.",
  },
};
