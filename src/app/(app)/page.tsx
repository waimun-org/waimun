import { PageBuilder } from "@/components/page-builder";
import { notFound } from "next/navigation";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import type { PAGE_QUERYResult } from "@/sanity/types";
import { sanityFetch } from "@/sanity/lib/live";

async function getPage(): Promise<PAGE_QUERYResult> {
  const result = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: "home" },
  });

  return result.data as PAGE_QUERYResult;
}

export default async function HomePage() {
  const page = await getPage();

  if (!page) {
    return notFound();
  }

  return <PageBuilder content={page.content} />;
}
