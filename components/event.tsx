import type { Event } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { EventMeta } from "./event-meta";
import { Button } from "./button";
import { Image } from "./image";

export type EventProps = {
  event: Event;
};

export function Event({ event }: EventProps) {
  return (
    <div>
      <section className="border-b">
        <div className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 flex flex-col gap-8 lg:col-span-2">
            <EventMeta event={event} />

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-balance md:text-4xl">
                {event.name}
              </h1>

              <div className="prose prose-lg text-balance">
                <PortableText value={event.description} />
              </div>
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
            alt={event.image.alt ?? ""}
            priority
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="col-span-1 aspect-[4/3] rounded-lg object-cover"
          />
        </div>
      </section>

      <section className="container py-8">
        <div className="prose">
          <PortableText value={event.details} />
        </div>
      </section>
    </div>
  );
}
