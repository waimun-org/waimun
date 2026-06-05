import type { APIRoute } from "astro";
import { sanityFetch } from "../lib/client";
import { siteConfig } from "../lib/seo";
import { SITEMAP_QUERY } from "../lib/queries";
import type { SITEMAP_QUERY_RESULT } from "../sanity/types";
import { tryCatch } from "../utils/try-catch";

export const GET: APIRoute = async () => {
  const result = await tryCatch(
    sanityFetch<SITEMAP_QUERY_RESULT>({ query: SITEMAP_QUERY }),
  );

  if (result.error) {
    console.error("Failed to fetch sitemap:", result.error);
    return new Response("Error generating sitemap", { status: 500 });
  }

  const data = result.data;
  const urls: string[] = [];

  data.pages.forEach((page) => {
    const url =
      page.slug === "home" ? siteConfig.url : `${siteConfig.url}/${page.slug}`;
    urls.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${new Date(page.lastModified).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  data.events.forEach((event) => {
    urls.push(`  <url>
    <loc>${siteConfig.url}/events/${event.slug}</loc>
    <lastmod>${new Date(event.lastModified).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${event.priority}</priority>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
};
