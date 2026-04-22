import { FadeIn } from "@/components/animations/FadeIn";
import { FadeInUp } from "@/components/animations/FadeInUp";
import type { GalleryMediaConfig } from "@/lib/gallery-media";
import { PhotoCard } from "@/components/gallery/PhotoCard";
import { VideoCard } from "@/components/gallery/VideoCard";

type GalleryMediaGridProps = {
  media: GalleryMediaConfig;
};

export function GalleryMediaGrid({ media }: GalleryMediaGridProps) {
  return (
    <>
      <FadeIn duration={0.8} delay={0.1} className="w-full h-[360px] sm:h-[480px] lg:h-[580px] mb-4">
        <VideoCard {...media.heroVideo} />
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {media.rowTwoPhotos.map((item, i) => (
          <FadeInUp
            key={item.src}
            yOffset={24}
            duration={0.6}
            delay={0.2 + i * 0.07}
            className="h-[220px] sm:h-[280px]"
          >
            <PhotoCard {...item} />
          </FadeInUp>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <FadeIn duration={0.7} delay={0.3} className="col-span-12 sm:col-span-5 h-[360px] sm:h-[460px]">
          <PhotoCard {...media.rowThree.tallPhoto} />
        </FadeIn>
        <FadeIn duration={0.7} delay={0.35} className="col-span-12 sm:col-span-7 h-[360px] sm:h-[460px]">
          <VideoCard {...media.rowThree.secondaryVideo} />
        </FadeIn>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {media.rowFourPhotos.map((item, i) => (
          <FadeInUp
            key={item.src}
            yOffset={20}
            duration={0.5}
            delay={0.4 + i * 0.06}
            className="h-[200px] sm:h-[240px]"
          >
            <PhotoCard {...item} />
          </FadeInUp>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <FadeInUp yOffset={20} duration={0.6} delay={0.5} className="col-span-12 sm:col-span-7 h-[260px] sm:h-[320px]">
          <PhotoCard {...media.rowFive.widePhoto} />
        </FadeInUp>
        <div className="col-span-12 sm:col-span-5 grid grid-rows-2 gap-4 h-[420px] sm:h-[320px]">
          <FadeInUp yOffset={20} duration={0.6} delay={0.55} className="h-full">
            <PhotoCard {...media.rowFive.topRightPhoto} />
          </FadeInUp>
          <FadeInUp yOffset={20} duration={0.6} delay={0.6} className="h-full">
            <PhotoCard {...media.rowFive.bottomRightPhoto} />
          </FadeInUp>
        </div>
      </div>
    </>
  );
}
