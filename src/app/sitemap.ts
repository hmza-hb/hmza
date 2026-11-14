import type { MetadataRoute } from "next";
import { sitePages } from "@/data/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  return sitePages.map((page) => ({
    url: page.path === "/" ? "https://hmza.cc" : `https://hmza.cc${page.path}`,
    lastModified: updated,
    changeFrequency: page.path === "/" || page.path === "/open-source" ? "weekly" : page.path === "/profile" || page.path === "/contact" ? "monthly" : "weekly",
    priority:
      page.path === "/"
        ? 1
        : page.path === "/profile"
          ? 0.95
          : 0.9,
  }));
}
