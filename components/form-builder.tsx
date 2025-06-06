import { CheckboxField } from "./fields/checkbox";
import { InputField } from "./fields/input";
import { TextareaField } from "./fields/textarea";
import { SelectField } from "./fields/select";
import { SeparatorField } from "./fields/separator";
import { TextBlockField } from "./fields/text-block";
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
            return <InputField key={field._key} field={field} form={form} />;
          case "textarea":
            return <TextareaField key={field._key} field={field} form={form} />;
          case "select":
            return <SelectField key={field._key} field={field} form={form} />;
          case "checkbox":
            return <CheckboxField key={field._key} field={field} form={form} />;
          case "separator":
            return <SeparatorField key={field._key} />;
          case "textBlock":
            return <TextBlockField key={field._key} field={field} />;
          default:
            return null;
        }
      })}
    </>
  );
}
