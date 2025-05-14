import { PortableText } from "next-sanity";
import type { Prose } from "@/sanity/types";

export type ProseProps = {
  prose: Prose;
};

export function Prose({ prose }: ProseProps) {
  return (
    <section className="container py-8">
      <div className="prose">
        <PortableText value={prose?.content} />
      </div>
    </section>
  );
}
