import type { Metadata } from "next";
import { WritingPage } from "@/components/writing-page";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Blogs, case studies, research articles, and publications from HMZA Labs — including Project Cortex.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing | HMZA",
    description:
      "Blogs, case studies, research articles, and publications from the lab.",
    url: "/writing",
  },
};

export default function Writing() {
  return <WritingPage />;
}
