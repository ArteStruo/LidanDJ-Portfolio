import type { Metadata } from "next";

import { HomeEventsSection } from "@/components/home/HomeEventsSection";
import { HomeHero } from "@/components/home/HomeHero";
import { readEventsData } from "@/lib/content-store";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"; // TODO: set NEXT_PUBLIC_SITE_URL in .env.local

export const metadata: Metadata = {
  title: {
    absolute: "DJ Lidan — Progressive House",
  },
  description:
    "Official site of DJ Lidan. Explore Progressive House mixes, latest event appearances, gallery moments, and booking information.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DJ Lidan — Progressive House",
    description:
      "Official site of DJ Lidan. Explore Progressive House mixes, latest event appearances, gallery moments, and booking information.",
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
    title: "DJ Lidan — Progressive House",
    description:
      "Official site of DJ Lidan. Explore Progressive House mixes, latest event appearances, gallery moments, and booking information.",
    images: ["/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { heroTags, events } = await readEventsData();

  return (
    <div className="bg-[#050505]">
      <HomeHero tags={heroTags} />
      <HomeEventsSection events={events} />
    </div>
  );
}
