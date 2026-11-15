export type LabUpdate = {
  id: string;
  /** ISO date YYYY-MM-DD (sorted newest first). */
  date: string;
  title: string;
  summary: string;
  href?: string;
};

export type LabMilestone = {
  id: string;
  /** Display date or window, e.g. "March 2026" or "2026-03-15". */
  when: string;
  title: string;
  summary: string;
  href?: string;
  cta?: string;
};

/** Edit this list to publish lab news on the home page. */
export const labUpdates: LabUpdate[] = [
  {
    id: "cortex-case-study",
    date: "2026-11-12",
    title: "Published Project Cortex case study",
    summary:
      "An 18-page write-up on building the security engine and agent harness.",
    href: "/writing",
  },
  {
    id: "crawler-ship",
    date: "2026-11-05",
    title: "Hermes Crawler v2 hardening",
    summary:
      "Restart-safe queueing, robots.txt compliance, and SSRF sandboxing in the public repo.",
    href: "https://github.com/hmza-hb/crawler",
  },
  
];

/** Return false to hide the What's next / events block on the home page. */
export function showLabEventsSection(): boolean {
  return false;
}

/** Upcoming items (max two shown side by side when events are enabled). */
export const labMilestones: LabMilestone[] = [
  {
    id: "-",
    when: "-",
    title: "",
    summary:
      "",
    href: "/contact",
    cta: "contact for events",
  },
];

/** Items shown per page in Latest from the lab before "Read more". */
export const labNewsPageSize = 5;
