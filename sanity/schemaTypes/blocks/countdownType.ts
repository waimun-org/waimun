import { defineField, defineType } from "sanity";
import { ClockIcon } from "@sanity/icons";

export const countdownType = defineType({
  name: "countdown",
  title: "Countdown",
  type: "object",
  icon: ClockIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "endDateTime",
      title: "End Date & Time",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      endDateTime: "endDateTime",
    },
    prepare(selection: { title?: string; endDateTime?: string }) {
      const { title, endDateTime } = selection;
      const dateLabel = endDateTime
        ? new Date(endDateTime).toLocaleDateString()
        : "No date set";

      return {
        title: title ?? "Countdown",
        subtitle: `Ends: ${dateLabel}`,
        media: ClockIcon,
      };
    },
  },
});
