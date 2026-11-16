import type { MetadataRoute } from "next";
import { tastySoftware } from "@/data/essays/tasty-software";
import { sitePages } from "@/data/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  const pages = sitePages.map((page) => ({
    url: page.path === "/" ? "https://hmza.cc" : `https://hmza.cc${page.path}`,
    lastModified: updated,
    changeFrequency:
      page.path === "/" || page.path === "/open-source"
        ? ("weekly" as const)
        : page.path === "/profile" || page.path === "/contact"
          ? ("monthly" as const)
          : ("weekly" as const),
    priority:
      page.path === "/" ? 1 : page.path === "/profile" ? 0.95 : 0.9,
  }));

  pages.push({
    url: `https://hmza.cc${tastySoftware.path}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.85,
  });

  return pages;
}
