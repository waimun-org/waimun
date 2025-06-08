"use server";

import { sanityFetch } from "@/sanity/lib/client";
import { FORM_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { getFormSchema } from "@/lib/form";
import { verifyHCaptchaToken } from "@/lib/hcaptcha";
import { tryCatch } from "@/utils/try-catch";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { createRecord } from "@/lib/airtable";
import type { FORM_BY_SLUG_QUERYResult } from "@/sanity/types";
import { headers } from "next/headers";

const PAYMENT_METHODS = ["stripe", "bankTransfer"] as const;
const PAYMENT_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
} as const;

const PAYMENT_METHOD_LABELS = {
  stripe: "Stripe",
  bankTransfer: "Bank Transfer",
} as const;

const AIRTABLE_RECORD_PREFIX = "rec";

type PaymentMethod = (typeof PAYMENT_METHODS)[number];
type Form = NonNullable<FORM_BY_SLUG_QUERYResult>;
type FormData = Record<string, unknown>;

const submitFormSchema = z.object({
  slug: z.string(),
  formValues: z.record(z.unknown()),
  paymentMethod: z.enum(PAYMENT_METHODS).optional(),
});

type SubmitForm = z.infer<typeof submitFormSchema>;

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    throw new Error("Host not found");
  }

  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}
function generateReference(recordId: string) {
  const reference = recordId.replace(AIRTABLE_RECORD_PREFIX, "");
  return reference.substring(0, 8).toUpperCase();
}

function cleanFormData(formData: FormData) {
  return Object.fromEntries(
    Object.entries(formData).filter(([key]) => key !== "hcaptchaToken"),
  );
}

function addPaymentDataToRecord(
  recordData: Record<string, unknown>,
  paymentMethod: PaymentMethod,
) {
  recordData["Payment Status"] = PAYMENT_STATUS.PENDING;
  recordData["Payment Method"] = PAYMENT_METHOD_LABELS[paymentMethod];
}

async function validateFormSubmission(
  slug: string,
  formValues: Record<string, unknown>,
) {
  const formResult = await tryCatch(
    sanityFetch<FORM_BY_SLUG_QUERYResult>({
      query: FORM_BY_SLUG_QUERY,
      params: { slug },
      tags: ["form", `form-${slug}`],
    }),
  );

  if (formResult.error) {
    throw new Error(`Failed to fetch form with slug: ${slug}`);
  }

  const form = formResult.data;
  if (!form) {
    throw new Error("Form not found");
  }

  const formSchema = getFormSchema(form.content);
  const parsedValues = formSchema.safeParse(formValues);

  if (!parsedValues.success) {
    throw new Error("Invalid form values");
  }

  const formData = parsedValues.data as FormData;

  const hcaptchaToken = formData.hcaptchaToken as string | undefined;
  if (!hcaptchaToken) {
    throw new Error("Captcha token is required");
  }

  const captchaResult = await tryCatch(verifyHCaptchaToken(hcaptchaToken));
  if (captchaResult.error) {
    throw new Error("Captcha verification failed");
  }

  if (!captchaResult.data) {
    throw new Error("Captcha verification failed");
  }

  return { form, formData };
}

async function createStripeCheckoutSession(form: Form, recordId: string) {
  if (!form.stripe.enabled || !form.stripe.priceId) {
    throw new Error("Stripe is not enabled");
  }

  const baseUrl = await getBaseUrl();
  const formSlug = form.slug.current;

  const sessionResult = await tryCatch(
    stripe.checkout.sessions.create({
      line_items: [{ price: form.stripe.priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${baseUrl}/forms/${formSlug}?paymentStatus=success`,
      cancel_url: `${baseUrl}/forms/${formSlug}`,
      metadata: {
        formId: form._id,
        recordId,
      },
    }),
  );

  if (sessionResult.error) {
    throw new Error("Failed to create Stripe checkout session");
  }

  const session = sessionResult.data;
  if (!session.url) {
    throw new Error("Failed to create Stripe checkout session");
  }

  return { url: session.url };
}

async function createFormRecord(
  form: Form,
  formData: FormData,
  paymentMethod?: PaymentMethod | null,
) {
  const recordData = cleanFormData(formData);

  if (paymentMethod) {
    addPaymentDataToRecord(recordData, paymentMethod);
  }

  const recordResult = await tryCatch(
    createRecord(
      { baseId: form.airtable.baseId, tableId: form.airtable.tableId },
      recordData,
    ),
  );

  if (recordResult.error) {
    throw new Error("Failed to create form record");
  }

  return { recordId: recordResult.data };
}

export async function submitForm(input: SubmitForm) {
  const parsedInput = tryCatch(() => submitFormSchema.parse(input));

  if (parsedInput.error) {
    console.error("Invalid form data:", parsedInput.error);
    return { success: false, error: "Invalid form data" };
  }

  const { slug, formValues, paymentMethod } = parsedInput.data;

  const validationResult = await tryCatch(
    validateFormSubmission(slug, formValues),
  );

  if (validationResult.error) {
    console.error("Invalid form data:", validationResult.error);
    return { success: false, error: "Invalid form data" };
  }

  const { form, formData } = validationResult.data;

  const recordResult = await tryCatch(
    createFormRecord(form, formData, paymentMethod),
  );

  if (recordResult.error) {
    console.error("Failed to create form record:", recordResult.error);
    return { success: false, error: "Failed to create form record" };
  }

  const { recordId } = recordResult.data;

  if (paymentMethod === "stripe") {
    const stripeResult = await tryCatch(
      createStripeCheckoutSession(form, recordId),
    );

    if (stripeResult.error) {
      console.error(
        "Failed to create Stripe checkout session:",
        stripeResult.error,
      );

      return {
        success: false,
        error: "Failed to create Stripe checkout session",
      };
    }

    return { success: true, redirect: stripeResult.data.url };
  }

  if (paymentMethod === "bankTransfer") {
    const reference = generateReference(recordId);
    return { success: true, reference };
  }

  return { success: true };
}
