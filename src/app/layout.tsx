import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerUnregister from "./components/ServiceWorkerUnregister";
import { getLocale } from "gt-next/server";
import { GTProvider } from "gt-next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Tharun Kumar",
  description: "Senior at Princeton University",
  icons: {
    icon: "/favico.ico"
  },
  openGraph: {
    title: "Tharun Kumar",
    description: "Senior at Princeton University",
    images: [
    {
      url: "/preview.png",
      width: 1200,
      height: 630,
      alt: "Tharun Kumar"
    }],

    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tharun Kumar",
    description: "Senior at Princeton University",
    images: ["/preview.png"]
  }
};

export default async function RootLayout({
  children


}: Readonly<{children: React.ReactNode;}>) {
  return (
  <html lang={await getLocale()}>
      <body className={`${inter.variable} antialiased`}><GTProvider>
        <ServiceWorkerUnregister />
        {children}
      </GTProvider></body>
    </html>
  );
}