import type { Checkbox } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import { Checkbox as UICheckbox } from "../ui/checkbox";

export type CheckboxProps = {
  field: Checkbox;
  form: UseFormReturn<Record<string, unknown>>;
};

export function Checkbox({ field, form }: CheckboxProps) {
  if (field._type !== "checkbox") {
    throw new Error("Checkbox field must be of type checkbox");
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name}>{field.label}</label>
      <UICheckbox
        id={field.name}
        required={field.required}
        {...form.register(field.name)}
      />
    </div>
  );
}
