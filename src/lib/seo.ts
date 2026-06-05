import type { Seo, Slug } from "@/sanity/types";
import { urlFor } from "@/lib/image";
import { env } from "@/lib/env";

export const siteConfig = {
  name: "WaiMUN",
  description:
    "Empowering students to become active global citizens through public speaking, leadership development, and debate.",
  url: env.PUBLIC_SITE_URL ?? "https://waimun.org",
  locale: "en-NZ",
};

export function getOgImages(seo: Seo) {
  if (!seo.image) {
    return [];
  }

  return [
    {
      url: urlFor(seo.image).width(1200).height(630).format("jpg").url(),
      width: 1200,
      height: 630,
      alt: seo.image.alt,
    },
  ];
}

export type SeoMeta = {
  slug: Slug;
  seo?: Seo;
};

export function getSeoMeta({ slug, seo }: SeoMeta) {
  if (!seo) {
    return {
      title: siteConfig.name,
      description: siteConfig.description,
    };
  }

  const canonical = `${siteConfig.url}${slug.current}`;

  return {
    title: seo.title,
    description: seo.description,
    robots: seo.noIndex ? "noindex, nofollow" : "index, follow",
    canonical,
    openGraph: {
      type: "website" as const,
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: getOgImages(seo),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: seo.title,
      description: seo.description,
      site: siteConfig.name,
      creator: siteConfig.name,
      images: getOgImages(seo),
    },
  };
}
