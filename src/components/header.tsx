import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Image } from "./image";
import type { HEADER_QUERY_RESULT } from "@/sanity/types";

export type HeaderProps = {
  header: HEADER_QUERY_RESULT;
  pathname: string;
};

export function Header({ header, pathname }: HeaderProps) {
  if (!header) {
    return null;
  }

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Image
            image={header.logo}
            alt={header.logo.alt}
            priority
            sizes="200px"
            className="h-8 w-auto"
          />
        </a>

        <MainNav header={header} pathname={pathname} />
        <MobileNav header={header} pathname={pathname} />
      </div>
    </header>
  );
}
