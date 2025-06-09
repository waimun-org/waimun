import { type FormBuilder } from "@/sanity/types";
import { z } from "zod";

export function getFormDefaultValues(formBuilder: FormBuilder) {
  const values = formBuilder.reduce(
    (acc, field) => {
      if (field._type === "separator" || field._type === "textBlock") {
        return acc;
      }

      acc[field.name] = field.defaultValue;
      switch (field._type) {
        case "input":
          acc[field.name] ??= "";
          break;
        case "textarea":
          acc[field.name] ??= "";
          break;
        case "select":
          acc[field.name] ??= "";
          break;
        case "checkbox":
          acc[field.name] ??= false;
          break;
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );

  values.hcaptchaToken = "";

  return values;
}

export function getFormSchema(formBuilder: FormBuilder) {
  const schema: Record<string, z.ZodTypeAny> = {};

  formBuilder.forEach((field) => {
    if (field._type === "separator" || field._type === "textBlock") {
      return;
    }

    let fieldSchema: z.ZodTypeAny;

    switch (field._type) {
      case "input":
        if (field.type === "email") {
          fieldSchema = z.string().email("Invalid email address");
        } else if (field.type === "number") {
          fieldSchema = z.coerce.number();
        } else {
          fieldSchema = z.string();

          if (field.minLength) {
            fieldSchema = (fieldSchema as z.ZodString).min(field.minLength);
          } else if (field.required) {
            fieldSchema = (fieldSchema as z.ZodString).min(1);
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
        } else if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(1);
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
        fieldSchema = z.coerce.boolean();

        if (field.required) {
          fieldSchema = fieldSchema.refine((value) => value === true, {
            message: "This field is required",
          });
        }

        break;

      default:
        return;
    }

    schema[field.name] = field.required ? fieldSchema : fieldSchema.optional();
  });

  schema.hcaptchaToken = z.string().min(1, "Please complete the captcha");

  return z.object(schema);
}
