import { updateRecord } from "@/airtable/forms";
import { client } from "@/sanity/lib/client";
import { FORM_BY_ID_QUERY } from "@/sanity/lib/queries";
import type { FORM_BY_ID_QUERYResult } from "@/sanity/types";
import { stripe } from "@/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resource } from "sst";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const headersList = await headers();
  const body = await request.text();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature found in request headers" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Resource.StripeWebhookSecret.value
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error verifying webhook signature" },
      { status: 400 }
    );
  }

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
        { status: 400 }
      );
    }

    let form: FORM_BY_ID_QUERYResult | undefined;

    try {
      form = await client.fetch<FORM_BY_ID_QUERYResult>(FORM_BY_ID_QUERY, {
        id: formId
      });

      if (!form) {
        return NextResponse.json({ error: "Form not found" }, { status: 400 });
      }
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: "Failed to update form payment status."
        },
        { status: 500 }
      );
    }

    const recordId = metadata.recordId;

    if (!recordId) {
      return NextResponse.json(
        { error: "No recordId found in checkout session metadata" },
        { status: 400 }
      );
    }

    try {
      await updateRecord(
        {
          baseId: form.airtable.baseId,
          tableId: form.airtable.tableId
        },
        recordId,
        { "Payment Status": "Paid" }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Failed to update record in Airtable" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
