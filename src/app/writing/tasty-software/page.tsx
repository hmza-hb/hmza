import { EssayJsonLd } from "@/components/essay-json-ld";
import { EssayPage } from "@/components/essay-page";
import { tastySoftware, tastySoftwareSeo } from "@/data/essays/tasty-software";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: tastySoftware.title,
  description: tastySoftwareSeo.description,
  path: tastySoftware.path,
  absoluteTitle: tastySoftwareSeo.title,
  keywords: [...tastySoftwareSeo.keywords],
  article: {
    publishedTime: `${tastySoftware.date}T12:00:00.000Z`,
    tags: [...tastySoftwareSeo.topics],
  },
  alternateTypes: {
    "application/pdf": [{ url: tastySoftware.pdf, title: "Tasty Software PDF" }],
    "text/markdown": [
      { url: "/tasty-software.md", title: "Tasty Software (Markdown)" },
    ],
    "text/plain": [{ url: "/llms.txt", title: "LLM-readable site summary" }],
  },
});

export default function TastySoftware() {
  return (
    <>
      <EssayJsonLd />
      <EssayPage />
    </>
  );
}
