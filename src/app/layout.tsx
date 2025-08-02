import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tharun Kumar",
  description: "Senior at Princeton University",
  icons: {
    icon: "/favico.ico",
  },
  openGraph: {
    title: "Tharun Kumar",
    description: "Senior at Princeton University",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Tharun Kumar",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tharun Kumar",
    description: "Senior at Princeton University",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
