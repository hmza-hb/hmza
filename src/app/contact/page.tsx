import { ContactPage } from "@/components/contact-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Contact";
const description =
  "Contact HMZA Labs at hello@hmza.cc or via Instagram, X, and LinkedIn direct messages.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageJsonLd path="/contact" title={title} description={description} />
      <ContactPage />
    </>
  );
}
