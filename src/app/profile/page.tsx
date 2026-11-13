import { ProfilePage } from "@/components/profile-page";
import { PageJsonLd } from "@/components/page-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Hamza Hafeez";
const description =
  "Profile of Hamza Hafeez, builder, engineer, and founder of the HMZA independent digital laboratory.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/profile",
  keywords: ["Hamza Hafeez profile", "hmza-hb"],
});

export default function Profile() {
  return (
    <>
      <PageJsonLd path="/profile" title={title} description={description} />
      <ProfilePage />
    </>
  );
}
