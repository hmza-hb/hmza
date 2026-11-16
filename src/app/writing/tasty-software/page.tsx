import { EssayPage } from "@/components/essay-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { tastySoftware } from "@/data/essays/tasty-software";
import { createPageMetadata } from "@/lib/metadata";

const title = tastySoftware.title;
const description = tastySoftware.subtitle;

export const metadata = createPageMetadata({
  title,
  description,
  path: tastySoftware.path,
  keywords: ["Tasty Software", "Hamza Hafeez essay", "taste in software"],
});

export default function TastySoftware() {
  return (
    <>
      <PageJsonLd
        path={tastySoftware.path}
        title={title}
        description={description}
      />
      <EssayPage />
    </>
  );
}
