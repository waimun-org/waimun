"use client";

import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { type NAVIGATION_QUERYResult } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            src={urlFor(navigation.logo).width(32).height(32).url()}
            alt={navigation.logo.alt ?? ""}
            width={32}
            height={32}
            priority
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
