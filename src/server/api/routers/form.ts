import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { client } from "@/sanity/lib/client";
import { FORM_QUERY } from "@/sanity/lib/queries";
import { getFormSchema } from "@/utils/form";
import { type FORM_QUERYResult } from "@/sanity/types";
import { env } from "@/env.mjs";

export const formRouter = createTRPCRouter({
  submit: publicProcedure
    .input(z.object({ slug: z.string(), data: z.record(z.any()) }))
    .mutation(async ({ input }) => {
      const form = await client.fetch<FORM_QUERYResult>(FORM_QUERY, {
        slug: input.slug,
      });

      if (!form) {
        throw new Error("Form not found");
      }

      if (!form?.content) {
        throw new Error("Form content not found");
      }

      const formSchema = getFormSchema(form.content);
      const results = formSchema.safeParse(input.data);

      if (!results.success) {
        throw new Error("Invalid form data");
      }

      const data = results.data as unknown;

      if (!form.airtable?.baseId || !form.airtable?.tableId) {
        throw new Error("Missing Airtable base or table ID");
      }

      const body = {
        fields: data,
      };

      const response = await fetch(
        `https://api.airtable.com/v0/${form.airtable?.baseId}/${form.airtable?.tableId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        console.error(await response.json());
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      return {
        success: true,
      };
    }),
});
