import { type FOOTER_QUERYResult } from "@/sanity/types";
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
      <div className="text-muted-foreground container flex h-16 items-center justify-between text-sm">
        {footer.copyright && (
          <div className="flex items-center gap-4">
            <p>{footer.copyright}</p>
          </div>
        )}

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
