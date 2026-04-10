"use client";

import { useState } from "react";
import { BioStats } from "@/components/music/BioStats";
import { FeaturedTracks } from "@/components/music/FeaturedTracks";
import { MusicHeader } from "@/components/music/MusicHeader";
import { SoundCloudPlayer } from "@/components/music/SoundCloudPlayer";
import { StreamingPlatforms } from "@/components/music/StreamingPlatforms";
import { useSoundCloudWidget } from "@/lib/soundcloud/useSoundCloudWidget";

const setsData = [
  {
    id: "closing",
    title: "Closing",
    url: "https://soundcloud.com/nadil-nimnaka/sets/closing",
    genre: "DJ Set",
    plays: "N/A",
  },
  {
    id: "next-morning",
    title: "Next Morning",
    url: "https://soundcloud.com/nadil-nimnaka/sets/next-morning",
    genre: "DJ Set",
    plays: "N/A",
  },
  {
    id: "journey-1",
    title: "Journey 1",
    url: "https://soundcloud.com/nadil-nimnaka/sets/journey-1",
    genre: "DJ Set",
    plays: "N/A",
  },
  {
    id: "hunter",
    title: "Hunter",
    url: "https://soundcloud.com/nadil-nimnaka/sets/hunter",
    genre: "DJ Set",
    plays: "N/A",
  },
  {
    id: "new-new",
    title: "New New",
    url: "https://soundcloud.com/nadil-nimnaka/sets/new-new",
    genre: "DJ Set",
    plays: "N/A",
  },
];

const platforms = [
  {
    label: "SoundCloud",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.175 12.225c-.015-.067-.025-.136-.025-.207 0-.458.37-.83.826-.83.327 0 .612.192.753.475l.447-.203c-.21-.434-.651-.724-1.2-.724-.732 0-1.326.596-1.326 1.33 0 .734.594 1.33 1.326 1.33.548 0 .988-.29 1.2-.723l-.447-.203c-.14.283-.426.475-.753.475-.456 0-.826-.372-.826-.83v-.023h.025zm3.3.623c-.27 0-.49-.22-.49-.49s.22-.49.49-.49c.27 0 .49.22.49.49s-.22.49-.49.49zm0-1.48c-.547 0-.99.444-.99.99 0 .546.443.99.99.99s.99-.444.99-.99c0-.546-.443-.99-.99-.99zm1.65.49c0-.27.22-.49.49-.49s.49.22.49.49-.22.49-.49.49-.49-.22-.49-.49zm-.5 0c0 .546.443.99.99.99s.99-.444.99-.99c0-.546-.443-.99-.99-.99s-.99.444-.99.99zm6.35-3.07c-.15 0-.27.12-.27.27v4.56c0 .15.12.27.27.27s.27-.12.27-.27v-4.56c0-.15-.12-.27-.27-.27zm1.5.99c-.15 0-.27.12-.27.27v3.57c0 .15.12.27.27.27s.27-.12.27-.27v-3.57c0-.15-.12-.27-.27-.27zm-3 .75c-.15 0-.27.12-.27.27v2.82c0 .15.12.27.27.27s.27-.12.27-.27v-2.82c0-.15-.12-.27-.27-.27zm1.5-.375c-.15 0-.27.12-.27.27v3.195c0 .15.12.27.27.27s.27-.12.27-.27v-3.195c0-.15-.12-.27-.27-.27z" />
      </svg>
    ),
    href: "https://soundcloud.com/nadil-nimnaka",
  },
//   {
//     label: "Mixcloud",
//     icon: (
//       <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M17.36 8.07A5.5 5.5 0 0 0 12 4a5.5 5.5 0 0 0-5.36 4.07A4 4 0 0 0 4 12a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4 4 4 0 0 0-3.64-3.93z" />
//       </svg>
//     ),
//     href: "#",
//   },
  {
    label: "Spotify",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.622.622 0 0 1 .207.857zm1.224-2.723a.78.78 0 0 1-1.072.257c-2.687-1.652-6.786-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 0 1 .257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 1 1-.543-1.792c3.563-1.081 9.484-.872 13.22 1.37a.937.937 0 0 1-.059 1.578z" />
      </svg>
    ),
    href: "#",
  },
];

const bioStats = [
  { value: "12hr", label: "Marathon Sets", desc: "Non-stop underground journeys" },
  { value: "100+", label: "Live Performances", desc: "Across Sri Lanka & abroad" },
  { value: "COL", label: "Based in Colombo", desc: "Sri Lanka's electronic capital" },
];

export default function MusicPage() {
  const [tracks] = useState<typeof setsData>(setsData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSoundIndex, setCurrentSoundIndex] = useState(-1);

  const { widgetRef, play, pause, load } = useSoundCloudWidget({
    events: {
      onPlay: () => {
        setIsPlaying(true);
      },
      onPause: () => setIsPlaying(false),
      onFinish: () => setIsPlaying(false),
    },
  });

  const onTrackClick = (index: number) => {
    if (currentSoundIndex === index) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      setCurrentSoundIndex(index);
      load(tracks[index].url, { auto_play: true, color: "#ff003f", visual: true, show_user: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20">
      <div className="max-w-[1108px] mx-auto px-6">
        <MusicHeader />
        <SoundCloudPlayer widgetRef={widgetRef} />
        <StreamingPlatforms platforms={platforms} />
        <FeaturedTracks
          tracks={tracks}
          currentSoundIndex={currentSoundIndex}
          isPlaying={isPlaying}
          onTrackClick={onTrackClick}
        />
        <BioStats stats={bioStats} />
      </div>
    </div>
  );
}
