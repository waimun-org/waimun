import type { Input } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import { Input as UIInput } from "../ui/input";
import { Label } from "../ui/label";

export type InputProps = {
  field: Input;
  form: UseFormReturn<Record<string, unknown>>;
};

export function Input({ field, form }: InputProps) {
  if (field._type !== "input") {
    throw new Error("Input field must be of type input");
  }

  const error = form.formState.errors[field.name];

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <UIInput
        id={field.name}
        required={field.required}
        placeholder={field.placeholder}
        type={field.type}
        {...form.register(field.name)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
