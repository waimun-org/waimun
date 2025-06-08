import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { sanityFetch } from "@/sanity/lib/client";
import { FOOTER_QUERY, HEADER_QUERY } from "@/sanity/lib/queries";
import type { FOOTER_QUERYResult, HEADER_QUERYResult } from "@/sanity/types";

async function getLayoutData(): Promise<{
  header: HEADER_QUERYResult;
  footer: FOOTER_QUERYResult;
}> {
  const [header, footer] = await Promise.all([
    sanityFetch<HEADER_QUERYResult>({
      query: HEADER_QUERY,
      tags: ["header"],
    }).catch((error) => {
      console.error("Failed to fetch header:", error);
      return null;
    }),
    sanityFetch<FOOTER_QUERYResult>({
      query: FOOTER_QUERY,
      tags: ["footer"],
    }).catch((error) => {
      console.error("Failed to fetch footer:", error);
      return null;
    }),
  ]);

  return { header, footer };
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { header, footer } = await getLayoutData();

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header header={header} />
        <main className="flex-1">{children}</main>
        <Footer footer={footer} />
      </div>

      <Toaster />
    </>
  );
}
