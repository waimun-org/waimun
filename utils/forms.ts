import type { FORM_BY_SLUG_QUERYResult } from "@/sanity/types";
import { createRecord } from "@/lib/airtable";
import { sendBankTransferEmail } from "@/lib/ses";
import { sanityFetch } from "@/sanity/lib/client";
import { formatPrice } from "./price";
import { FORM_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { getFormSchema } from "@/lib/form";
import { getBaseUrl } from "./base-url";
import { isStripeProduction, stripe } from "@/lib/stripe";

export type Form = NonNullable<FORM_BY_SLUG_QUERYResult>;

export async function sendBankTransferEmailForForm(
  form: Form,
  values: Record<string, unknown>,
  reference: string,
) {
  if (!form.bankTransfer?.enabled) {
    throw new Error("Bank transfer is not enabled");
  }

  if (
    !form.bankTransfer.accountName ||
    !form.bankTransfer.accountNumber ||
    !form.bankTransfer.price
  ) {
    throw new Error("Bank transfer configuration is incomplete");
  }

  const email = findEmail(values);
  const fullName = findFullName(values);

  if (!email) {
    throw new Error("Email not found in form data");
  }

  return await sendBankTransferEmail({
    to: fullName ? `${fullName} <${email}>` : email,
    fullName: fullName ?? undefined,
    accountName: form.bankTransfer.accountName,
    accountNumber: form.bankTransfer.accountNumber,
    reference,
    price: formatPrice(form.bankTransfer.price),
    instructions: form.bankTransfer.instructions,
  });
}

export async function getFormBySlug(slug: string) {
  return await sanityFetch<FORM_BY_SLUG_QUERYResult>({
    query: FORM_BY_SLUG_QUERY,
    params: { slug },
    tags: [`form:${slug}`],
  });
}

export async function parseValues(form: Form, values: Record<string, unknown>) {
  const formSchema = getFormSchema(form.content);
  return formSchema.parse(values);
}

export async function createStripeCheckoutSession(
  form: Form,
  recordId: string,
  email?: string,
) {
  if (!form.stripe?.enabled) {
    throw new Error("Stripe is not enabled");
  }

  const baseUrl = await getBaseUrl();
  const formSlug = form.slug.current;
  const priceId = isStripeProduction()
    ? form.stripe.priceId
    : form.stripe.priceIdTest;

  if (!priceId) {
    throw new Error("Stripe price ID is missing");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    success_url: `${baseUrl}/forms/${formSlug}?paymentStatus=success`,
    cancel_url: `${baseUrl}/forms/${formSlug}`,
    customer_email: email,
    metadata: {
      formId: form._id,
      recordId,
    },
  });

  if (!session.url) {
    throw new Error("Stripe checkout session URL is missing");
  }

  return { url: session.url };
}

export function generateReference(recordId: string) {
  const reference = recordId.replace("rec", "");
  return reference.substring(0, 8).toUpperCase();
}

const emailKeys = [
  "Email Address",
  "EmailAddress",
  "emailAddress",
  "email_address",
  "Email",
  "email",
];

export function findEmail(values: Record<string, unknown>) {
  for (const key of emailKeys) {
    const email = values[key];
    if (email && typeof email === "string") {
      return email;
    }
  }

  return;
}

const firstNameKeys = [
  "First Name",
  "Given Name",
  "firstName",
  "givenName",
  "first_name",
  "given_name",
  "FirstName",
  "GivenName",
];

const lastNameKeys = [
  "Last Name",
  "Family Name",
  "Surname",
  "lastName",
  "familyName",
  "surname",
  "last_name",
  "family_name",
  "LastName",
  "FamilyName",
];

const fullNameKeys = [
  "Full Name",
  "Name",
  "fullName",
  "name",
  "full_name",
  "FullName",
];

export function findFullName(values: Record<string, unknown>) {
  // Try to find first and last name separately
  let firstName: string | undefined;
  let lastName: string | undefined;

  for (const key of firstNameKeys) {
    const value = values[key];
    if (value && typeof value === "string") {
      firstName = value;
      break;
    }
  }

  for (const key of lastNameKeys) {
    const value = values[key];
    if (value && typeof value === "string") {
      lastName = value;
      break;
    }
  }

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  // Try to find full name
  for (const key of fullNameKeys) {
    const value = values[key];
    if (value && typeof value === "string") {
      return value;
    }
  }

  // Fall back to just first name if available
  if (firstName) {
    return firstName;
  }

  return null;
}

export const paymentMethods = ["stripe", "bankTransfer"] as const;
export type PaymentMethod = (typeof paymentMethods)[number];

export const paymentStatuses = {
  PENDING: "Pending",
  COMPLETED: "Completed",
} as const;

export const paymentMethodLabels = {
  stripe: "Stripe",
  bankTransfer: "Bank Transfer",
} as const;

export async function createFormRecord(
  form: Form,
  values: Record<string, unknown>,
  paymentMethod?: PaymentMethod | null,
) {
  // Remove hcaptchaToken from values
  const fields = Object.fromEntries(
    Object.entries(values).filter(([key]) => key !== "hcaptchaToken"),
  );

  // Add payment data to fields
  if (paymentMethod) {
    fields["Payment Status"] = paymentStatuses.PENDING;
    fields["Payment Method"] = paymentMethodLabels[paymentMethod];
  }

  // Create record in Airtable
  const recordId = await createRecord(
    { baseId: form.airtable.baseId, tableId: form.airtable.tableId },
    fields,
  );

  return { recordId };
}
