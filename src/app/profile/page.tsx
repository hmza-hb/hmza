import { ProfilePage } from "@/components/profile-page";
import { ProfileJsonLd } from "@/components/profile-json-ld";
import { createPageMetadata } from "@/lib/metadata";

const title = "Hamza Hafeez";
const description =
  "Hamza Hafeez: software engineer, builder, and founder of HMZA Labs. Research, open-source security systems, distributed backends, and Project Cortex.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/profile",
  absoluteTitle: "Hamza Hafeez | Software engineer · HMZA Labs founder",
  profile: true,
  keywords: [
    "Hamza Hafeez profile",
    "Hamza Hafeez software engineer",
    "Hamza developer",
    "hmza-hb",
  ],
});

export default function Profile() {
  return (
    <>
      <ProfileJsonLd />
      <ProfilePage />
    </>
  );
}