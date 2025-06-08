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
      tags: ["page", "post", "event", "form"],
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

  data.forms.forEach((form) => {
    sitemap.push({
      url: `${siteConfig.url}/forms/${form.slug}`,
      lastModified: new Date(form.lastModified),
      changeFrequency: "monthly",
      priority: form.priority,
    });
  });

  data.posts.forEach((post) => {
    sitemap.push({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: "monthly",
      priority: post.priority,
    });
  });

  return sitemap;
}
