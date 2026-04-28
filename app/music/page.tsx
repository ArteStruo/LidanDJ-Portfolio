import type { Metadata } from "next";

import { MusicPageClient } from "@/components/music/MusicPageClient";
import { readMusicData } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Music & Mixes",
  description:
    "Stream DJ Lidan's Progressive House sets and featured mixes, including guest sessions and curated underground selections.",
  alternates: {
    canonical: "/music",
  },
  openGraph: {
    title: "Music & Mixes | DJ Lidan",
    description:
      "Stream DJ Lidan's Progressive House sets and featured mixes, including guest sessions and curated underground selections.",
    url: "/music",
    images: [
      {
        url: "/og-music.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Lidan Music & Mixes",
      },
    ],
  },
  twitter: {
    title: "Music & Mixes | DJ Lidan",
    description:
      "Stream DJ Lidan's Progressive House sets and featured mixes, including guest sessions and curated underground selections.",
    images: ["/og-music.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function MusicPage() {
  const { tracks } = await readMusicData();

  return <MusicPageClient tracks={tracks} />;
}
