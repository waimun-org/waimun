import type { Post } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { PostMeta } from "@/components/post-meta";
import { Image } from "@/components/image";

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
