"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { Button } from "./ui/button";
import Link from "next/link";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <Button variant="outline" asChild className="fixed right-4 bottom-4">
      <Link href="/api/draft-mode/disable">Disable Draft Mode</Link>
    </Button>
  );
}
