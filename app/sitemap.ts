import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { siteConfig } from "@/lib/seo";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import type { SITEMAP_QUERYResult } from "@/sanity/types";
import { tryCatch } from "@/utils/try-catch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await tryCatch(
    sanityFetch<SITEMAP_QUERYResult>({
      query: SITEMAP_QUERY,
      tags: ["page", "event"],
    }),
  );

  if (result.error) {
    console.error("Failed to fetch sitemap:", result.error);
    return [];
  }

  const data = result.data;
  const sitemap: MetadataRoute.Sitemap = [];

  data.pages.forEach((page) => {
    const url =
      page.slug === "home" ? siteConfig.url : `${siteConfig.url}/${page.slug}`;
    sitemap.push({
      url,
      lastModified: new Date(page.lastModified),
      changeFrequency: "weekly",
      priority: page.priority,
    });
  });

  data.events.forEach((event) => {
    sitemap.push({
      url: `${siteConfig.url}/events/${event.slug}`,
      lastModified: new Date(event.lastModified),
      changeFrequency: "monthly",
      priority: event.priority,
    });
  });

  return sitemap;
}
