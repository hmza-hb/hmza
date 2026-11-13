import { JoinLabsPage } from "@/components/join-labs-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Join Labs";
const description =
  "Apply to participate in HMZA Labs: funding for brilliant minds, not traditional hiring. Share your story, work, and why you want to build with the lab.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/join-labs",
  keywords: ["join HMZA Labs", "lab funding", "genius minds"],
});

export default function JoinLabs() {
  return (
    <>
      <PageJsonLd path="/join-labs" title={title} description={description} />
      <JoinLabsPage />
    </>
  );
}
