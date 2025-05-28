import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import type { PAGE_QUERYResult } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await client.fetch<{ slug: string }[]>(PAGES_SLUGS_QUERY);

  return pages.map((page) => ({
    slug: page.slug
  }));
}

export default async function Page({
  params
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug = "home" } = await params;
  const page = await client.fetch<PAGE_QUERYResult>(PAGE_QUERY, { slug });

  if (!page) {
    return notFound();
  }

  return <PageBuilder content={page.content} />;
}
