import { EssayJsonLd } from "@/components/essay-json-ld";
import { EssayPage } from "@/components/essay-page";
import {
  cortexCaseStudy,
  cortexCaseStudyBody,
  cortexCaseStudySeo,
} from "@/data/essays/cortex-case-study";
import { cortexCaseStudyJsonLd } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: cortexCaseStudy.title,
  description: cortexCaseStudySeo.description,
  path: cortexCaseStudy.path,
  absoluteTitle: cortexCaseStudySeo.title,
  keywords: [...cortexCaseStudySeo.keywords],
  article: {
    publishedTime: `${cortexCaseStudy.date}T12:00:00.000Z`,
    tags: [...cortexCaseStudySeo.topics],
  },
  alternateTypes: {
    "application/pdf": [
      { url: cortexCaseStudy.pdf, title: "Cortex Case Study PDF" },
    ],
    "text/markdown": [
      { url: cortexCaseStudy.md, title: "Cortex Case Study (Markdown)" },
    ],
    "text/plain": [{ url: "/llms.txt", title: "LLM-readable site summary" }],
  },
});

export default function CortexCaseStudy() {
  return (
    <>
      <EssayJsonLd graph={cortexCaseStudyJsonLd()} />
      <EssayPage
        doc={cortexCaseStudy}
        seo={cortexCaseStudySeo}
        body={cortexCaseStudyBody}
        kickerLine="Case study · Project Cortex · Cortex EDR"
        faqHeading="Questions this case study answers"
        pdfLabel="cortex-case-study.pdf"
      />
    </>
  );
}
