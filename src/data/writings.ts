export type WritingKind = "blog" | "case-study" | "research" | "publication";

export const writingKindLabels: Record<WritingKind, string> = {
  blog: "Blog",
  "case-study": "Case study",
  research: "Research",
  publication: "Publication",
};

export const writingFilters: Array<WritingKind | "all"> = [
  "all",
  "blog",
  "case-study",
  "research",
  "publication",
];

export type WritingEntry = {
  id: string;
  kind: WritingKind;
  /** Short lab name (e.g. project name), shown above the headline when set */
  kicker?: string;
  title: string;
  summary?: string;
  /** ISO date (YYYY-MM-DD) or display label */
  date: string;
  href?: string;
  pdf?: string;
  featured?: boolean;
  status?: "published" | "draft";
};

export const CORTEX_CASE_STUDY_PDF = "/assets/Project Cortex case-study.pdf";

export const writings: WritingEntry[] = [
  {
    id: "project-cortex",
    kind: "case-study",
    kicker: "Project Cortex",
    title:
      "What a brain-inspired security engine taught me about evidence, software reliability, and knowing when to stop.",
    date: "2025-11-12",
    pdf: CORTEX_CASE_STUDY_PDF,
    featured: true,
    status: "published",
  },
];
