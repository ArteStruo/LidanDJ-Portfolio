import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryMediaGrid } from "@/components/gallery/GalleryMediaGrid";
import { galleryMedia } from "@/lib/gallery-media";

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
