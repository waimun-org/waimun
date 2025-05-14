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
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
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
        }),
        defineField({
          name: "tableId",
          title: "Table ID",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "formBuilder",
    }),
  ],
});
