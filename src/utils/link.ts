export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function getLinkProps(href: string) {
  if (!isExternalHref(href)) {
    return { href };
  }

  return {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
  } as const;
}
