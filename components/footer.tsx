import type { FOOTER_QUERYResult } from "@/sanity/types";
import { Link } from "./link";

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

        {footer.links && (
          <div className="flex items-center gap-4">
            {footer.links.map((link) => (
              <Link key={link._key} link={link} />
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
