import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { tryCatch } from "@/utils/try-catch";

export async function POST(req: NextRequest) {
  const result = await tryCatch(
    parseBody<{ _type: string }>(req, process.env.SANITY_REVALIDATE_SECRET),
  );

  if (result.error) {
    console.error("Failed to parse body", result.error);

    return new Response(
      JSON.stringify({
        message: "Invalid signature",
        isValidSignature: false,
        body: null,
      }),
      {
        status: 401,
      },
    );
  }

  const { isValidSignature, body } = result.data;

  if (!isValidSignature) {
    return new Response(
      JSON.stringify({
        message: "Invalid signature",
        isValidSignature,
        body,
      }),
      {
        status: 401,
      },
    );
  }

  if (!body?._type) {
    return new Response(JSON.stringify({ message: "Bad Request", body }), {
      status: 400,
    });
  }

  revalidateTag(body._type);
  return NextResponse.json({ body });
}
