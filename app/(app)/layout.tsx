import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY, NAVIGATION_QUERY } from "@/sanity/lib/queries";
import type {
  FOOTER_QUERYResult,
  NAVIGATION_QUERYResult
} from "@/sanity/types";

async function getLayoutData(): Promise<{
  navigation: NAVIGATION_QUERYResult;
  footer: FOOTER_QUERYResult;
}> {
  const [navigation, footer] = await Promise.all([
    client.fetch<NAVIGATION_QUERYResult>(
      NAVIGATION_QUERY,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 300 }
      }
    ),
    client.fetch<FOOTER_QUERYResult>(
      FOOTER_QUERY,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 300 }
      }
    )
  ]);

  return { navigation, footer };
}

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { navigation, footer } = await getLayoutData();

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
