import {
  cortexCaseStudy,
  cortexCaseStudyBody,
  cortexCaseStudySeo,
} from "@/data/essays/cortex-case-study";
import {
  tastySoftware,
  tastySoftwareBody,
  tastySoftwareSeo,
} from "@/data/essays/tasty-software";
import type { EssayBlock, EssayDoc, EssaySeo } from "@/data/essays/types";
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

function essayPlainText(blocks: EssayBlock[]) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "p":
        case "h2":
        case "h3":
        case "aside":
          return block.text;
        case "quote":
          return [block.text, block.attribution].filter(Boolean).join(" ");
        case "ul":
        case "ol":
          return block.items.join(" ");
        case "facts":
          return block.items
            .map((item) => `${item.label} ${item.value}`)
            .join(" ");
        case "table":
          return [
            block.headers.join(" "),
            ...block.rows.map((row) => row.join(" ")),
          ].join(" ");
        default:
          return "";
      }
    })
    .join(" ");
}

function writingPieceJsonLd({
  doc,
  seo,
  body,
  section,
  pdfName,
  relatedLink,
}: {
  doc: EssayDoc;
  seo: EssaySeo;
  body: EssayBlock[];
  section: string;
  pdfName: string;
  relatedLink?: string[];
}) {
  const pageUrl = `${SITE_URL}${doc.path}`;
  const pdfUrl = `${SITE_URL}${doc.pdf}`;
  const mdUrl = `${SITE_URL}${doc.md}`;
  const plain = essayPlainText(body);
  const words = plain.split(/\s+/).filter(Boolean).length;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BlogPosting", "Article", "TechArticle"],
        "@id": `${pageUrl}#article`,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        url: pageUrl,
        headline: doc.title,
        alternativeHeadline: doc.subtitle,
        description: seo.description,
        abstract: seo.description,
        articleSection: section,
        inLanguage: "en",
        datePublished: doc.date,
        dateModified: doc.date,
        wordCount: words,
        keywords: [...seo.keywords].join(", "),
        about: seo.topics.map((name) => ({
          "@type": "Thing",
          name,
        })),
        mentions: seo.topics.map((name) => ({
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
        encoding: [
          {
            "@type": "MediaObject",
            encodingFormat: "application/pdf",
            url: pdfUrl,
            name: pdfName,
          },
          {
            "@type": "MediaObject",
            encodingFormat: "text/markdown",
            url: mdUrl,
            name: `${doc.title} (Markdown)`,
          },
        ],
        isAccessibleForFree: true,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#article` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImageUrl,
        },
        author: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
        relatedLink: [
          `${SITE_URL}/writing`,
          pdfUrl,
          mdUrl,
          ...(relatedLink ?? []),
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        mainEntity: seo.faqs.map((faq) => ({
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
            name: doc.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function tastySoftwareJsonLd() {
  return writingPieceJsonLd({
    doc: tastySoftware,
    seo: tastySoftwareSeo,
    body: tastySoftwareBody,
    section: "Essay",
    pdfName: "Tasty Software PDF",
  });
}

export function cortexCaseStudyJsonLd() {
  return writingPieceJsonLd({
    doc: cortexCaseStudy,
    seo: cortexCaseStudySeo,
    body: cortexCaseStudyBody,
    section: "Case study",
    pdfName: "Cortex Case Study PDF",
    relatedLink: [
      `${SITE_URL}/research`,
      `${SITE_URL}/project-cortex.pdf`,
      `${SITE_URL}/open-source`,
    ],
  });
}