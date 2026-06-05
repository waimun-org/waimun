import { PortableText } from "@portabletext/react";
import type { Prose as ProseType } from "@/sanity/types";

export type ProseProps = {
  block: ProseType;
};

export function Prose({ block }: ProseProps) {
  return (
    <section className="container py-8">
      <div className="prose max-w-none">
        <PortableText value={block.content} />
      </div>
    </section>
  );
}
