import type { Social } from "@/sanity/types";
import { Image } from "./image";

export type SocialsType = Array<Social & { _key: string }>;

export type SocialsProps = {
  socials: SocialsType;
};

export function Socials({ socials }: SocialsProps) {
  return (
    <div className="flex items-center gap-4">
      {socials.map((social) => (
        <a
          key={social._key}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-50"
        >
          <Image
            alt={social.title}
            image={social.icon}
            className="size-5"
            sizes="20px"
            widths={[20, 40]}
          />
        </a>
      ))}
    </div>
  );
}
