import { defineArrayMember, defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
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
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [defineArrayMember({ type: "social" })],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
    prepare(selection: { title?: string; subtitle?: string }) {
      const { title, subtitle } = selection;

      return {
        title: title ?? "Team Member",
        subtitle: subtitle ?? "No role specified",
        media: UsersIcon,
      };
    },
  },
});
