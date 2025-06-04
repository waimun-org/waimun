import type { Social } from "@/sanity/types";
import Link from "next/link";
import { Image } from "./image";

export type Socials = Array<Social & { _key: string }>;

export type SocialsProps = {
  socials: Socials;
};

export function Socials({ socials }: SocialsProps) {
  return (
    <div className="flex items-center gap-2">
      {socials.map((social) => (
        <Link
          key={social._key}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-50"
        >
          <Image alt={social.title} image={social.icon} className="size-5" />
        </Link>
      ))}
    </div>
  );
}
