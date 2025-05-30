import type { FOOTER_QUERYResult, HEADER_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { Image } from "./image";

export type SocialsProps = {
  socials:
    | NonNullable<HEADER_QUERYResult>["socials"]
    | NonNullable<FOOTER_QUERYResult>["socials"];
};

export function Socials({ socials }: SocialsProps) {
  return (
    <div className="flex items-center gap-4">
      {socials.map((social) => (
        <Link
          key={social._key}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image alt={social.title} image={social.icon} className="size-5" />
        </Link>
      ))}
    </div>
  );
}
