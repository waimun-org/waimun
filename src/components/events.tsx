import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/sanity/types";

export type EventsProps = {
  events: Event[];
};

export function Events({ events }: EventsProps) {
  return (
    <section className="container flex flex-col gap-8 py-8">
      <h2 className="text-2xl font-bold md:text-4xl">Events</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link href={`/events/${event.slug?.current}`} key={event._id}>
            <Card>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription className="prose">
                  {event.description && (
                    <PortableText value={event.description} />
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {event.image && (
                  <Image
                    className="aspect-[4/3] rounded-lg object-cover"
                    src={urlFor(event.image).width(800).height(600).url()}
                    width={800}
                    height={600}
                    alt={event.image.alt ?? ""}
                  />
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
