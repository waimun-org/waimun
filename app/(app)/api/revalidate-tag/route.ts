import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { tryCatch } from "@/utils/try-catch";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  const result = await tryCatch(
    parseBody<{ tags: string[] }>(req, env.SANITY_REVALIDATE_SECRET),
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

  if (!Array.isArray(body?.tags) || body.tags.length === 0) {
    return new Response(JSON.stringify({ message: "Bad Request", body }), {
      status: 400,
    });
  }

  body.tags.forEach((tag) => {
    revalidateTag(tag, "max");
  });

  return NextResponse.json({ body });
}
