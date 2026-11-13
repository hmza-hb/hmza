import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hmza.cc",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://hmza.cc/writing",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://hmza.cc/profile",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
