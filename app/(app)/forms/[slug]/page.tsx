import { FORM_BY_SLUG_QUERY, FORMS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Form } from "@/components/form";
import { client } from "@/sanity/lib/client";
import type { FORM_BY_SLUG_QUERYResult } from "@/sanity/types";
import { stripe } from "@/stripe";

export const revalidate = 60;

export async function generateStaticParams() {
  const forms = await client.fetch<{ slug: string }[]>(FORMS_SLUGS_QUERY);

  return forms.map((form) => ({
    slug: form.slug
  }));
}

export default async function FormPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = await client.fetch<FORM_BY_SLUG_QUERYResult>(
    FORM_BY_SLUG_QUERY,
    { slug }
  );

  if (!form) {
    return notFound();
  }

  const price = form.stripe.priceId
    ? await stripe.prices.retrieve(form.stripe.priceId)
    : null;

  return <Form form={form} price={{ ...price }} />;
}
