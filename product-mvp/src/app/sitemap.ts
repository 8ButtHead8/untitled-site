import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://product-mvp.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${siteUrl}/parents`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/adults`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/quiz/parents`, lastModified: new Date(), priority: 0.6 },
    { url: `${siteUrl}/quiz/adults`, lastModified: new Date(), priority: 0.6 },
  ];
}
