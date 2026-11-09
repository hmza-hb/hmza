import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const siteUrl = "https://hmza.cc";

const title = "Engineering Beyond Boundaries";
const description =
  "An independent digital laboratory: publish ideas, research complex technologies, build software and hardware, run experiments, open-source releases, benchmarks, writings — and invite people to participate.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | HMZA",
  },
  description,
  applicationName: "HMZA",
  authors: [{ name: "HMZA", url: siteUrl }],
  creator: "HMZA",
  publisher: "HMZA",
  keywords: [
    "HMZA",
    "digital laboratory",
    "engineering",
    "research",
    "open source",
    "software",
    "hardware",
    "ventures",
    "labs",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "HMZA",
    title,
    description,
    images: [
      {
        url: "/images/hero-bg.jpeg",
        width: 1200,
        height: 630,
        alt: "HMZA Labs",
      },
      {
        url: "/images/logo-hmza.png",
        width: 6250,
        height: 6250,
        alt: "HMZA logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-bg.jpeg"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HMZA",
  url: siteUrl,
  logo: `${siteUrl}/images/logo-hmza.png`,
  description,
  sameAs: [
    "https://github.com/hmza-hb",
    "https://linkedin.com/in/hmza-hb",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
