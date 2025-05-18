import { FORM_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Form } from "@/components/form";
import { client } from "@/sanity/lib/client";
import type { FORM_QUERYResult } from "@/sanity/types";

export default async function FormPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = await client.fetch<FORM_QUERYResult>(FORM_QUERY, { slug });

  if (!form) {
    return notFound();
  }

  return <Form form={form} />;
}
