export type EssayBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[]; start?: number }
  | { type: "aside"; text: string }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type EssayFaq = {
  question: string;
  answer: string;
};

export type EssaySeo = {
  title: string;
  description: string;
  keywords: readonly string[];
  topics: readonly string[];
  faqs: readonly EssayFaq[];
};

export type EssayDoc = {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  byline: string;
  date: string;
  pdf: string;
  md: string;
};
