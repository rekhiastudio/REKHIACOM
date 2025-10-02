import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rekhia.com";

  const routes = [
    "",           // Home
    "/contact",
    "/pricing",
    "/faq"
  ];

  const locales = ["en", "he"];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8
      });
    }
  }

  return urls;
}
