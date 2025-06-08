import type { EVENTS_QUERYResult, Events } from "@/sanity/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PortableText } from "next-sanity";
import { Image } from "@/components/image";
import Link from "next/link";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/client";
import { tryCatch } from "@/utils/try-catch";

async function getEvents(): Promise<EVENTS_QUERYResult> {
  const result = await tryCatch(
    sanityFetch<EVENTS_QUERYResult>({
      query: EVENTS_QUERY,
      tags: ["events"],
    }),
  );

  if (result.error) {
    console.error("Failed to fetch events:", result.error);
    return [];
  }

  return result.data;
}

export type EventsProps = {
  block: Events;
};

export async function Events(_: EventsProps) {
  const events = await getEvents();

  return (
    <section className="container flex flex-col gap-8 py-8">
      {events.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />

          <AlertTitle>No events found</AlertTitle>
          <AlertDescription>
            There are no events published at the moment.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link href={`/events/${event.slug?.current}`} key={event._id}>
            <Card>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                {event.description && (
                  <CardDescription className="prose">
                    <PortableText value={event.description} />
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Image
                  image={event.image}
                  alt={event.image.alt}
                  className="aspect-[4/3] rounded-lg object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
