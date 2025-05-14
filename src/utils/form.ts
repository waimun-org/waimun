import { type FormBuilder } from "@/sanity/types";
import { z, type ZodSchema } from "zod";

export function getFormDefaultValues(
  formBuilder: FormBuilder,
): Record<string, unknown> {
  return formBuilder.reduce(
    (acc, field) => {
      if (field.name && field.defaultValue) {
        acc[field.name] = field.defaultValue;
      }

      return acc;
    },
    {} as Record<string, unknown>,
  );
}

export function getFormSchema(formBuilder: FormBuilder): ZodSchema {
  const schema: Record<string, z.ZodTypeAny> = {};

  formBuilder.forEach((field) => {
    if (!field.name) return;

    let fieldSchema: z.ZodTypeAny;

    switch (field._type) {
      case "input":
        if (field.type === "email") {
          fieldSchema = z.string().email("Invalid email address");
        } else if (field.type === "number") {
          fieldSchema = z.number();
        } else {
          fieldSchema = z.string();
          if (field.minLength) {
            fieldSchema = (fieldSchema as z.ZodString).min(field.minLength);
          }
          if (field.maxLength) {
            fieldSchema = (fieldSchema as z.ZodString).max(field.maxLength);
          }
          if (field.pattern) {
            fieldSchema = (fieldSchema as z.ZodString).regex(
              new RegExp(field.pattern),
            );
          }
        }
        break;

      case "textarea":
        fieldSchema = z.string();
        if (field.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(field.minLength);
        }
        if (field.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(field.maxLength);
        }
        break;

      case "select":
        if (field.options?.length) {
          fieldSchema = z.enum(field.options as [string, ...string[]]);
        } else {
          fieldSchema = z.string();
        }
        break;

      case "checkbox":
        fieldSchema = z.boolean();
        break;

      default:
        fieldSchema = z.string();
    }

    schema[field.name] = field.required ? fieldSchema : fieldSchema.optional();
  });

  return z.object(schema);
}
