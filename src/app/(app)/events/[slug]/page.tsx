import { EVENT_QUERY } from "@/sanity/lib/queries";
import { Event } from "@/components/event";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import type { EVENT_QUERYResult } from "@/sanity/types";

export default async function EventPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await client.fetch<EVENT_QUERYResult>(EVENT_QUERY, { slug });

  if (!event) {
    return notFound();
  }

  return <Event event={event} />;
}
