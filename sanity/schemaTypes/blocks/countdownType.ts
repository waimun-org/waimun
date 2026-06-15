import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const countdownType = defineType({
  name: "countdown",
  title: "Countdown",
  type: "object",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
    },
    prepare(selection: { title?: string; date?: string }) {
      return {
        title: selection.title ?? "Countdown",
        subtitle: selection.date ?? "No date set",
        media: CalendarIcon,
      };
    },
  },
});
