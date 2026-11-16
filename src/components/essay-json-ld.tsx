import { tastySoftwareJsonLd } from "@/lib/json-ld";

export function EssayJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(tastySoftwareJsonLd()),
      }}
    />
  );
}
