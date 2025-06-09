import { EVENT_BY_SLUG_QUERY, EVENTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Event } from "@/components/event";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import type {
  EVENT_BY_SLUG_QUERYResult,
  EVENTS_SLUGS_QUERYResult,
} from "@/sanity/types";
import { generateNextMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { tryCatch } from "@/utils/try-catch";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

async function getEventBySlug(slug: string) {
  const result = await tryCatch(
    sanityFetch<EVENT_BY_SLUG_QUERYResult>({
      query: EVENT_BY_SLUG_QUERY,
      params: { slug },
      tags: [`event:${slug}`],
    }),
  );

  if (result.error) {
    console.error("Failed to fetch event:", result.error);
    return null;
  }

  return result.data;
}

async function getEventSlugs() {
  const result = await tryCatch(
    sanityFetch<EVENTS_SLUGS_QUERYResult>({
      query: EVENTS_SLUGS_QUERY,
      tags: ["event"],
    }),
  );

  if (result.error) {
    console.error("Error fetching event slugs:", result.error);
    return [];
  }

  return result.data.map((event) => event.slug);
}

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return generateNextMetadata(event);
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return notFound();
  }

  return <Event event={event} />;
}
