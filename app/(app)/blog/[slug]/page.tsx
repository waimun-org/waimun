import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/post";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import type { POST_BY_SLUG_QUERYResult } from "@/sanity/types";
import { generateNextMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { tryCatch } from "@/utils/try-catch";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string) {
  const result = await tryCatch(
    client.fetch<POST_BY_SLUG_QUERYResult>(POST_BY_SLUG_QUERY, { slug }),
  );

  if (result.error) {
    console.error("Error fetching post:", result.error);
    return null;
  }

  return result.data;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return generateNextMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return <Post post={post} />;
}
