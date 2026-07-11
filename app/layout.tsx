import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { AppShell } from "@/components/AppShell";
import "./globals.css";

const SITE_URL = "https://www.lidanmusic.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "DJ Lidan — Progressive House DJ from Sri Lanka";
const DESCRIPTION =
  "DJ Lidan is a Progressive House DJ based in Sri Lanka. Listen to exclusive mixes, catch upcoming event dates, browse the gallery, and book for your next event.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | DJ Lidan",
  },
  description: DESCRIPTION,
  keywords: [
    "DJ Lidan",
    "Progressive House DJ",
    "Sri Lanka DJ",
    "DJ booking Sri Lanka",
    "electronic music Sri Lanka",
    "DJ mixes",
    "live DJ events",
  ],
  authors: [{ name: "DJ Lidan", url: SITE_URL }],
  creator: "DJ Lidan",
  publisher: "DJ Lidan",
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "BLZMGZuK9dHBORuKIHARth1kagN3PmHPaK-rtnKXblU",
  },
  openGraph: {
    type: "website",
    siteName: "DJ Lidan",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        // Must be an ABSOLUTE URL for link previews to work reliably
        // e.g. https://www.lidanmusic.com/og-image.png
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DJ Lidan — Progressive House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
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
      <head>
        {/* JSON-LD structured data — helps Google understand who/what this site is */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "DJ Lidan",
              url: SITE_URL,
              image: `${SITE_URL}/og-image.png`,
              genre: "Progressive House",
              description: DESCRIPTION,
              address: {
                "@type": "PostalAddress",
                addressCountry: "LK",
              },
              sameAs: [
                "https://www.instagram.com/lidan.music/",
                "https://soundcloud.com/nadil-nimnaka",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <AppShell>{children}</AppShell>
        <Toaster theme="dark" position="top-right" richColors />
      </body>
    </html>
  );
}