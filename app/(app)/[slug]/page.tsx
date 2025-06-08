import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import type { PAGE_QUERYResult } from "@/sanity/types";
import { generateNextMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { tryCatch } from "@/utils/try-catch";

interface PageProps {
  params: Promise<{ slug?: string }>;
}

async function getPageBySlug(slug: string) {
  const result = await tryCatch(
    sanityFetch<PAGE_QUERYResult>({
      query: PAGE_QUERY,
      params: { slug },
      tags: ["page", `page-${slug}`],
    }),
  );

  if (result.error) {
    console.error("Error fetching page:", result.error);
    return null;
  }

  return result.data;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug = "home" } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return generateNextMetadata(page);
}

export default async function Page({ params }: PageProps) {
  const { slug = "home" } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  return <PageBuilder content={page.content} />;
}
