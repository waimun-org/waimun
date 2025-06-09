import { PortableText } from "next-sanity";
import type { Prose } from "@/sanity/types";

export type ProseProps = {
  block: Prose;
};

export function Prose({ block }: ProseProps) {
  return (
    <section className="container py-8 md:py-16">
      <div className="prose max-w-none">
        <PortableText value={block.content} />
      </div>
    </section>
  );
}
