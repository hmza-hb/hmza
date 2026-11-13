import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  defaultDescription,
  ogImagePath,
  person,
  sameAs,
  sitePages,
} from "@/data/site-seo";

const logoUrl = `${SITE_URL}/images/logo-hmza.png`;
const ogImageUrl = `${SITE_URL}${ogImagePath}`;

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [SITE_TAGLINE, "HMZA Labs", person.name],
        description: defaultDescription,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        description: defaultDescription,
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: [...sameAs],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: person.name,
        givenName: person.givenName,
        familyName: person.familyName,
        url: person.url,
        email: `mailto:${person.email}`,
        jobTitle: person.jobTitle,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        sameAs: [...sameAs],
      },
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
          about: { "@id": `${SITE_URL}/#organization` },
          author: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en",
          ...(page.path === "/"
            ? {
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: ogImageUrl,
                },
              }
            : {}),
        };
      }),
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
        about: { "@id": `${SITE_URL}/#organization` },
        author: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
      ...(breadcrumb ? [breadcrumb] : []),
    ],
  };
}
