"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HEADER_QUERYResult } from "@/sanity/types";
import { cn } from "@/lib/utils";

export type MainNavProps = {
  header: NonNullable<HEADER_QUERYResult>;
};

export function MainNav({ header }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-2 md:flex">
      {header.links.map((link) => (
        <Button
          key={link._key}
          variant={"ghost"}
          asChild
          className={cn(pathname === link.url && "bg-accent")}
        >
          <Link
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
          >
            {link.text}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
