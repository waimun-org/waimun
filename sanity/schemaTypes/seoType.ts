import { defineField, defineType } from "sanity";
import { SearchIcon } from "@sanity/icons";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines",
      description: "Prevent search engines from indexing this page",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      noIndex: "noIndex",
    },
    prepare({
      title,
      description,
      noIndex,
    }: {
      title?: string;
      description?: string;
      noIndex?: boolean;
    }) {
      return {
        title: title ?? "No title set",
        subtitle: noIndex
          ? "Hidden from search engines"
          : (description ?? "No description set"),
        media: SearchIcon,
      };
    },
  },
});
