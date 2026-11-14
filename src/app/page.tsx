import { HomeExperience } from "@/components/home-experience";
import { PageJsonLd } from "@/components/page-json-ld";
import { homeDescription, homeTitle } from "@/data/site-seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: homeTitle,
  keywords: ["Hamza Hafeez official site", "Hamza official website"],
});

export default function Home() {
  return (
    <>
      <PageJsonLd path="/" title={homeTitle} description={homeDescription} />
      <HomeExperience />
    </>
  );
}