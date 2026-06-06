import type { EVENTS_QUERY_RESULT, Events as EventsType } from "@/sanity/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PortableText } from "@portabletext/react";
import { Image } from "@/components/image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

export type EventsProps = {
  block: EventsType;
  events: EVENTS_QUERY_RESULT;
};

export function Events({ events }: EventsProps) {
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
          <a href={`/events/${event.slug?.current}`} key={event._id}>
            <Card>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                {event.description && (
                  <CardDescription className="prose max-w-none">
                    <PortableText value={event.description} />
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Image
                  image={event.image}
                  alt={event.image.alt}
                  className="aspect-4/3 rounded-lg object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  widths={[320, 640, 960]}
                />
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
