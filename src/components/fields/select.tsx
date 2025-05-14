import type { Select } from "@/sanity/types";
import { type UseFormReturn } from "react-hook-form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from "../ui/select";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormField } from "../ui/form";

export type SelectFieldProps = {
  field: Select;
  form: UseFormReturn<Record<string, unknown>>;
};

export function SelectField({
  field: { name, label, placeholder, options, required, description },
  form,
}: SelectFieldProps) {
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
            <UISelect
              onValueChange={field.onChange}
              value={field.value as string}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </UISelect>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
