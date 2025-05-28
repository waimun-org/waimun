import type { Checkbox } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import { Checkbox as UICheckbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

export type CheckboxFieldProps = {
  field: Checkbox;
  form: UseFormReturn<Record<string, unknown>>;
};

export function CheckboxField({
  field: { name, label, required, description },
  form
}: CheckboxFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2">
            <FormControl>
              <UICheckbox
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
            </FormControl>

            <div className="flex flex-col gap-1">
              <FormLabel>
                {label}
                {required && <span className="text-red-500">*</span>}
              </FormLabel>

              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
