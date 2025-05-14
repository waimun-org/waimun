import type { Textarea } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import { Textarea as UITextarea } from "../ui/textarea";

export type TextareaProps = {
  field: Textarea;
  form: UseFormReturn<Record<string, unknown>>;
};

export function Textarea({ field, form }: TextareaProps) {
  if (field._type !== "textarea") {
    throw new Error("Textarea field must be of type textarea");
  }

  if (!field.name) {
    throw new Error("Textarea field must have a name");
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name}>{field.label}</label>
      <UITextarea
        id={field.name}
        required={field.required}
        {...form.register(field.name)}
      />
    </div>
  );
}
