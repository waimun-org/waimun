import { Checkbox } from "./fields/checkbox";
import { Input } from "./fields/input";
import { Textarea } from "./fields/textarea";
import { Select } from "./fields/select";
import type { FormBuilder as FormBuilderType } from "@/sanity/types";
import type { UseFormReturn } from "react-hook-form";

export type FormBuilderProps = {
  content: FormBuilderType;
  form: UseFormReturn<Record<string, unknown>>;
};

export function FormBuilder({ content, form }: FormBuilderProps) {
  return (
    <>
      {content.map((field) => {
        switch (field._type) {
          case "input":
            return <Input key={field._key} field={field} form={form} />;
          case "textarea":
            return <Textarea key={field._key} field={field} form={form} />;
          case "select":
            return <Select key={field._key} field={field} form={form} />;
          case "checkbox":
            return <Checkbox key={field._key} field={field} form={form} />;
          default:
            return null;
        }
      })}
    </>
  );
}
