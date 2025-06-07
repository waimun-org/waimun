import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const postsType = defineType({
  name: "posts",
  title: "Posts",
  type: "object",
  icon: DocumentTextIcon,
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
        title: title ?? "Posts",
        media: DocumentTextIcon,
      };
    },
  },
});
