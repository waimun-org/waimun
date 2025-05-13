import type { Button as ButtonType } from "@/sanity/types";
import Link from "next/link";
import { Button as ButtonComponent } from "@/components/ui/button";

export type ButtonProps = {
  button: ButtonType;
};

export function Button({ button }: ButtonProps) {
  return (
    <ButtonComponent variant={button.variant} size={button.size} asChild>
      <Link href={button.link?.url ?? "#"}>{button.link?.text}</Link>
    </ButtonComponent>
  );
}
