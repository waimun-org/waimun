import { defineArrayMember, defineType } from "sanity";

export const formBuilderType = defineType({
  name: "formBuilder",
  title: "Form Builder",
  type: "array",
  of: [
    defineArrayMember({ type: "input" }),
    defineArrayMember({ type: "textarea" }),
    defineArrayMember({ type: "select" }),
    defineArrayMember({ type: "checkbox" }),
    defineArrayMember({ type: "separator" }),
    defineArrayMember({ type: "textBlock" }),
  ],
});
