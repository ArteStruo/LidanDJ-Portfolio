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

const TITLE =
  "DJ Lidan (Nadil Kottegoda) | Progressive House DJ & Electronic Music Producer Sri Lanka";

const DESCRIPTION =
  "DJ Lidan (Nadil Kottegoda) is a Colombo-based Sri Lankan progressive house DJ and underground electronic music producer. Explore original music, immersive DJ mixes, live performances, upcoming events, galleries, and book DJ Lidan for clubs, festivals, nightlife events, private parties, and corporate functions across Sri Lanka.";

const OG_IMAGE = `${SITE_URL}/preview.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: "%s | DJ Lidan",
  },

  description: DESCRIPTION,

  applicationName: "DJ Lidan",

  keywords: [
    "DJ Lidan",
    "Nadil Kottegoda",
    "Nadil Nimnaka",
    "Sri Lanka DJ",
    "Colombo DJ",
    "Progressive House DJ",
    "Progressive House Producer",
    "Electronic Music Producer Sri Lanka",
    "Underground Electronic Music",
    "Electronic Dance Music Sri Lanka",
    "House Music Sri Lanka",
    "Melodic House DJ",
    "Club DJ Sri Lanka",
    "Festival DJ Sri Lanka",
    "DJ Booking Sri Lanka",
    "Hire DJ Sri Lanka",
    "Nightlife DJ",
    "Corporate Event DJ",
    "Private Event DJ",
    "DJ Mixes",
    "SoundCloud DJ",
    "Electronic Artist Sri Lanka",
  ],

  authors: [
    {
      name: "DJ Lidan",
      url: SITE_URL,
    },
  ],

  creator: "DJ Lidan",

  publisher: "DJ Lidan",

  category: "Music",

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
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DJ Lidan - Progressive House DJ and Electronic Music Producer",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: TITLE,

    description: DESCRIPTION,

    images: [OG_IMAGE],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@graph": [
                {
                  "@type": "Person",

                  "@id": `${SITE_URL}/#person`,

                  name: "DJ Lidan",

                  alternateName: [
                    "Nadil Kottegoda",
                    "Nadil Nimnaka",
                  ],

                  url: SITE_URL,

                  image: OG_IMAGE,

                  description:
                    "DJ Lidan is a Colombo-based Sri Lankan progressive house DJ and underground electronic music producer creating immersive soundscapes, evolving melodies, and emotionally driven electronic music experiences.",

                  nationality: "Sri Lankan",

                  jobTitle: [
                    "DJ",
                    "Electronic Music Producer",
                    "Progressive House Producer",
                  ],

                  homeLocation: {
                    "@type": "Place",
                    name: "Colombo, Sri Lanka",
                  },

                  knowsAbout: [
                    "Progressive House",
                    "Electronic Music",
                    "DJ Performance",
                    "Music Production",
                    "Sound Design",
                    "Live Events",
                  ],

                  sameAs: [
                    "https://www.instagram.com/lidan.music",
                    "https://soundcloud.com/nadil-nimnaka",
                    "https://web.facebook.com/people/Nadil-Kottegoda/100026373379257/?locale=zh_CN",
                    "https://www.tiktok.com/@lidan.music2?_r=1&_t=ZS-98bE6ofeKsX",
                  ],
                },


                {
                  "@type": "MusicGroup",

                  "@id": `${SITE_URL}/#music`,

                  name: "DJ Lidan",

                  url: SITE_URL,

                  image: OG_IMAGE,

                  genre: [
                    "Progressive House",
                    "Underground Electronic",
                    "Electronic Dance Music",
                  ],

                  description: DESCRIPTION,

                  location: {
                    "@type": "Place",
                    name: "Colombo, Sri Lanka",
                  },
                },


                {
                  "@type": "ProfessionalService",

                  name: "DJ Lidan Booking",

                  url: `${SITE_URL}/contact`,

                  description:
                    "Professional DJ performances available for clubs, festivals, nightlife events, corporate functions, private parties, and special events across Sri Lanka.",

                  areaServed: {
                    "@type": "Country",
                    name: "Sri Lanka",
                  },

                  serviceType:
                    "Professional DJ Performance",
                },
              ],
            }),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <AppShell>
          {children}
        </AppShell>

        <Toaster
          theme="dark"
          position="top-right"
          richColors
        />
      </body>
    </html>
  );
}