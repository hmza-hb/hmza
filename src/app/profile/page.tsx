import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile-page";

export const metadata: Metadata = {
  title: "Hamza Hafeez",
  description:
    "Profile of Hamza Hafeez — builder, engineer, and home lab at hmza.cc.",
  alternates: {
    canonical: "/profile",
  },
};

export default function Profile() {
  return <ProfilePage />;
}
