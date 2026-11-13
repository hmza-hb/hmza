import { pageJsonLd } from "@/lib/json-ld";

type PageJsonLdProps = {
  path: string;
  title: string;
  description: string;
};

export function PageJsonLd({ path, title, description }: PageJsonLdProps) {
  const data = pageJsonLd({ path, title, description });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
