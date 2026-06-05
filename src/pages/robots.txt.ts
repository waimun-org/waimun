import type { APIRoute } from "astro";
import { siteConfig } from "../lib/seo";

export const GET: APIRoute = () => {
  const content = `User-Agent: *
Allow: /
Disallow: /studio/*

Host: ${siteConfig.url}
Sitemap: ${siteConfig.url}/sitemap.xml`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
};
