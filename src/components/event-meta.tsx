import type { Event } from "@/sanity/types";
import { format } from "date-fns";
import { CalendarIcon, CircleDollarSignIcon, MapPinIcon } from "lucide-react";

export type EventMetaProps = {
  event: Event;
};

export function EventMeta({ event }: EventMetaProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {event.date && (
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5" />
          <span className="text-sm whitespace-nowrap">
            {format(new Date(event.date), "MMM d, yyyy")}
          </span>
        </div>
      )}

      {event.venue && (
        <div className="flex items-center gap-2">
          <MapPinIcon className="size-5" />
          <span className="text-sm whitespace-nowrap">{event.venue}</span>
        </div>
      )}

      {typeof event.price === "number" && (
        <div className="flex items-center gap-2">
          <CircleDollarSignIcon className="size-5" />
          <span className="text-sm whitespace-nowrap">
            ${event.price.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
