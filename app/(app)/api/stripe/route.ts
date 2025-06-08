import { updateRecord } from "@/lib/airtable";
import { sanityFetch } from "@/sanity/lib/client";
import { FORM_BY_ID_QUERY } from "@/sanity/lib/queries";
import type { FORM_BY_ID_QUERYResult } from "@/sanity/types";
import { stripe } from "@/lib/stripe";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const headersList = await headers();
  const body = await request.text();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature found in request headers" },
      { status: 400 },
    );
  }

  const eventResult = tryCatch(() =>
    stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    ),
  );

  if (eventResult.error) {
    console.error("Webhook signature verification failed:", eventResult.error);
    return NextResponse.json(
      { error: "Error verifying webhook signature" },
      { status: 400 },
    );
  }

  const event = eventResult.data;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    if (!metadata) {
      return NextResponse.json({ success: true });
    }

    const formId = metadata.formId;

    if (!formId) {
      return NextResponse.json(
        { error: "No formId found in checkout session metadata" },
        { status: 400 },
      );
    }

    const formResult = await tryCatch(
      sanityFetch<FORM_BY_ID_QUERYResult>({
        query: FORM_BY_ID_QUERY,
        params: { id: formId },
        tags: ["form", `form-${formId}`],
      }),
    );

    if (formResult.error) {
      console.error("Failed to fetch form:", formResult.error);
      return NextResponse.json(
        { error: "Failed to fetch form data" },
        { status: 500 },
      );
    }

    const form = formResult.data;

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 400 });
    }

    const recordId = metadata.recordId;

    if (!recordId) {
      return NextResponse.json(
        { error: "No recordId found in checkout session metadata" },
        { status: 400 },
      );
    }

    const updateResult = await tryCatch(
      updateRecord(
        {
          baseId: form.airtable.baseId,
          tableId: form.airtable.tableId,
        },
        recordId,
        { "Payment Status": "Paid" },
      ),
    );

    if (updateResult.error) {
      console.error("Failed to update record in Airtable:", updateResult.error);
      return NextResponse.json(
        { error: "Failed to update record in Airtable" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ success: true });
}
