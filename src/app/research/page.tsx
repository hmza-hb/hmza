import { ResearchPage } from "@/components/research-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Research";
const description =
  "Research publications from HMZA Labs, including Project Cortex and multi-agent systems architecture.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/research",
  keywords: ["Project Cortex research", "multi-agent architecture"],
});

export default function Research() {
  return (
    <>
      <PageJsonLd path="/research" title={title} description={description} />
      <ResearchPage />
    </>
  );
}
