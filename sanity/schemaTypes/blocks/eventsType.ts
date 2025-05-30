import { defineField, defineType } from "sanity";

export const eventsType = defineType({
  name: "events",
  title: "Events",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    })
  ]
});
