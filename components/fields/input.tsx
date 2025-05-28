import type { Input } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import { Input as UIInput } from "../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

export type InputFieldProps = {
  field: Input;
  form: UseFormReturn<Record<string, unknown>>;
};

export function InputField({
  field: { name, label, placeholder, required, description },
  form
}: InputFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <UIInput
              {...field}
              value={field.value as string}
              placeholder={placeholder}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
