import { HomeExperience } from "@/components/home-experience";
import { PageJsonLd } from "@/components/page-json-ld";
import { SITE_TAGLINE, defaultDescription } from "@/data/site-seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: SITE_TAGLINE,
  description: defaultDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <PageJsonLd
        path="/"
        title={SITE_TAGLINE}
        description={defaultDescription}
      />
      <HomeExperience />
    </>
  );
}
