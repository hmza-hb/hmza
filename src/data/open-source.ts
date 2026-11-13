export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SelectedProject = {
  id: string;
  name: string;
  description: string;
  links: ProjectLink[];
};

export type OssContribution = {
  id: string;
  label: string;
  href: string;
  summary: string;
};

export const GITHUB_USERNAME = "hmza-hb";

export const githubProfileUrl = "https://github.com/hmza-hb";

export const githubStreakImageUrl =
  "https://streak-stats.demolab.com/?user=hmza-hb&theme=light&hide_border=true&border_radius=20&background=FFFFFF&ring=111111&fire=111111&currStreakNum=111111&sideNums=6d6d6d&currStreakLabel=6d6d6d&sideLabels=6d6d6d&dates=6d6d6d";

export const openSourceIntro =
  "I design, secure, scale and maintain distributed backend systems.";

export const selectedProjects: SelectedProject[] = [
  {
    id: "cortex",
    name: "Cortex",
    description:
      "Application security engine on RAG and a multi-agent harness, with a pentest CLI and an audit CLI built on the same core.",
    links: [
      { label: "cortex-edr", href: "https://github.com/hmza-hb/cortex-edr" },
      {
        label: "cortex-attack (npm)",
        href: "https://github.com/hmza-hb/cortex-attack",
      },
      { label: "cortex-cli (Go)", href: "https://github.com/hmza-hb/cortex-cli" },
    ],
  },
  {
    id: "histeeria",
    name: "Histeeria",
    description:
      "Async Go ingestion platform and Python/TypeScript SDKs to monitor and evaluate production agent decisions.",
    links: [
      { label: "platform", href: "https://github.com/hmza-hb/histeeria-web" },
      { label: "sdk", href: "https://github.com/hmza-hb/histeeria-sdk" },
      { label: "docs", href: "https://github.com/hmza-hb/histeeria-docs" },
    ],
  },
  {
    id: "web-acquisition",
    name: "Web acquisition infrastructure",
    description:
      "A restart-safe, SSRF-hardened crawler leased through PostgreSQL, and a distributed layer for multimodal parsing and provenance-aware processing.",
    links: [
      {
        label: "Hermes Crawler",
        href: "https://github.com/hmza-hb/crawler",
      },
      {
        label: "Lead Intelligence",
        href: "https://github.com/hmza-hb/lead-intelligence-platform",
      },
    ],
  },
  {
    id: "asteria",
    name: "Asteria",
    description:
      "E2EE social graph on distributed microservices, cross-platform, hybrid RSA-AES, benchmarked for 25,000+ req/s on a single instance.",
    links: [{ label: "repository", href: "https://github.com/hmza-hb/Asteria" }],
  },
  {
    id: "anya",
    name: "Anya",
    description:
      "Architecture for an autonomous companion robot. A NATS-based perception → cognition → expression loop that routes every moment through reflex, habitual, or LLM paths.",
    links: [{ label: "repository", href: "https://github.com/hmza-hb/Anya" }],
  },
  {
    id: "cortex-paper",
    name: "Project Cortex",
    description:
      "36-page research paper on prefrontal-cortex-inspired multi-agent AI architecture.",
    links: [
      { label: "Project-Cortex", href: "https://github.com/hmza-hb/Project-Cortex" },
      { label: "PDF", href: "/project-cortex.pdf" },
      { label: "research page", href: "/research#cortex-research" },
    ],
  },
];

export const ossContributions: OssContribution[] = [
  {
    id: "supabase-49181",
    label: "Supabase #49181",
    href: "https://github.com/supabase/supabase/pull/49181",
    summary:
      "Enabled design-system registry type-checking, added a layout error boundary.",
  },
  {
    id: "insforge-1214",
    label: "InsForge (YC P24) #1214",
    href: "https://github.com/InsForge/InsForge/pull/1214",
    summary: "Hardened auth, fixed an open redirect and an info leak.",
  },
  {
    id: "superset-4216",
    label: "Apache Superset #4216",
    href: "https://github.com/apache/superset/pull/4216",
    summary: "AES-256-GCM secret encryption, fixed a chat IDOR.",
  },
];
