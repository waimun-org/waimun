import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { tryCatch } from "@/utils/try-catch";

export async function POST(req: NextRequest) {
  const result = await tryCatch(
    parseBody<{ tags: string[] }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // Wait for Content Lake eventual consistency
    ),
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

  if (!body?.tags) {
    return new Response(JSON.stringify({ message: "Bad Request", body }), {
      status: 400,
    });
  }

  body.tags.forEach((tag) => {
    revalidateTag(tag);
  });

  return NextResponse.json({ body });
}
