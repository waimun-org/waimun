"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HEADER_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { Socials } from "./socials";

export type MainNavProps = {
  header: NonNullable<HEADER_QUERY_RESULT>;
};

export function MainNav({ header }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {header.links.map((link) => (
        <Link
          key={link._key}
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : undefined}
          className={cn(
            "text-muted-foreground hover:text-foreground text-sm font-medium transition-colors",
            pathname === link.url && "text-foreground",
          )}
        >
          {link.text}
        </Link>
      ))}

      {header.socials && <Socials socials={header.socials} />}
    </nav>
  );
}
