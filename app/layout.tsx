import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { AppShell } from "@/components/AppShell";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"; // TODO: set NEXT_PUBLIC_SITE_URL in .env.local

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DJ Lidan — Progressive House",
    template: "%s | DJ Lidan",
  },
  description:
    "Progressive House DJ based in Sri Lanka. Discover mixes, event updates, gallery highlights, and booking details.",
  openGraph: {
    type: "website",
    siteName: "DJ Lidan",
    title: "DJ Lidan — Progressive House",
    description:
      "Progressive House DJ based in Sri Lanka. Discover mixes, event updates, gallery highlights, and booking details.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Lidan — Progressive House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Lidan — Progressive House",
    description:
      "Progressive House DJ based in Sri Lanka. Discover mixes, event updates, gallery highlights, and booking details.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <AppShell>{children}</AppShell>
        <Toaster theme="dark" position="top-right" richColors />
      </body>
    </html>
  );
}