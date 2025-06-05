import { defineType, defineField, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const teamType = defineType({
  name: "team",
  title: "Team",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [defineArrayMember({ type: "teamMember" })],
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: "title",
      memberCount: "members"
    },
    prepare(selection: { title?: string; memberCount?: unknown[] }) {
      const { title, memberCount } = selection;
      const count = Array.isArray(memberCount) ? memberCount.length : 0;

      return {
        title: title ?? "Team",
        subtitle: `${count} member${count !== 1 ? "s" : ""}`,
        media: UsersIcon
      };
    }
  }
});
