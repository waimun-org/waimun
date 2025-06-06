import { defineField, defineType } from "sanity";
import {
  EditIcon,
  DocumentTextIcon,
  LinkIcon,
  SearchIcon,
  CogIcon,
  CreditCardIcon
} from "@sanity/icons";

export const formType = defineType({
  name: "form",
  title: "Form",
  type: "document",
  icon: EditIcon,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: DocumentTextIcon,
      default: true
    },
    {
      name: "fields",
      title: "Fields",
      icon: EditIcon
    },
    {
      name: "integrations",
      title: "Integrations",
      icon: CogIcon
    },
    {
      name: "settings",
      title: "Settings",
      icon: LinkIcon
    },
    {
      name: "seo",
      title: "SEO",
      icon: SearchIcon
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "content",
      title: "Fields",
      type: "formBuilder",
      group: "fields",
      validation: (rule) =>
        rule.required().min(1).error("Form needs at least one field")
    }),
    defineField({
      name: "airtable",
      title: "Airtable",
      type: "object",
      group: "integrations",
      fields: [
        defineField({
          name: "baseId",
          title: "Base ID",
          type: "string",
          validation: (rule) => rule.required()
        }),
        defineField({
          name: "tableId",
          title: "Table ID",
          type: "string",
          validation: (rule) => rule.required()
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "stripe",
      title: "Stripe",
      type: "object",
      group: "integrations",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: false,
          validation: (rule) => rule.required()
        }),
        defineField({
          name: "priceId",
          title: "Price ID",
          type: "string",
          hidden: ({ parent }: { parent?: { enabled?: boolean } }) =>
            !parent?.enabled
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "bankTransfer",
      title: "Bank Transfer",
      type: "object",
      group: "integrations",
      icon: CreditCardIcon,
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: false,
          validation: (rule) => rule.required()
        }),
        defineField({
          name: "accountName",
          title: "Account Name",
          type: "string",
          hidden: ({ parent }: { parent?: { enabled?: boolean } }) =>
            !parent?.enabled,
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { enabled?: boolean };
              return !parent?.enabled || value
                ? true
                : "Account name is required when bank transfer is enabled";
            })
        }),
        defineField({
          name: "accountNumber",
          title: "Account Number",
          type: "string",
          hidden: ({ parent }: { parent?: { enabled?: boolean } }) =>
            !parent?.enabled,
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { enabled?: boolean };
              return !parent?.enabled || value
                ? true
                : "Account number is required when bank transfer is enabled";
            })
        }),
        defineField({
          name: "instructions",
          title: "Additional Instructions",
          type: "text",
          rows: 3,
          hidden: ({ parent }: { parent?: { enabled?: boolean } }) =>
            !parent?.enabled
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96)
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: "title",
      fieldCount: "content"
    },
    prepare(selection: { title?: string; fieldCount?: unknown[] }) {
      const { title, fieldCount } = selection;
      const count = Array.isArray(fieldCount) ? fieldCount.length : 0;

      return {
        title: title ?? "Untitled Form",
        subtitle: `${count} field${count !== 1 ? "s" : ""}`,
        media: EditIcon
      };
    }
  },
  orderings: [
    {
      title: "Form Name A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }]
    },
    {
      title: "Last Updated",
      name: "updatedDesc",
      by: [{ field: "_updatedAt", direction: "desc" }]
    }
  ]
});
