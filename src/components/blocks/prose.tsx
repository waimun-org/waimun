import { PortableText } from "next-sanity";
import { type PAGE_QUERYResult } from "@/sanity/types";

export type ProseProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "prose" }
>;

export function Prose({ content }: ProseProps) {
  return (
    <section className="container py-8">
      {content && (
        <div className="prose">
          <PortableText value={content} />
        </div>
      )}
    </section>
  );
}
