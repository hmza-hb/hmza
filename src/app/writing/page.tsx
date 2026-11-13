import { WritingPage } from "@/components/writing-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Writing";
const description =
  "Blogs, case studies, research articles, and publications from HMZA Labs, including Project Cortex.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/writing",
  keywords: ["Project Cortex case study", "technical writing"],
});

export default function Writing() {
  return (
    <>
      <PageJsonLd path="/writing" title={title} description={description} />
      <WritingPage />
    </>
  );
}
