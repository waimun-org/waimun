import type { FOOTER_QUERYResult } from "@/sanity/types";
import { Link } from "./link";
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
      <div className="text-muted-foreground container flex flex-col-reverse flex-wrap gap-8 p-4 text-sm md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <p>{footer.copyright}</p>
        </div>

        <div className="flex items-center gap-6">
          {footer.links.map((link) => (
            <Link key={link._key} link={link} />
          ))}

          <Socials socials={footer.socials} />
        </div>
      </div>
    </footer>
  );
}
