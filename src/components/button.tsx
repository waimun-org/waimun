import type { Button as ButtonType } from "@/sanity/types";
import { Button as ButtonComponent } from "@/components/ui/button";
import { getLinkProps } from "@/utils/link";

export type ButtonProps = {
  button: ButtonType;
};

export function Button({ button }: ButtonProps) {
  return (
    <ButtonComponent variant={button.variant} size={button.size} asChild>
      <a {...getLinkProps(button.link.url)}>{button.link.text}</a>
    </ButtonComponent>
  );
}
