import type { Event as EventType } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { Button } from "./button";
import { Image } from "./image";
import { CalendarIcon, CircleDollarSignIcon, MapPinIcon } from "lucide-react";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";

export type EventProps = {
  event: EventType;
};

export function EventComponent({ event }: EventProps) {
  return (
    <>
      <EventHero event={event} />
      <section className="container py-8">
        <article className="prose">
          {event.details ? (
            <PortableText value={event.details} />
          ) : (
            <p>No details available</p>
          )}
        </article>
      </section>
    </>
  );
}

function EventHero({ event }: EventProps) {
  return (
    <section className="border-b">
      <div className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col gap-8 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <EventMeta event={event} />

            <h1 className="text-2xl font-bold text-balance md:text-4xl">
              {event.name}
            </h1>

            {event.description && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={event.description} />
              </div>
            )}
          </div>

          {event.buttons && (
            <div className="mt-auto flex flex-wrap gap-4">
              {event.buttons.map((button) => (
                <Button key={button._key} button={button} />
              ))}
            </div>
          )}
        </div>

        <Image
          image={event.image}
          alt={event.image.alt}
          priority
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="col-span-1 aspect-4/3 rounded-lg object-cover"
        />
      </div>
    </section>
  );
}

function EventMeta({ event }: EventProps) {
  return (
    <div className="flex flex-col flex-wrap gap-4 md:flex-row">
      <EventDate event={event} />

      {event.venue && (
        <div className="flex items-center gap-2">
          <MapPinIcon className="size-5" />
          <span className="text-sm whitespace-nowrap">{event.venue}</span>
        </div>
      )}

      {event.price && (
        <div className="flex items-center gap-2">
          <CircleDollarSignIcon className="size-5" />
          <span className="text-sm whitespace-nowrap">
            {formatPrice(event.price)}
          </span>
        </div>
      )}
    </div>
  );
}

function EventDate({ event }: EventProps) {
  if (!event.startDate) {
    return null;
  }

  if (!event.endDate || event.startDate === event.endDate) {
    return (
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-5" />
        <span className="text-sm whitespace-nowrap">
          {formatDate(event.startDate)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <CalendarIcon className="size-5" />
      <span className="text-sm whitespace-nowrap">
        {formatDate(event.startDate)} - {formatDate(event.endDate)}
      </span>
    </div>
  );
}
