import { OpenSourcePage } from "@/components/open-source-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Open source";
const description =
  "Selected lab work and upstream contributions: Cortex, crawlers, SDKs, and security tooling by Hamza Hafeez.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/open-source",
  keywords: ["cortex-edr", "hmza-hb github", "open source security"],
});

export default function OpenSource() {
  return (
    <>
      <PageJsonLd path="/open-source" title={title} description={description} />
      <OpenSourcePage />
    </>
  );
}
