export const SITE_URL = "https://hmza.cc";
export const SITE_NAME = "HMZA";
export const SITE_TAGLINE = "Engineering Beyond Boundaries";

export const personImagePath = "/images/hamza.jpeg";

export const defaultDescription =
  "Hamza Hafeez is the founder of HMZA Labs (hmza.cc): an independent digital laboratory for research, open-source security systems, distributed backends, Project Cortex, and public engineering.";

export const homeTitle = "Hamza Hafeez · HMZA Labs";

export const homeDescription =
  "Official home of Hamza Hafeez and HMZA Labs. Research, open source, security tooling, writings, and experiments in distributed systems and multi-agent intelligence.";

export const defaultKeywords = [
  "Hamza Hafeez",
  "Hamza",
  "HMZA",
  "HMZA Labs",
  "hmza.cc",
  "hmza-hb",
  "Hamza Hafeez engineer",
  "Hamza Hafeez developer",
  "Hamza Hafeez open source",
  "Hamza Hafeez Project Cortex",
  "digital laboratory",
  "software engineering",
  "distributed systems",
  "application security",
  "open source",
  "research",
  "Project Cortex",
  "Cortex EDR",
  "backend engineering",
  "multi-agent systems",
] as const;

export const ogImagePath = "/images/hero-bg.jpeg";

export const person = {
  name: "Hamza Hafeez",
  givenName: "Hamza",
  familyName: "Hafeez",
  url: `${SITE_URL}/profile`,
  homePage: SITE_URL,
  email: "hello@hmza.cc",
  jobTitle: "Software engineer",
  description:
    "Hamza Hafeez builds distributed systems, application security engines, and open-source lab software. Founder of HMZA Labs.",
  alternateName: ["Hamza", "hmza-hb", "HMZA", "Hamza Hafeez HMZA"],
  knowsAbout: [
    "Distributed systems",
    "Application security",
    "Open-source software",
    "Multi-agent systems",
    "Project Cortex",
    "Backend engineering",
    "Web crawlers",
    "Microservices",
  ],
} as const;

export const sameAs = [
  "https://github.com/hmza-hb",
  "https://www.linkedin.com/in/hmza-hb",
  "https://x.com/hmza_hb",
  "https://instagram.com/hamza.hafeez82",
  "https://hamza-hafeez.site",
] as const;

/** Navbar and knowledge-graph pages (keep in sync with primary routes). */
export const sitePages = [
  {
    path: "/" as const,
    name: "Lab",
    headline: homeTitle,
    description: homeDescription,
  },
  {
    path: "/profile",
    name: "Profile",
    headline: "Hamza Hafeez",
    description:
      "Hamza Hafeez: builder, software engineer, and founder of HMZA Labs. Official profile, work, and lab story.",
  },
  {
    path: "/research",
    name: "Research",
    headline: "Research",
    description:
      "Research by Hamza Hafeez and HMZA Labs, including Project Cortex and multi-agent architecture.",
  },
  {
    path: "/writing",
    name: "Writing",
    headline: "Writing",
    description:
      "Writing and case studies from Hamza Hafeez and HMZA Labs, including Project Cortex.",
  },
  {
    path: "/open-source",
    name: "Open source",
    headline: "Open source",
    description:
      "Open-source repositories and contributions by Hamza Hafeez: Cortex, crawlers, SDKs, and security tooling.",
  },
  {
    path: "/contact",
    name: "Contact",
    headline: "Contact",
    description:
      "Contact Hamza Hafeez and HMZA Labs at hello@hmza.cc or via GitHub, LinkedIn, and X.",
  },
  {
    path: "/join-labs",
    name: "Join Labs",
    headline: "Join Labs",
    description:
      "Apply to HMZA Labs founded by Hamza Hafeez. Funding for brilliant minds, not traditional hiring.",
  },
] as const;

export type SitePagePath = (typeof sitePages)[number]["path"];