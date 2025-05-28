import type { Textarea } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import { Textarea as UITextarea } from "../ui/textarea";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormDescription
} from "../ui/form";

export type TextareaFieldProps = {
  field: Textarea;
  form: UseFormReturn<Record<string, unknown>>;
};

export function TextareaField({
  field: { name, label, placeholder, required, description },
  form
}: TextareaFieldProps) {
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
            <UITextarea
              {...field}
              value={field.value as string}
              placeholder={placeholder}
              className="min-h-[160px]"
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
