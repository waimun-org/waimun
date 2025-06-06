import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY, HEADER_QUERY } from "@/sanity/lib/queries";
import type { FOOTER_QUERYResult, HEADER_QUERYResult } from "@/sanity/types";

async function getLayoutData(): Promise<{
  header: HEADER_QUERYResult;
  footer: FOOTER_QUERYResult;
}> {
  const [header, footer] = await Promise.all([
    client.fetch<HEADER_QUERYResult>(HEADER_QUERY),
    client.fetch<FOOTER_QUERYResult>(FOOTER_QUERY),
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
        <div className="flex-1">{children}</div>
        <Footer footer={footer} />
      </div>

      <Toaster />
    </>
  );
}
