import { PortableText } from "next-sanity";
import type { TextBlock } from "@/sanity/types";

export type TextBlockFieldProps = {
  field: TextBlock;
};

export function TextBlockField({ field }: TextBlockFieldProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <PortableText value={field.content} />
    </div>
  );
}
