import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "qs4butxl",
  dataset: "production",
  apiVersion: "2025-05-11",
  perspective: "published",
  useCdn: true,
});

const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOSTNAME_LIKE = /^(?:[a-z0-9-]+\.)+[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i;
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const HTTP_EMAIL_LIKE = /^https?:\/\/[^/\s@]+@[^/\s@]+\.[^/\s@]+(?:[/?#].*)?$/i;

function isBlankPortableTextBlock(block) {
  if (block?._type !== "block" || !Array.isArray(block.children)) {
    return false;
  }

  const text = block.children
    .filter(
      (child) => child?._type === "span" && typeof child.text === "string",
    )
    .map((child) => child.text)
    .join("");

  return text.trim().length === 0;
}

function formatPath(parts) {
  return parts
    .map((part, index) =>
      typeof part === "number"
        ? `[${part}]`
        : `${index === 0 ? "" : "."}${part}`,
    )
    .join("");
}

function inspect(value, path, findings) {
  if (Array.isArray(value)) {
    const isPortableText = value.some((item) => item?._type === "block");

    if (
      isPortableText &&
      (isBlankPortableTextBlock(value[0]) ||
        isBlankPortableTextBlock(value[value.length - 1]))
    ) {
      findings.push({
        kind: "portable-text-boundary-whitespace",
        path: formatPath(path),
      });
    }

    value.forEach((item, index) => inspect(item, [...path, index], findings));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const childPath = [...path, key];

    if (key === "url" && typeof child === "string") {
      const trimmed = child.trim();

      if (
        !HAS_SCHEME.test(trimmed) &&
        (EMAIL_LIKE.test(trimmed) || HOSTNAME_LIKE.test(trimmed))
      ) {
        findings.push({
          kind: "url-needs-protocol",
          path: formatPath(childPath),
          value: child,
        });
      } else if (HTTP_EMAIL_LIKE.test(trimmed)) {
        findings.push({
          kind: "malformed-email-url",
          path: formatPath(childPath),
          value: child,
        });
      }
    }

    inspect(child, childPath, findings);
  }
}

const documents = await client.fetch(
  '*[_type in ["page", "event", "header", "footer"]]',
);
const results = [];

for (const document of documents) {
  const findings = [];
  inspect(document, [], findings);

  if (findings.length > 0) {
    results.push({
      id: document._id,
      type: document._type,
      findings,
    });
  }
}

console.log(
  `Audited ${documents.length} published document${documents.length === 1 ? "" : "s"}.`,
);

if (results.length === 0) {
  console.log("No malformed URL or Portable Text fields found.");
} else {
  for (const result of results) {
    console.log(`\n${result.type} ${result.id}`);

    for (const finding of result.findings) {
      const value = finding.value ? `: ${JSON.stringify(finding.value)}` : "";
      console.log(`  - ${finding.kind} at ${finding.path}${value}`);
    }
  }

  const count = results.reduce(
    (total, result) => total + result.findings.length,
    0,
  );
  console.log(
    `\nFound ${count} issue${count === 1 ? "" : "s"} in ${results.length} document${results.length === 1 ? "" : "s"}.`,
  );
}
