import type { FOOTER_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { Socials } from "./socials";

export type FooterProps = {
  footer: FOOTER_QUERYResult;
};

export function Footer({ footer }: FooterProps) {
  if (!footer) {
    return null;
  }

  return (
    <footer className="border-t">
      <div className="container flex h-16 flex-wrap items-center justify-between gap-6 text-sm">
        <div className="flex flex-wrap gap-3">
          {footer.links.map((link) => (
            <Link
              key={link._key}
              href={link.url}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>

        <Socials socials={footer.socials} />
      </div>
    </footer>
  );
}
