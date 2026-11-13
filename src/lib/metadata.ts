import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  defaultDescription,
  defaultKeywords,
  ogImagePath,
} from "@/data/site-seo";

const ogImage = {
  url: ogImagePath,
  width: 1200,
  height: 630,
  alt: "HMZA Labs",
};

export function createPageMetadata({
  title,
  description = defaultDescription,
  path,
  keywords = [],
}: {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? `${title} | ${SITE_NAME}` : `${title} | ${SITE_NAME}`;

  return {
    title:
      path === "/"
        ? { absolute: fullTitle }
        : title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImagePath],
      creator: "@hmza_hb",
      site: "@hmza_hb",
    },
  };
}
