import type { Metadata } from "next";
import type { Seo, Slug } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export const siteConfig = {
  name: "Waimun",
  description:
    "Empowering students to become active global citizens through public speaking, leadership development, and debate.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://waimun.org",
  locale: "en-NZ"
};

function getImages(seo: Seo) {
  if (!seo.image) {
    return [];
  }

  return [
    {
      url: urlFor(seo.image).width(1200).height(630).format("jpg").url(),
      width: 1200,
      height: 630,
      alt: seo.image.alt
    }
  ];
}

export type GenerateNextMetadata = {
  slug: Slug;
  seo?: Seo;
};

export function generateNextMetadata({
  slug,
  seo
}: GenerateNextMetadata): Metadata {
  if (!seo) {
    return {
      title: siteConfig.name,
      description: siteConfig.description
    };
  }

  const canonical = `${siteConfig.url}${slug.current}`;

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    robots: seo.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: canonical
    },
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: getImages(seo)
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      site: siteConfig.name,
      creator: siteConfig.name,
      images: getImages(seo)
    }
  };

  return metadata;
}
