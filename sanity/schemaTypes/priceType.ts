import { defineField, defineType } from "sanity";

export const priceType = defineType({
  name: "price",
  title: "Price",
  type: "object",
  fields: [
    defineField({
      name: "unitAmount",
      title: "Unit Amount",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
