import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/seo";
import type { SITEMAP_QUERYResult } from "@/sanity/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch<SITEMAP_QUERYResult>(SITEMAP_QUERY);

  const sitemap: MetadataRoute.Sitemap = [];

  data.pages.forEach((page) => {
    const url =
      page.slug === "home" ? siteConfig.url : `${siteConfig.url}/${page.slug}`;
    sitemap.push({
      url,
      lastModified: new Date(page.lastModified),
      changeFrequency: "weekly",
      priority: page.priority
    });
  });

  data.events.forEach((event) => {
    sitemap.push({
      url: `${siteConfig.url}/events/${event.slug}`,
      lastModified: new Date(event.lastModified),
      changeFrequency: "monthly",
      priority: event.priority
    });
  });

  data.forms.forEach((form) => {
    sitemap.push({
      url: `${siteConfig.url}/forms/${form.slug}`,
      lastModified: new Date(form.lastModified),
      changeFrequency: "monthly",
      priority: form.priority
    });
  });

  return sitemap;
}
