import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import type { PAGE_QUERYResult } from "@/sanity/types";

export const revalidate = 60;

export default async function HomePage() {
  const page = await client.fetch<PAGE_QUERYResult>(
    PAGE_QUERY,
    {
      slug: "home"
    },
    {
      cache: "force-cache",
      next: { revalidate: 60 }
    }
  );

  if (!page) {
    return notFound();
  }

  return <PageBuilder content={page.content} />;
}
