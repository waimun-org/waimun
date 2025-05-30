"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import type { HEADER_QUERYResult } from "@/sanity/types";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Socials } from "./socials";

export type MobileNavProps = {
  header: NonNullable<HEADER_QUERYResult>;
};

export function MobileNav({ header }: MobileNavProps) {
  const pathname = usePathname();
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
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
            {header.links.map((link) => (
              <Link
                key={link._key}
                href={link.url}
                onClick={() => setOpen(false)}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                className={cn(
                  "font-medium",
                  pathname !== link.url && "text-muted-foreground"
                )}
              >
                {link.text}
              </Link>
            ))}
          </div>

          <Socials socials={header.socials} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
