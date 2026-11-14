import { sameAs } from "@/data/site-seo";

/** Identity links for crawlers (rel=me). */
export function SeoRelations() {
  return (
    <>
      {sameAs.map((href) => (
        <link key={href} rel="me" href={href} />
      ))}
    </>
  );
}