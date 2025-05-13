import { PAGE_QUERY } from "@/sanity/lib/queries";
import { PageBuilder } from "@/components/page-builder";
import { notFound } from "next/navigation";
import type { PAGE_QUERYResult } from "@/sanity/types";
import { sanityFetch } from "@/sanity/lib/live";

async function getPage(slug: string): Promise<PAGE_QUERYResult> {
  const result = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    tags: ["page", slug],
  });

  return result.data as PAGE_QUERYResult;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return notFound();
  }

  return <PageBuilder content={page?.content} />;
}
