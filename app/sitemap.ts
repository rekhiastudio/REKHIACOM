import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rekhia.com";

  const routes = [
    "",           // Home
    "/contact",
    "/pricing",
    "/faq"
  ];

  const docs = ["/docs/privacy-policy", "/docs/terms-of-service", "/docs/about"];

  const locales = ["en", "he"];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of [...routes, ...docs]) {
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
