import type { Metadata } from "next";

import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryMediaGrid } from "@/components/gallery/GalleryMediaGrid";
import { galleryMedia } from "@/lib/gallery-media";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse highlights from DJ Lidan's live performances, behind-the-scenes moments, and visual snapshots from recent shows.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | DJ Lidan",
    description:
      "Browse highlights from DJ Lidan's live performances, behind-the-scenes moments, and visual snapshots from recent shows.",
    url: "/gallery",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Lidan Gallery",
      },
    ],
  },
  twitter: {
    title: "Gallery | DJ Lidan",
    description:
      "Browse highlights from DJ Lidan's live performances, behind-the-scenes moments, and visual snapshots from recent shows.",
    images: ["/og-image.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-28 pb-16 sm:pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <GalleryHeader />
        <GalleryMediaGrid media={galleryMedia} />

      </div>
    </div>
  );
}
