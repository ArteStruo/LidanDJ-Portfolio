import type { Metadata } from "next";

import { HomeEventsSection } from "@/components/home/HomeEventsSection";
import { HomeHero } from "@/components/home/HomeHero";
import { readEventsData } from "@/lib/content-store";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.lidanmusic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    absolute:
      "DJ Lidan (Nadil Kottegoda) | Progressive House & Electronic Music Producer | Official Website",
  },

  description:
    "Official website of DJ Lidan (Nadil Kottegoda), a Colombo-based Sri Lankan progressive house and underground electronic music producer and DJ. Explore original music, DJ mixes, live performances, upcoming events, galleries, videos, and book DJ Lidan for clubs, festivals, nightlife, corporate events, and private functions across Sri Lanka.",

  keywords: [
    "DJ Lidan",
    "Lidan",
    "Nadil Kottegoda",
    "Nadil Nimnaka",
    "Sri Lanka DJ",
    "Colombo DJ",
    "Electronic Music Producer",
    "Progressive House",
    "Progressive House DJ",
    "Progressive House Producer",
    "Underground Electronic Music",
    "Melodic House",
    "House Music",
    "EDM Sri Lanka",
    "Electronic Dance Music",
    "DJ Booking Sri Lanka",
    "Hire DJ Sri Lanka",
    "Club DJ",
    "Festival DJ",
    "Nightlife DJ",
    "Corporate Event DJ",
    "Private Event DJ",
    "SoundCloud Artist",
    "Music Producer Sri Lanka",
    "Electronic Artist",
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
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DJ Lidan",

    title:
      "DJ Lidan (Nadil Kottegoda) | Progressive House & Electronic Music Producer",

    description:
      "Official website of DJ Lidan, a Colombo-based Sri Lankan progressive house and underground electronic music producer. Listen to original music, discover upcoming events, browse galleries, watch performances, and book DJ Lidan for clubs, festivals, and private events.",

    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "DJ Lidan performing live in Sri Lanka",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "DJ Lidan | Progressive House & Electronic Music Producer",

    description:
      "Official website of DJ Lidan featuring progressive house music, DJ mixes, live events, galleries, and booking information.",

    creator: "@lidan.music",

    images: ["/preview.png"],
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { heroTags, events } = await readEventsData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",

    name: "DJ Lidan",

    alternateName: [
      "Nadil Kottegoda",
      "Nadil Nimnaka",
    ],

    url: SITE_URL,

    image: `${SITE_URL}/preview.png`,

    description:
      "DJ Lidan is a Colombo-based Sri Lankan progressive house and underground electronic music producer and DJ known for immersive sound design, melodic storytelling, evolving soundscapes, and emotionally driven electronic music. He performs at clubs, festivals, nightlife venues, and private events across Sri Lanka.",

    nationality: "Sri Lankan",

    homeLocation: {
      "@type": "Place",
      name: "Colombo, Sri Lanka",
    },

    jobTitle: [
      "DJ",
      "Electronic Music Producer",
      "Progressive House Producer",
    ],

    genre: [
      "Progressive House",
      "Underground Electronic",
      "Electronic Dance Music",
      "Melodic House",
    ],

    knowsAbout: [
      "Progressive House",
      "Electronic Music",
      "Music Production",
      "DJ Performance",
      "Sound Design",
      "Festival Performance",
      "Live DJ Sets",
    ],

    sameAs: [
      "https://www.instagram.com/lidan.music",
      "https://soundcloud.com/nadil-nimnaka",
      "https://web.facebook.com/people/Nadil-Kottegoda/100026373379257/?locale=zh_CN",
      "https://www.tiktok.com/@lidan.music2?_r=1&_t=ZS-98bE6ofeKsX",
    ],

    performerIn: [
      {
        "@type": "MusicEvent",
        name: "White Heaven",
      },
      {
        "@type": "MusicEvent",
        name: "Yaga Day 2: Surge Continuum",
      },
      {
        "@type": "MusicEvent",
        name: "Fern Social",
      },
      {
        "@type": "MusicEvent",
        name: "Echo Draft: Gracias",
      },
      {
        "@type": "MusicEvent",
        name: "Urban Beats",
      },
      {
        "@type": "MusicEvent",
        name: "Dream Connection",
      },
    ],

    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Professional DJ Performance",
        description:
          "Available for clubs, festivals, nightlife venues, corporate events, private parties, weddings, and special events throughout Sri Lanka.",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="bg-[#050505]">
        <HomeHero tags={heroTags} />
        <HomeEventsSection events={events} />
      </div>
    </>
  );
}