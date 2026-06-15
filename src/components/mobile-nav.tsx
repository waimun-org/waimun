import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import type { HEADER_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { getLinkProps } from "@/utils/link";
import { Socials } from "./socials";

export type MobileNavProps = {
  header: NonNullable<HEADER_QUERY_RESULT>;
  pathname: string;
};

function normalizePath(path: string) {
  return path === "/" ? "/" : path.replace(/\/+$/, "");
}

export function MobileNav({ header, pathname }: MobileNavProps) {
  const current = normalizePath(pathname);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <nav
        id={menuId}
        aria-label="Mobile navigation"
        className={cn(
          "bg-background fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col border-t transition-[opacity,visibility]",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="container flex min-h-0 flex-1 flex-col gap-8 py-8">
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto">
            {header.links.map((link) => (
              <a
                key={link._key}
                {...getLinkProps(link.url)}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-2xl font-semibold transition-colors hover:text-foreground",
                  normalizePath(link.url) !== current &&
                    "text-muted-foreground",
                )}
              >
                {link.text}
              </a>
            ))}
          </div>

          {header.socials && <Socials socials={header.socials} />}
        </div>
      </nav>
    </div>
  );
}
