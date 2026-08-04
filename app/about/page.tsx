import type { Metadata } from "next";

import AboutHero from "@/components/about/AboutHero";
import DualIdentitySplit from "@/components/about/DualIdentitySplit";
import TransformationBridge from "@/components/about/TransformationBridge";
import PhilosophySection from "@/components/about/PhilosophySection";
import AboutClosingCTA from "@/components/about/AboutClosingCTA";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.lidanmusic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    "About DJ Lidan (Nadil Kottegoda) | Progressive House DJ & Electronic Music Producer",

  description:
    "Learn more about DJ Lidan (Nadil Kottegoda), a Colombo-based Sri Lankan progressive house and underground electronic music producer and DJ. Discover his musical journey, artistic philosophy, influences, live performances, and passion for creating immersive electronic music experiences.",

  keywords: [
    "About DJ Lidan",
    "Nadil Kottegoda",
    "Nadil Nimnaka",
    "DJ Lidan Biography",
    "Sri Lankan DJ",
    "Colombo DJ",
    "Electronic Music Producer",
    "Progressive House Producer",
    "Progressive House DJ",
    "Underground Electronic Music",
    "Music Producer Sri Lanka",
    "Electronic Artist",
    "Hernan Cattaneo",
    "Kyotto",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    siteName: "DJ Lidan",

    title:
      "About DJ Lidan (Nadil Kottegoda) | Progressive House DJ & Electronic Music Producer",

    description:
      "Discover the story of DJ Lidan, his creative identity, musical influences, progressive house journey, and passion for immersive electronic music.",

    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "DJ Lidan - About",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "About DJ Lidan",

    description:
      "Discover the story behind Colombo-based progressive house DJ and electronic music producer DJ Lidan.",

    images: ["/preview.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <AboutHero />
      <DualIdentitySplit />
      <TransformationBridge />
      <PhilosophySection />
      <AboutClosingCTA />
    </main>
  );
}