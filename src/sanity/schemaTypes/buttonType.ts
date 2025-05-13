import { defineField, defineType } from "sanity";

export const buttonType = defineType({
  name: "button",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "link",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Secondary", value: "secondary" },
          { title: "Destructive", value: "destructive" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
        ],
      },
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Small", value: "sm" },
          { title: "Large", value: "lg" },
        ],
      },
    }),
  ],
});
