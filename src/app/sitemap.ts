import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hmza.cc",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
