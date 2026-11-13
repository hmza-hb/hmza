export const CORTEX_RESEARCH_PDF = "/project-cortex.pdf";

export type ResearchPublication = {
  id: string;
  title: string;
  subtitle?: string;
  authors: string;
  venue: string;
  year: number;
  month?: string;
  pdf: string;
};

export const scholarProfile = {
  name: "Hamza Hafeez",
  affiliation: "HMZA Labs",
  homepage: "https://hmza.cc",
  homepageLabel: "hmza.cc",
  interests: [
    "Cognitive architectures",
    "Software security",
    "Distributed systems",
    "Open source",
  ],
};

export const publications: ResearchPublication[] = [
  {
    id: "cortex-research",
    title:
      "A Prefrontal-Cortex-Inspired Orchestrated Architecture for Artificial General Intelligence",
    subtitle: "Project Cortex",
    authors: "Hamza Hafeez",
    venue: "HMZA Labs",
    year: 2025,
    month: "November",
    pdf: CORTEX_RESEARCH_PDF,
  },
];
