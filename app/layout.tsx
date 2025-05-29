import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale}>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Script
          src="/script.js"
          data-website-id="f5c03301-b2d8-4127-82e0-b32fca3d3268"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
