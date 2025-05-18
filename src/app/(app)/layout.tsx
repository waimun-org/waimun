import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY, NAVIGATION_QUERY } from "@/sanity/lib/queries";
import type {
  FOOTER_QUERYResult,
  NAVIGATION_QUERYResult
} from "@/sanity/types";

async function getNavigation(): Promise<NAVIGATION_QUERYResult> {
  return await client.fetch(NAVIGATION_QUERY);
}

async function getFooter(): Promise<FOOTER_QUERYResult> {
  return await client.fetch(FOOTER_QUERY);
}

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation();
  const footer = await getFooter();

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer footer={footer} />
      </div>

      <Toaster />
    </>
  );
}
