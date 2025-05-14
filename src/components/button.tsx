import type { Button as ButtonType } from "@/sanity/types";
import Link from "next/link";
import { Button as ButtonComponent } from "@/components/ui/button";
import { stegaClean } from "@sanity/client/stega";

export type ButtonProps = {
  button: ButtonType;
};

export function Button({ button }: ButtonProps) {
  return (
    <ButtonComponent
      variant={stegaClean(button.variant)}
      size={stegaClean(button.size)}
      asChild
    >
      <Link href={button.link.url}>{button.link.text}</Link>
    </ButtonComponent>
  );
}
