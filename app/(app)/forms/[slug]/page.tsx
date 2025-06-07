import { FORM_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Form, type Price } from "@/components/form";
import { client } from "@/sanity/lib/client";
import type { FORM_BY_SLUG_QUERYResult } from "@/sanity/types";
import { stripe } from "@/lib/stripe";
import type { Metadata } from "next";
import { generateNextMetadata } from "@/lib/seo";
import { tryCatch } from "@/utils/try-catch";

export const dynamic = "force-dynamic";

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

async function getFormBySlug(slug: string) {
  const result = await tryCatch(
    client.fetch<FORM_BY_SLUG_QUERYResult>(FORM_BY_SLUG_QUERY, { slug }),
  );

  if (result.error) {
    console.error("Error fetching form:", result.error);
    return null;
  }

  return result.data;
}

export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  const { slug } = await params;
  const form = await getFormBySlug(slug);

  if (!form) {
    return {};
  }

  return generateNextMetadata(form);
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = await getFormBySlug(slug);

  if (!form) {
    return notFound();
  }

  let price: Price | null = null;

  if (form.stripe.enabled && form.stripe.priceId) {
    const priceResult = await tryCatch(getPrice(form.stripe.priceId));

    if (priceResult.error) {
      console.error(priceResult.error);
      return notFound();
    }

    price = priceResult.data;
  }

  return <Form form={form} price={price} />;
}

export async function getPrice(priceId: string): Promise<Price | null> {
  const priceResult = await stripe.prices.retrieve(priceId);

  const { unit_amount, currency } = priceResult;

  if (!unit_amount || !currency) {
    throw new Error("Invalid price data: missing unit_amount or currency");
  }

  return {
    unitAmount: unit_amount,
    currency,
  };
}
