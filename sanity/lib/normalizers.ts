const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOSTNAME_LIKE = /^(?:[a-z0-9-]+\.)+[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i;

export type PortableTextSpan = {
  _type?: string;
  text?: string;
  [key: string]: unknown;
};

export type PortableTextBlock = {
  _type?: string;
  children?: PortableTextSpan[];
  [key: string]: unknown;
};

export function normalizeUrl(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  if (HAS_SCHEME.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return trimmed;
  }

  if (EMAIL_LIKE.test(trimmed)) {
    return `mailto:${trimmed}`;
  }

  if (HOSTNAME_LIKE.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

function isTextSpan(child: PortableTextSpan): child is PortableTextSpan & {
  text: string;
} {
  return child._type === "span" && typeof child.text === "string";
}

export function getBlockText(block: PortableTextBlock): string {
  if (block._type !== "block" || !Array.isArray(block.children)) {
    return "";
  }

  return block.children
    .filter(isTextSpan)
    .map((child) => child.text)
    .join("");
}

export function isBlankPortableTextBlock(block: PortableTextBlock): boolean {
  return block._type === "block" && getBlockText(block).trim().length === 0;
}

export function trimPortableTextBlocks<T extends PortableTextBlock>(
  blocks: T[] | undefined,
): T[] | undefined {
  if (!blocks) {
    return blocks;
  }

  const next = [...blocks];

  while (next.length > 0 && isBlankPortableTextBlock(next[0])) {
    next.shift();
  }

  while (next.length > 0 && isBlankPortableTextBlock(next[next.length - 1])) {
    next.pop();
  }

  return next;
}
