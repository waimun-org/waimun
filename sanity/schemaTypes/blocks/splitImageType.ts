import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const splitImageType = defineType({
  name: "splitImage",
  title: "Split Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: [
          { value: "imageLeft", title: "Image Left" },
          { value: "imageRight", title: "Image Right" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required()
        }
      ],
      options: {
        hotspot: true
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }]
    })
  ],
  preview: {
    select: {
      title: "title",
      orientation: "orientation"
    },
    prepare(selection: { title?: string; orientation?: string }) {
      const { title, orientation } = selection;
      const orientationLabel =
        orientation === "imageLeft" ? "Image Left" : "Image Right";

      return {
        title: title ?? "Split Image",
        subtitle: orientationLabel,
        media: ImageIcon
      };
    }
  }
});
