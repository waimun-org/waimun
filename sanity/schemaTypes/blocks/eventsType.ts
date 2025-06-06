import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const eventsType = defineType({
  name: "events",
  title: "Events",
  type: "object",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection: { title?: string }) {
      const { title } = selection;

      return {
        title: title ?? "Events",
        media: CalendarIcon,
      };
    },
  },
});
