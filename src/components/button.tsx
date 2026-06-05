import type { Button as ButtonType } from "@/sanity/types";
import { Button as ButtonComponent } from "@/components/ui/button";

export type ButtonProps = {
  button: ButtonType;
};

export function Button({ button }: ButtonProps) {
  return (
    <ButtonComponent variant={button.variant} size={button.size} asChild>
      <a
        href={button.link.url}
        target={button.link.url.startsWith("http") ? "_blank" : undefined}
      >
        {button.link.text}
      </a>
    </ButtonComponent>
  );
}
