import { DisableDraftMode } from "@/components/disable-draft-mode";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY, NAVIGATION_QUERY } from "@/sanity/lib/queries";
import type {
  FOOTER_QUERYResult,
  NAVIGATION_QUERYResult,
} from "@/sanity/types";
import { TRPCReactProvider } from "@/trpc/react";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

async function getNavigation(): Promise<NAVIGATION_QUERYResult> {
  const result = await sanityFetch({
    query: NAVIGATION_QUERY,
    tags: ["navigation"],
  });

  return result.data as NAVIGATION_QUERYResult;
}

async function getFooter(): Promise<FOOTER_QUERYResult> {
  const result = await sanityFetch({
    query: FOOTER_QUERY,
    tags: ["footer"],
  });

  return result.data as FOOTER_QUERYResult;
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation();
  const footer = await getFooter();

  return (
    <TRPCReactProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer footer={footer} />
      </div>

      <Toaster />

      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </TRPCReactProvider>
  );
}
