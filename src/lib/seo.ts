import type { PageBuilder } from "@/sanity/types";

export const siteConfig = {
  name: "WaiMUN",
  description:
    "Empowering students to become active global citizens through public speaking, leadership development, and debate.",
  url: "https://waimun.org",
  locale: "en-NZ",
};

type PortableText = Array<{
  children?: Array<{ text?: string }>;
}>;

export function portableTextToPlainText(value?: PortableText) {
  return value
    ?.map(
      (block) =>
        block.children?.map((child) => child.text ?? "").join("") ?? "",
    )
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function getDescription(value?: string) {
  const description = value?.replace(/\s+/g, " ").trim();
  if (!description) return siteConfig.description;
  if (description.length <= 160) return description;

  const shortened = description.slice(0, 157);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 120 ? lastSpace : 157)}...`;
}

export function getPageTitle(content: PageBuilder, fallback: string) {
  for (const block of content) {
    if (block._type === "hero" && block.title) return block.title;
  }

  return fallback;
}

export function getPageDescription(content: PageBuilder) {
  for (const block of content) {
    const text =
      block._type === "hero" || block._type === "splitImage"
        ? portableTextToPlainText(block.text)
        : block._type === "prose"
          ? portableTextToPlainText(block.content)
          : undefined;

    if (text) return getDescription(text);
  }

  return siteConfig.description;
}

type SeoMeta = {
  pathname: string;
  title: string;
  description?: string;
  ogPath: string;
};

export function getSeoMeta({ pathname, title, description, ogPath }: SeoMeta) {
  const canonical = new URL(pathname, siteConfig.url).toString();
  const resolvedDescription = getDescription(description);
  const imageUrl = new URL(ogPath, siteConfig.url).toString();

  return {
    title,
    description: resolvedDescription,
    robots: "index, follow",
    canonical,
    openGraph: {
      type: "website" as const,
      title,
      description: resolvedDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteConfig.name}`,
        },
      ],
    },
  };
}
