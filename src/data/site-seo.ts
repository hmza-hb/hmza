export const SITE_URL = "https://hmza.cc";
export const SITE_NAME = "HMZA";
export const SITE_TAGLINE = "Engineering Beyond Boundaries";

export const defaultDescription =
  "HMZA is an independent digital laboratory for research, open-source systems, security tooling, writings, and lab experiments led by Hamza Hafeez.";

export const defaultKeywords = [
  "HMZA",
  "HMZA Labs",
  "Hamza Hafeez",
  "hmza-hb",
  "digital laboratory",
  "software engineering",
  "distributed systems",
  "application security",
  "open source",
  "research",
  "Project Cortex",
  "backend engineering",
  "multi-agent systems",
] as const;

export const ogImagePath = "/images/hero-bg.jpeg";

export const person = {
  name: "Hamza Hafeez",
  givenName: "Hamza",
  familyName: "Hafeez",
  url: `${SITE_URL}/profile`,
  email: "hello@hmza.cc",
  jobTitle: "Software engineer",
  alternateName: ["hmza-hb", "HMZA"],
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
    headline: SITE_TAGLINE,
    description: defaultDescription,
  },
  {
    path: "/research",
    name: "Research",
    headline: "Research",
    description:
      "Research publications from HMZA Labs, including Project Cortex and lab architecture work.",
  },
  {
    path: "/writing",
    name: "Writing",
    headline: "Writing",
    description:
      "Blogs, case studies, and publications from HMZA Labs, including the Project Cortex case study.",
  },
  {
    path: "/open-source",
    name: "Open source",
    headline: "Open source",
    description:
      "Selected lab repositories, upstream contributions, and security tooling by Hamza Hafeez.",
  },
  {
    path: "/profile",
    name: "Profile",
    headline: "Hamza Hafeez",
    description:
      "Profile of Hamza Hafeez, builder, engineer, and founder of the HMZA independent lab.",
  },
  {
    path: "/contact",
    name: "Contact",
    headline: "Contact",
    description:
      "Contact HMZA Labs at hello@hmza.cc or via Instagram, X, and LinkedIn.",
  },
  {
    path: "/join-labs",
    name: "Join Labs",
    headline: "Join Labs",
    description:
      "Apply to HMZA Labs for participation and funding. Not hiring: we select brilliant minds who inspire us.",
  },
] as const;

export type SitePagePath = (typeof sitePages)[number]["path"];
