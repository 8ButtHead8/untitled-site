import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://moy-proforientolog.ru";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts().catch(() => []);

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${siteUrl}/parents`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/adults`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), priority: 0.7 },
    ...blogEntries,
    { url: `${siteUrl}/quiz/parents`, lastModified: new Date(), priority: 0.6 },
    { url: `${siteUrl}/quiz/adults`, lastModified: new Date(), priority: 0.6 },
  ];
}
