import { profilePageJsonLd } from "@/lib/json-ld";

export function ProfileJsonLd() {
  const data = profilePageJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}