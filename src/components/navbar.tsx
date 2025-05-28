"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "./image";
import type { NAVIGATION_QUERYResult } from "@/sanity/types";

export type NavbarProps = {
  navigation: NAVIGATION_QUERYResult;
};

export function Navbar({ navigation }: NavbarProps) {
  const pathname = usePathname();

  if (!navigation) {
    return null;
  }

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            image={navigation.logo}
            alt={navigation.logo.alt ?? ""}
            priority
            fetchPriority="high"
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-2">
          {navigation.links.map((link) => (
            <Button
              key={link._key}
              variant={"ghost"}
              asChild
              className={pathname === link.url ? "bg-accent" : ""}
            >
              <Link href={link.url}>{link.text}</Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
