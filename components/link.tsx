import type { Link as LinkType } from "@/sanity/types";
import LinkComponent from "next/link";

export type LinkProps = {
  link: LinkType;
};

export function Link({ link }: LinkProps) {
  return <LinkComponent href={link.url}>{link.text}</LinkComponent>;
}
