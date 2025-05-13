import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { Events } from "@/components/events";
import { sanityFetch } from "@/sanity/lib/live";
import type { EVENTS_QUERYResult } from "@/sanity/types";

async function getEvents(): Promise<EVENTS_QUERYResult> {
  const result = await sanityFetch({
    query: EVENTS_QUERY,
    tags: ["events"],
  });

  return result.data as EVENTS_QUERYResult;
}

export default async function EventsPage() {
  const events = await getEvents();

  return <Events events={events} />;
}
