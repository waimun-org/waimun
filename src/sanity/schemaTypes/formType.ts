import { defineField, defineType } from "sanity";

export const formType = defineType({
  name: "form",
  title: "Form",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "airtable",
      title: "Airtable",
      type: "object",
      fields: [
        defineField({
          name: "baseId",
          title: "Base ID",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "tableId",
          title: "Table ID",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "formBuilder",
      validation: (rule) => rule.required(),
    }),
  ],
});
