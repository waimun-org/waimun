import type { HEADER_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { getLinkProps } from "@/utils/link";
import { Socials } from "./socials";

export type MainNavProps = {
  header: NonNullable<HEADER_QUERY_RESULT>;
  pathname: string;
};

function normalizePath(path: string) {
  return path === "/" ? "/" : path.replace(/\/+$/, "");
}

export function MainNav({ header, pathname }: MainNavProps) {
  const current = normalizePath(pathname);

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {header.links.map((link) => (
        <a
          key={link._key}
          {...getLinkProps(link.url)}
          className={cn(
            "text-muted-foreground hover:text-foreground text-sm font-medium transition-colors",
            normalizePath(link.url) === current && "text-foreground",
          )}
        >
          {link.text}
        </a>
      ))}

      {header.socials && <Socials socials={header.socials} />}
    </nav>
  );
}
