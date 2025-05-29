"use server";

import { client } from "@/sanity/lib/client";
import { FORM_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { getFormSchema } from "@/utils/form";
import { verifyHCaptchaToken } from "@/utils/hcaptcha";
import { z } from "zod";
import { stripe } from "@/stripe";
import { createRecord } from "@/airtable/forms";
import type { FORM_BY_SLUG_QUERYResult } from "@/sanity/types";
import { headers } from "next/headers";

const submitFormSchema = z.object({
  slug: z.string(),
  formValues: z.record(z.unknown())
});

export async function submitForm(input: z.infer<typeof submitFormSchema>) {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const parsedInput = submitFormSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      error: "Invalid form data"
    };
  }

  const { slug, formValues } = parsedInput.data;

  const form = await client.fetch<FORM_BY_SLUG_QUERYResult>(
    FORM_BY_SLUG_QUERY,
    { slug }
  );

  if (!form) {
    return {
      success: false,
      error: "Form not found"
    };
  }

  const formSchema = getFormSchema(form.content);
  const parsedValues = formSchema.safeParse(formValues);

  if (!parsedValues.success) {
    return {
      success: false,
      error: "Invalid values"
    };
  }

  const formData = parsedValues.data as Record<string, unknown> & {
    hcaptchaToken: string;
  };
  const isValidCaptcha = await verifyHCaptchaToken(formData.hcaptchaToken);

  if (!isValidCaptcha) {
    return {
      success: false,
      error: "Captcha verification failed. Please try again."
    };
  }

  let recordId: string | undefined;

  try {
    const recordData = Object.fromEntries(
      Object.entries(formData).filter(([key]) => key !== "hcaptchaToken")
    );

    if (form.stripe.enabled) {
      recordData["Payment Status"] = "Pending";
    }

    recordId = await createRecord(
      { baseId: form.airtable.baseId, tableId: form.airtable.tableId },
      recordData
    );
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to create record. Please try again later"
    };
  }

  if (form.stripe.enabled) {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: form.stripe.priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${baseUrl}/forms/${slug}?paymentStatus=success`,
      cancel_url: `${baseUrl}/forms/${slug}`,
      metadata: {
        formId: form._id,
        recordId
      }
    });

    return {
      success: true,
      redirect: session.url
    };
  }

  return {
    success: true
  };
}
