"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HEADER_QUERYResult } from "@/sanity/types";
import { cn } from "@/lib/utils";
import { Socials } from "./socials";

export type MainNavProps = {
  header: NonNullable<HEADER_QUERYResult>;
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
            pathname === link.url && "text-foreground"
          )}
        >
          {link.text}
        </Link>
      ))}

      <Socials socials={header.socials} />
    </nav>
  );
}
