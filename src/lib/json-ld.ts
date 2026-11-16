import {
  tastySoftware,
  tastySoftwareBody,
  tastySoftwareSeo,
} from "@/data/essays/tasty-software";
import {
  SITE_NAME,
  SITE_URL,
  defaultDescription,
  homeDescription,
  homeTitle,
  ogImagePath,
  person,
  personImagePath,
  sameAs,
  sitePages,
} from "@/data/site-seo";

const logoUrl = `${SITE_URL}/images/logo-hmza.png`;
const ogImageUrl = `${SITE_URL}${ogImagePath}`;
const personImageUrl = `${SITE_URL}${personImagePath}`;

function personNode() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    alternateName: [...person.alternateName],
    url: person.url,
    mainEntityOfPage: { "@id": `${person.url}#webpage` },
    image: {
      "@type": "ImageObject",
      url: personImageUrl,
      contentUrl: personImageUrl,
    },
    email: `mailto:${person.email}`,
    jobTitle: person.jobTitle,
    description: person.description,
    knowsAbout: [...person.knowsAbout],
    worksFor: { "@id": `${SITE_URL}/#organization` },
    affiliation: { "@id": `${SITE_URL}/#organization` },
    sameAs: [...sameAs],
  };
}

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [homeTitle, "HMZA Labs", person.name, "Hamza", "Hamza Hafeez"],
        description: homeDescription,
        inLanguage: "en",
        author: { "@id": `${SITE_URL}/#person` },
        about: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImageUrl,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: ["HMZA Labs", "Hamza Hafeez Lab"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        image: logoUrl,
        description: defaultDescription,
        founder: { "@id": `${SITE_URL}/#person` },
        employee: { "@id": `${SITE_URL}/#person` },
        sameAs: [...sameAs],
      },
      personNode(),
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#sitenavigation`,
        name: "HMZA site navigation",
        itemListElement: sitePages.map((page, index) => ({
          "@type": "SiteNavigationElement",
          position: index + 1,
          name: page.name,
          description: page.description,
          url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
        })),
      },
      ...sitePages.map((page) => {
        const pageUrl = page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`;
        return {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: page.headline,
          description: page.description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about:
            page.path === "/profile"
              ? { "@id": `${SITE_URL}/#person` }
              : { "@id": `${SITE_URL}/#organization` },
          author: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en",
          ...(page.path === "/"
            ? {
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: ogImageUrl,
                },
              }
            : page.path === "/profile"
              ? {
                  primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: personImageUrl,
                  },
                }
              : {}),
        };
      }),
    ],
  };
}

export function profilePageJsonLd() {
  const profileUrl = person.url;
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      {
        "@type": "ProfilePage",
        "@id": `${profileUrl}#profilepage`,
        url: profileUrl,
        name: `Hamza Hafeez profile`,
        description: person.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        about: { "@id": `${SITE_URL}/#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: personImageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${profileUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Lab",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Hamza Hafeez",
            item: profileUrl,
          },
        ],
      },
    ],
  };
}

export function pageJsonLd({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const pageUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  const breadcrumb =
    path === "/"
      ? undefined
      : {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Lab",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: title,
              item: pageUrl,
            },
          ],
        };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        author: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
      ...(breadcrumb ? [breadcrumb] : []),
    ],
  };
}

function essayPlainText(
  blocks: { type: string; text?: string; items?: string[] }[],
) {
  return blocks
    .map((block) => {
      if (block.text) return block.text;
      if (block.items) return block.items.join(" ");
      return "";
    })
    .join(" ");
}

export function tastySoftwareJsonLd() {
  const pageUrl = `${SITE_URL}${tastySoftware.path}`;
  const pdfUrl = `${SITE_URL}${tastySoftware.pdf}`;
  const body = essayPlainText(tastySoftwareBody);
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BlogPosting", "Article"],
        "@id": `${pageUrl}#article`,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        url: pageUrl,
        headline: tastySoftware.title,
        alternativeHeadline: tastySoftware.subtitle,
        description: tastySoftwareSeo.description,
        abstract: tastySoftwareSeo.description,
        articleSection: "Essay",
        inLanguage: "en",
        datePublished: tastySoftware.date,
        dateModified: tastySoftware.date,
        wordCount: words,
        keywords: [...tastySoftwareSeo.keywords].join(", "),
        about: tastySoftwareSeo.topics.map((name) => ({
          "@type": "Thing",
          name,
        })),
        mentions: tastySoftwareSeo.topics.map((name) => ({
          "@type": "Thing",
          name,
        })),
        author: { "@id": `${SITE_URL}/#person` },
        creator: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        image: ogImageUrl,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#essay-title", "#essay-subtitle", "#essay-abstract"],
        },
        encoding: {
          "@type": "MediaObject",
          encodingFormat: "application/pdf",
          url: pdfUrl,
          name: "Tasty Software PDF",
        },
        isAccessibleForFree: true,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: tastySoftwareSeo.title,
        description: tastySoftwareSeo.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#article` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImageUrl,
        },
        author: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
        relatedLink: [`${SITE_URL}/writing`, pdfUrl],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        mainEntity: tastySoftwareSeo.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Lab",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Writing",
            item: `${SITE_URL}/writing`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tastySoftware.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}