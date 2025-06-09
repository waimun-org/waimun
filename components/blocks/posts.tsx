import type { POSTS_QUERYResult, Posts } from "@/sanity/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image } from "@/components/image";
import Link from "next/link";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, CalendarIcon, UserIcon } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/client";
import { format } from "date-fns";
import { tryCatch } from "@/utils/try-catch";

async function getPosts(): Promise<POSTS_QUERYResult> {
  const result = await tryCatch(
    sanityFetch<POSTS_QUERYResult>({
      query: POSTS_QUERY,
      tags: ["post"],
    }),
  );

  if (result.error) {
    console.error("Failed to fetch posts:", result.error);
    return [];
  }

  return result.data;
}

export type PostsProps = {
  block: Posts;
};

export async function Posts(_: PostsProps) {
  const posts = await getPosts();

  return (
    <section className="container flex flex-col gap-8 py-8">
      {posts.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />

          <AlertTitle>No posts found</AlertTitle>
          <AlertDescription>
            There are no blog posts published at the moment.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug?.current}`} key={post._id}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>

                {post.excerpt && (
                  <CardDescription className="prose max-w-none">
                    {post.excerpt}
                  </CardDescription>
                )}

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="size-4" />
                    <span className="whitespace-nowrap">
                      {format(new Date(post.publishedAt), "MMM d, yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <UserIcon className="size-4" />
                    <span className="whitespace-nowrap">{post.author}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  image={post.image}
                  alt={post.image.alt}
                  className="aspect-[4/3] rounded-lg object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
