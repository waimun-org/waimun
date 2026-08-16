import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

const getCurrentDate = () => new Date().toISOString().slice(0, 10);

export const galleryType = defineType({
  name: "gallery",
  title: "Gallery",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryImage",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              description: "Describe the image for people who cannot see it",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "date",
              title: "Date",
              description: "When this image was added",
              type: "date",
              initialValue: getCurrentDate,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "priority",
              title: "Priority",
              description: "Whether this image should be preloaded",
              type: "boolean",
              initialValue: false,
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      options: {
        layout: "grid",
      },
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare(selection) {
      const imageCount = selection.images?.length ?? 0;

      return {
        title: "Gallery",
        subtitle: `${imageCount} ${imageCount === 1 ? "image" : "images"}`,
        media: selection.images?.[0] ?? ImagesIcon,
      };
    },
  },
});
