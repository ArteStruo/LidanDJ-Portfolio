import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryMediaGrid } from "@/components/gallery/GalleryMediaGrid";
import { galleryMedia } from "@/lib/gallery-media";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <GalleryHeader />
        <GalleryMediaGrid media={galleryMedia} />

      </div>
    </div>
  );
}
