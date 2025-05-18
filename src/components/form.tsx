"use client";

import type {
  Form as FormType,
  FormBuilder as FormBuilderType
} from "@/sanity/types";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormDefaultValues, getFormSchema } from "@/utils/form";
import { FormBuilder } from "./form-builder";
import { PortableText } from "next-sanity";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { Form as UIForm } from "./ui/form";
import { submitForm } from "@/app/(app)/forms/actions";

export type FormProps = {
  form: FormType & {
    content: FormBuilderType;
  };
};

export function Form({
  form: { title, description, slug, content }
}: FormProps) {
  const defaultValues = getFormDefaultValues(content);
  const resolver = zodResolver(getFormSchema(content));
  const form = useForm({ defaultValues, resolver });

  async function handleSubmit(data: Record<string, unknown>) {
    const res = await submitForm({ slug: slug.current, data });

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    toast.success("Form submitted successfully");
    form.reset();
  }

  return (
    <div>
      <section className="border-b">
        <div className="container flex flex-col gap-4 py-8">
          <h1 className="text-2xl font-bold md:text-4xl">{title}</h1>

          <div className="prose">
            <PortableText value={description} />
          </div>
        </div>
      </section>

      <section className="container">
        <UIForm {...form}>
          <form
            className="flex flex-col gap-8 py-8"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormBuilder content={content} form={form} />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <LoaderCircleIcon className="animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </UIForm>
      </section>
    </div>
  );
}
