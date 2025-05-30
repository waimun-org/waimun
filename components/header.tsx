import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Image } from "./image";
import Link from "next/link";
import type { HEADER_QUERYResult } from "@/sanity/types";

export type HeaderProps = {
  header: HEADER_QUERYResult;
};

export function Header({ header }: HeaderProps) {
  if (!header) {
    return null;
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            image={header.logo}
            alt={header.logo.alt}
            priority
            sizes="200px"
            className="h-8 w-auto"
          />
        </Link>

        <MainNav header={header} />
        <MobileNav header={header} />
      </div>
    </header>
  );
}
