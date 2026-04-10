import { RefObject } from "react";
import { FadeInUp } from "@/components/animations/FadeInUp";
import { buildWidgetUrl } from "@/lib/soundcloud/buildWidgetUrl";

type SoundCloudPlayerProps = {
  widgetRef: RefObject<HTMLIFrameElement | null>;
};

export function SoundCloudPlayer({ widgetRef }: SoundCloudPlayerProps) {
  return (
    <FadeInUp
      yOffset={30}
      duration={0.8}
      delay={0.15}
      className="relative rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_30px_80px_rgba(0,0,0,0.6)] mb-10"
    >
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[rgba(255,0,63,0.08)] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[rgba(255,0,63,0.06)] blur-[80px] pointer-events-none" />

      <iframe
        ref={widgetRef}
        title="DJ Lidan — SoundCloud"
        width="100%"
        height="500"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={buildWidgetUrl("https://soundcloud.com/nadil-nimnaka", {
          auto_play: false,
          color: "#ff003f",
          show_user: true,
          visual: true,
        })}
        className="block w-full h-[340px] sm:h-[500px] relative z-10"
      />
    </FadeInUp>
  );
}
