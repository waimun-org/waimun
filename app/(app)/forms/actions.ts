"use server";

import { tryCatch } from "@/utils/try-catch";
import { z } from "zod";
import {
  createFormRecord,
  createStripeCheckoutSession,
  findEmail,
  generateReference,
  getFormBySlug,
  paymentMethods,
  sendBankTransferEmailForForm,
  parseValues,
} from "@/utils/forms";
import { verifyHCaptchaToken } from "@/lib/hcaptcha";

const submitFormSchema = z.object({
  slug: z.string(),
  values: z.record(z.string(), z.unknown()),
  paymentMethod: z.enum(paymentMethods).optional(),
});

export async function submitForm(input: z.infer<typeof submitFormSchema>) {
  const parsedInput = tryCatch(() => submitFormSchema.parse(input));

  if (parsedInput.error) {
    console.error("Failed to parse input:", parsedInput.error);
    return { success: false, error: "Invalid input" };
  }

  const { slug, values, paymentMethod } = parsedInput.data;

  const form = await tryCatch(getFormBySlug(slug));

  if (form.error) {
    console.error("Failed to get form:", form.error);
    return { success: false, error: "Failed to get form" };
  }

  if (!form.data) {
    console.error("Form not found with slug:", slug);
    return { success: false, error: "Form not found" };
  }

  const parsedValues = await tryCatch(parseValues(form.data, values));

  if (parsedValues.error) {
    console.error("Failed to parse values:", parsedValues.error);
    return {
      success: false,
      error: `Failed to parse values`,
    };
  }

  const hcaptchaToken = parsedValues.data.hcaptchaToken as string;
  const isValid = await tryCatch(verifyHCaptchaToken(hcaptchaToken));

  if (isValid.error || !isValid.data) {
    console.error("Captcha verification failed:", isValid.error);
    return {
      success: false,
      error: `Captcha verification failed`,
    };
  }

  const createFormRecordResult = await tryCatch(
    createFormRecord(form.data, parsedValues.data, paymentMethod),
  );

  if (createFormRecordResult.error) {
    console.error(
      "Failed to create form record:",
      createFormRecordResult.error,
    );
    return {
      success: false,
      error: "Failed to create form record",
    };
  }

  const { recordId } = createFormRecordResult.data;

  if (paymentMethod === "stripe") {
    const { stripe } = form.data;

    if (!stripe?.enabled || !stripe?.priceId) {
      console.error(
        "Stripe integration is not configured for form:",
        form.data._id,
      );
      return {
        success: false,
        error: "Stripe integration is not configured",
      };
    }

    const email = tryCatch(() => findEmail(parsedValues.data));
    const checkoutSession = await tryCatch(
      createStripeCheckoutSession(form.data, recordId, email.data),
    );

    if (checkoutSession.error) {
      console.error(
        "Failed to create Stripe checkout session:",
        checkoutSession.error,
      );
      return {
        success: false,
        error: "Failed to create Stripe checkout session",
      };
    }

    return { success: true, redirect: checkoutSession.data.url };
  }

  if (paymentMethod === "bankTransfer") {
    const { bankTransfer } = form.data;

    if (
      !bankTransfer?.enabled ||
      !bankTransfer.accountName ||
      !bankTransfer.accountNumber ||
      !bankTransfer.price
    ) {
      console.error(
        "Bank transfer integration is not configured for form:",
        form.data._id,
      );
      return {
        success: false,
        error: "Bank transfer integration is not configured",
      };
    }

    const reference = generateReference(recordId);
    const emailResult = await tryCatch(
      sendBankTransferEmailForForm(form.data, parsedValues.data, reference),
    );

    if (emailResult.error) {
      console.error("Failed to send bank transfer email:", emailResult.error);
    }

    return { success: true, reference };
  }

  return { success: true };
}
