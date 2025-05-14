import type { EVENTS_QUERYResult, Events } from "@/sanity/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

async function getEvents(): Promise<EVENTS_QUERYResult> {
  const result = await sanityFetch({
    query: EVENTS_QUERY,
    tags: ["events"]
  });

  return result.data as EVENTS_QUERYResult;
}

export type EventsProps = {
  block: Events;
};

export async function Events({ block }: EventsProps) {
  const events = await getEvents();

  return (
    <section className="container flex flex-col gap-8 py-8">
      {block.title && (
        <h2 className="text-2xl font-bold md:text-4xl">{block.title}</h2>
      )}

      {block.description && (
        <div className="prose">
          <PortableText value={block.description} />
        </div>
      )}

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
                <CardDescription className="prose">
                  <PortableText value={event.description} />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  className="aspect-[4/3] rounded-lg object-cover"
                  src={urlFor(event.image).width(800).height(600).url()}
                  width={800}
                  height={600}
                  alt={event.image.alt ?? ""}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
