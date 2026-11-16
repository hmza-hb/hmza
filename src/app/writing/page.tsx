import { WritingPage } from "@/components/writing-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Writing";
const description =
  "Writing from Hamza Hafeez and HMZA Labs: Tasty Software on taste in coding, the future of software engineers, and the Project Cortex case study.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/writing",
  keywords: [
    "Tasty Software",
    "taste in software",
    "taste in coding",
    "Project Cortex case study",
    "technical writing",
  ],
});

export default function Writing() {
  return (
    <>
      <PageJsonLd path="/writing" title={title} description={description} />
      <WritingPage />
    </>
  );
}
