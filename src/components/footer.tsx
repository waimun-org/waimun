import type { FOOTER_QUERY_RESULT } from "@/sanity/types";
import { getLinkProps } from "@/utils/link";
import { Socials } from "./socials";

export type FooterProps = {
  footer: FOOTER_QUERY_RESULT;
};

export function Footer({ footer }: FooterProps) {
  if (!footer) {
    return null;
  }

  return (
    <footer className="border-t">
      <div className="container flex h-16 flex-wrap items-center justify-between gap-6 text-sm">
        <div className="flex flex-wrap gap-4">
          {footer.links.map((link) => (
            <a
              key={link._key}
              {...getLinkProps(link.url)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>

        {footer.socials && <Socials socials={footer.socials} />}
      </div>
    </footer>
  );
}
