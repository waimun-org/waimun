import type { Post } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { Image } from "@/components/image";
import { CalendarIcon, UserIcon } from "lucide-react";
import { format } from "date-fns";

export type PostProps = {
  post: Post;
};

export function Post({ post }: PostProps) {
  return (
    <article className="container flex max-w-4xl flex-col gap-8 py-8">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-balance">{post.title}</h1>
          <PostMeta post={post} />
        </div>

        <Image
          image={post.image}
          alt={post.image.alt}
          className="aspect-[16/9] w-full rounded-lg object-cover"
          sizes="(min-width: 1024px) 896px, 100vw"
        />
      </header>

      <section className="prose max-w-none">
        <PortableText value={post.content} />
      </section>
    </article>
  );
}

type PostMetaProps = {
  post: Post;
};

function PostMeta({ post }: PostMetaProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <UserIcon className="size-5" />
        <span className="whitespace-nowrap">{post.author}</span>
      </div>

      <div className="flex items-center gap-2">
        <CalendarIcon className="size-5" />
        <span className="whitespace-nowrap">
          {format(new Date(post.publishedAt), "MMM d, yyyy")}
        </span>
      </div>
    </div>
  );
}
