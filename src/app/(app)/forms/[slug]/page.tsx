import { FORM_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import type { FORM_QUERYResult } from "@/sanity/types";
import { sanityFetch } from "@/sanity/lib/live";
import { Form } from "@/components/form";

async function getForm(slug: string): Promise<FORM_QUERYResult> {
  const result = await sanityFetch({
    query: FORM_QUERY,
    params: { slug },
    tags: ["form", slug],
  });

  return result.data as FORM_QUERYResult;
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = await getForm(slug);

  if (!form) {
    return notFound();
  }

  return <Form form={form} />;
}
