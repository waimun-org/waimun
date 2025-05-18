"use server";

import { client } from "@/sanity/lib/client";
import type { FORM_QUERYResult } from "@/sanity/types";
import { FORM_QUERY } from "@/sanity/lib/queries";
import { getFormSchema } from "@/utils/form";
import { z } from "zod";
import { Resource } from "sst";

const submitFormSchema = z.object({
  slug: z.string(),
  data: z.record(z.unknown())
});

export async function submitForm(input: z.infer<typeof submitFormSchema>) {
  const parsedInput = submitFormSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      error: "Invalid form data"
    };
  }

  const { slug, data } = parsedInput.data;

  const form = await client.fetch<FORM_QUERYResult>(FORM_QUERY, { slug });

  if (!form) {
    return {
      success: false,
      error: "Form not found"
    };
  }

  const formSchema = getFormSchema(form.content);
  const results = formSchema.safeParse(data);

  if (!results.success) {
    return {
      success: false,
      error: "Invalid form data"
    };
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${form.airtable.baseId}/${form.airtable.tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Resource.AirtableToken.value}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fields: results.data as unknown })
    }
  );

  if (!response.ok) {
    console.error(await response.json());
    return {
      success: false,
      error: "Failed to save your submission. Please try again later"
    };
  }

  return {
    success: true
  };
}
