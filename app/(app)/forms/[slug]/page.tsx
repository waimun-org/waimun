import { FORM_BY_SLUG_QUERY, FORMS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Form } from "@/components/form";
import { sanityFetch } from "@/sanity/lib/client";
import type {
  Form as FormType,
  FORM_BY_SLUG_QUERYResult,
  FORMS_SLUGS_QUERYResult,
} from "@/sanity/types";
import { isStripeProduction, stripe } from "@/lib/stripe";
import type { Metadata } from "next";
import { generateNextMetadata } from "@/lib/seo";
import { tryCatch } from "@/utils/try-catch";
import { unstable_cache as cache } from "next/cache";
import type { Price } from "@/utils/price";

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

async function getFormBySlug(slug: string) {
  const result = await tryCatch(
    sanityFetch<FORM_BY_SLUG_QUERYResult>({
      query: FORM_BY_SLUG_QUERY,
      params: { slug },
      tags: [`form:${slug}`],
    }),
  );

  if (result.error) {
    console.error("Error fetching form:", result.error);
    return null;
  }

  return result.data;
}

async function getFormSlugs() {
  const result = await tryCatch(
    sanityFetch<FORMS_SLUGS_QUERYResult>({
      query: FORMS_SLUGS_QUERY,
      tags: ["form"],
    }),
  );

  if (result.error) {
    console.error("Error fetching form slugs:", result.error);
    return [];
  }

  return result.data.map((form) => form.slug);
}

export async function generateStaticParams() {
  const slugs = await getFormSlugs();
  return slugs.map((slug) => ({ slug }));
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

  if (form.stripe.enabled) {
    const priceResult = await tryCatch(getPrice(form.stripe));

    if (priceResult.error) {
      console.error(priceResult.error);
      return notFound();
    }

    price = priceResult.data;
  }

  return <Form form={form} price={price} />;
}

const getCachedPrice = cache(async (priceId: string) => {
  const priceResult = await stripe.prices.retrieve(priceId);

  const { unit_amount, currency } = priceResult;

  if (!unit_amount || !currency) {
    throw new Error("Invalid price data: missing unit_amount or currency");
  }

  return {
    unitAmount: unit_amount,
    currency,
  };
});

export async function getPrice(stripe: FormType["stripe"]) {
  const priceID = isStripeProduction() ? stripe.priceId : stripe.priceIdTest;

  if (!priceID) {
    throw new Error("Stripe price ID is missing");
  }

  return getCachedPrice(priceID);
}
