import { EVENT_QUERY } from "@/sanity/lib/queries";
import { Event } from "@/components/event";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import type { EVENT_QUERYResult } from "@/sanity/types";

async function getEvent(slug: string): Promise<EVENT_QUERYResult> {
  const result = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug },
    tags: ["event", slug]
  });

  return result.data as EVENT_QUERYResult;
}

export default async function EventPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return notFound();
  }

  return <Event event={event} />;
}
