import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
  name: "pageBuilder",
  title: "Page Builder",
  type: "array",
  of: [
    defineArrayMember({ type: "hero" }),
    defineArrayMember({ type: "splitImage" }),
    defineArrayMember({ type: "prose" }),
    defineArrayMember({ type: "events" }),
    defineArrayMember({ type: "team" }),
  ],
});
