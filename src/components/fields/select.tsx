import type { Select } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import { Select as UISelect } from "../ui/select";

export type SelectProps = {
  field: Select;
  form: UseFormReturn<Record<string, unknown>>;
};

export function Select({ field, form }: SelectProps) {
  if (field._type !== "select") {
    throw new Error("Select field must be of type select");
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name}>{field.label}</label>
      <UISelect required={field.required} {...form.register(field.name)}>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </UISelect>
    </div>
  );
}
