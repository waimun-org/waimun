import { POST_BY_SLUG_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/post";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import type {
  POST_BY_SLUG_QUERYResult,
  POSTS_SLUGS_QUERYResult,
} from "@/sanity/types";
import { generateNextMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { tryCatch } from "@/utils/try-catch";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string) {
  const result = await tryCatch(
    sanityFetch<POST_BY_SLUG_QUERYResult>({
      query: POST_BY_SLUG_QUERY,
      params: { slug },
      tags: ["post", `post-${slug}`],
    }),
  );

  if (result.error) {
    console.error("Error fetching post:", result.error);
    return null;
  }

  return result.data;
}

async function getPostSlugs() {
  const result = await tryCatch(
    sanityFetch<POSTS_SLUGS_QUERYResult>({
      query: POSTS_SLUGS_QUERY,
      tags: ["post"],
    }),
  );

  if (result.error) {
    console.error("Error fetching post slugs:", result.error);
    return [];
  }

  return result.data.map((post) => post.slug);
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
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
