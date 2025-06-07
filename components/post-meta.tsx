import { CalendarIcon, UserIcon } from "lucide-react";
import { format } from "date-fns";
import type { Post } from "@/sanity/types";

export type PostMetaProps = {
  post: Post;
};

export function PostMeta({ post }: PostMetaProps) {
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
