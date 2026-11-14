import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  defaultDescription,
  defaultKeywords,
  ogImagePath,
  person,
  personImagePath,
} from "@/data/site-seo";

const defaultOgImage = {
  url: ogImagePath,
  width: 1200,
  height: 630,
  alt: "Hamza Hafeez · HMZA Labs",
};

const profileOgImage = {
  url: personImagePath,
  width: 1097,
  height: 1026,
  alt: "Hamza Hafeez",
};

const sharedAuthors: Metadata["authors"] = [
  { name: person.name, url: person.url },
];

export function createPageMetadata({
  title,
  description = defaultDescription,
  path,
  keywords = [],
  absoluteTitle,
  profile = false,
}: {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  /** Overrides title template (use for home and profile name ranking). */
  absoluteTitle?: string;
  /** Open Graph profile card and person image. */
  profile?: boolean;
}): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: sharedAuthors,
    creator: person.name,
    publisher: SITE_NAME,
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
      type: profile ? "profile" : "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: profile ? [profileOgImage, defaultOgImage] : [defaultOgImage],
      ...(profile
        ? {
            firstName: person.givenName,
            lastName: person.familyName,
            username: "hmza-hb",
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: profile ? [personImagePath] : [ogImagePath],
      creator: "@hmza_hb",
      site: "@hmza_hb",
    },
  };
}