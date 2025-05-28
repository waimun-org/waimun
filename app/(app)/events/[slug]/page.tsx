import { EVENT_BY_SLUG_QUERY, EVENTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Event } from "@/components/event";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import type { EVENT_BY_SLUG_QUERYResult } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await client.fetch<{ slug: string }[]>(EVENTS_SLUGS_QUERY);

  return events.map((event) => ({
    slug: event.slug
  }));
}

export default async function EventPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await client.fetch<EVENT_BY_SLUG_QUERYResult>(
    EVENT_BY_SLUG_QUERY,
    {
      slug
    }
  );

  if (!event) {
    return notFound();
  }

  return <Event event={event} />;
}
