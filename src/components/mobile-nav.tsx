import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { HEADER_QUERY_RESULT } from "@/sanity/types";
import { useState } from "react";
import { cn } from "@/utils/cn";
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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>{header.title}</DrawerTitle>
          <DrawerDescription>
            Navigation menu for mobile devices
          </DrawerDescription>
        </DrawerHeader>

        <div className="container flex min-h-[240px] flex-col gap-6 py-8">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
            {header.links.map((link) => (
              <a
                key={link._key}
                href={link.url}
                onClick={() => setOpen(false)}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                className={cn(
                  "text-lg font-medium",
                  normalizePath(link.url) !== current && "text-muted-foreground",
                )}
              >
                {link.text}
              </a>
            ))}
          </div>

          {header.socials && <Socials socials={header.socials} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
