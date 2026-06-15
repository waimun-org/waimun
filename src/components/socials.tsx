import type { Social } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { Image } from "./image";

export type SocialsType = Array<Social & { _key: string }>;

export type SocialsProps = {
  socials: SocialsType;
  className?: string;
  iconClassName?: string;
  sizes?: string;
  widths?: number[];
};

export function Socials({
  socials,
  className,
  iconClassName,
  sizes = "20px",
  widths = [20, 40],
}: SocialsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
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
            className={cn("size-5", iconClassName)}
            sizes={sizes}
            widths={widths}
          />
        </a>
      ))}
    </div>
  );
}
