import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  SITE_NAME,
  SITE_URL,
  defaultKeywords,
  homeTitle,
  homeDescription,
  ogImagePath,
  person,
} from "@/data/site-seo";
import { CrawlNav } from "@/components/crawl-nav";
import { SeoRelations } from "@/components/seo-relations";
import { siteGraphJsonLd } from "@/lib/json-ld";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const ogImage = {
  url: ogImagePath,
  width: 1200,
  height: 630,
  alt: "Hamza Hafeez · HMZA Labs",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: homeDescription,
  applicationName: SITE_NAME,
  authors: [{ name: person.name, url: person.url }],
  creator: person.name,
  publisher: SITE_NAME,
  keywords: [...defaultKeywords],
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
  alternates: {
    canonical: SITE_URL,
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLM-readable site summary" }],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: homeTitle,
    description: homeDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [ogImagePath],
    creator: "@hmza_hb",
    site: "@hmza_hb",
  },
  icons: {
    icon: [
      {
        url: "/images/logo-hmza.png",
        type: "image/png",
        sizes: "6250x6250",
      },
    ],
    shortcut: ["/images/logo-hmza.png"],
    apple: [
      {
        url: "/images/logo-hmza.png",
        type: "image/png",
        sizes: "6250x6250",
      },
    ],
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <SeoRelations />
      </head>
      <body className="min-h-full bg-white font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraphJsonLd()),
          }}
        />
        <CrawlNav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
