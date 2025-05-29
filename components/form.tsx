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
import {
  CheckCircleIcon,
  ChevronDownIcon,
  LoaderCircleIcon
} from "lucide-react";
import { Form as UIForm } from "./ui/form";
import { submitForm } from "@/app/(app)/forms/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type Stripe from "stripe";
import Link from "next/link";

export type FormProps = {
  form: FormType & {
    content: FormBuilderType;
  };
  price?: Price | null;
};

export type Price = Partial<Pick<Stripe.Price, "unit_amount" | "currency">>;

export function Form({
  form: { title, description, slug, content, stripe },
  price
}: FormProps) {
  const defaultValues = getFormDefaultValues(content);
  const resolver = zodResolver(getFormSchema(content));
  const form = useForm({ defaultValues, resolver });

  async function handleSubmit(values: Record<string, unknown>) {
    const res = await submitForm({ slug: slug.current, formValues: values });

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    if (res.redirect) {
      window.location.href = res.redirect;
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

      <section className="container flex max-w-2xl flex-col gap-8 py-8 md:py-16">
        <Suspense fallback={null}>
          <PaymentStatus />
        </Suspense>

        <UIForm {...form}>
          <form
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormBuilder content={content} form={form} />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              id="submit"
            >
              {form.formState.isSubmitting && (
                <LoaderCircleIcon className="animate-spin" />
              )}
              {stripe.enabled ? "Pay" : "Submit"}
            </Button>
          </form>
        </UIForm>

        <PaymentInformation price={price} />
      </section>
    </div>
  );
}

export function PaymentStatus() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("paymentStatus");

  if (paymentStatus === "success") {
    return (
      <Alert>
        <CheckCircleIcon className="h-4 w-4" />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>Your payment has been successful.</AlertDescription>
      </Alert>
    );
  }

  return null;
}

export function PaymentInformation({ price }: { price?: Price | null }) {
  if (!price) {
    return null;
  }

  if (!price.unit_amount || !price.currency) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: price.currency.toUpperCase()
  }).format(price.unit_amount / 100);

  return (
    <Link
      href="#submit"
      className="bg-background/80 hover:bg-accent/80 hover:text-accent-foreground fixed bottom-8 left-1/2 flex h-8 -translate-x-1/2 items-center gap-1.5 rounded-full border px-2.5 text-sm shadow-xs backdrop-blur"
    >
      <p>{formattedPrice}</p>
      <ChevronDownIcon className="size-4" />
    </Link>
  );
}
