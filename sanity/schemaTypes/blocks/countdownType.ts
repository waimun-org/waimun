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
      name: "targetDateTime",
      title: "Target Date and Time",
      type: "datetime",
      description:
        "The exact instant to count down to. For WaiMUN event deadlines, enter the New Zealand local time and keep the timezone as Pacific/Auckland.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timeZone",
      title: "Timezone",
      type: "string",
      initialValue: "Pacific/Auckland",
      options: {
        list: [{ title: "New Zealand", value: "Pacific/Auckland" }],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
    }),
    defineField({
      name: "expiredText",
      title: "Expired Text",
      type: "string",
      description: "Shown once the countdown reaches zero.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      targetDateTime: "targetDateTime",
    },
    prepare(selection: { title?: string; targetDateTime?: string }) {
      return {
        title: selection.title ?? "Countdown",
        subtitle: selection.targetDateTime ?? "No target date set",
        media: CalendarIcon,
      };
    },
  },
});
