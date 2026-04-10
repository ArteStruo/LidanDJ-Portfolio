import { FadeInUp } from "@/components/animations/FadeInUp";
import svgPaths from "@/lib/svg-paths";

type Track = {
  id: string;
  title: string;
  url: string;
  genre: string;
  plays: string;
};

type FeaturedTracksProps = {
  tracks: Track[];
  currentSoundIndex: number;
  isPlaying: boolean;
  onTrackClick: (index: number) => void;
};

export function FeaturedTracks({ tracks, currentSoundIndex, isPlaying, onTrackClick }: FeaturedTracksProps) {
  return (
    <FadeInUp duration={0.6} delay={0.4}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="size-5 flex items-center justify-center">
            <svg className="w-full h-full" fill="none" viewBox="0 0 21.425 24">
              <path d={svgPaths.p216aaf80} stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78542" />
              <path d={svgPaths.p39e0fc0} stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78542" />
              <path d={svgPaths.p12e0fc00} stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78542" />
            </svg>
          </div>
          <h2 className="text-[22px] text-white uppercase" style={{ fontFamily: "var(--font-bebas)", letterSpacing: "1px" }}>
            Featured Tracks
          </h2>
        </div>
        <a
          href="https://soundcloud.com/nadil-nimnaka"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[#ff003f] hover:gap-2.5 transition-all duration-300"
        >
          <span className="text-[12px] tracking-[1.5px] uppercase" style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}>
            All Tracks
          </span>
          <svg className="size-4" fill="none" viewBox="0 0 16 16">
            <path d="M3.33333 8H12.6667" stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d="M8.66667 4L12.6667 8L8.66667 12" stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </a>
      </div>

      <div className="border border-[rgba(255,255,255,0.06)] rounded-[18px] overflow-hidden">
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <FadeInUp
              key={track.id}
              yOffset={0}
              duration={0.4}
              delay={0.5 + index * 0.08}
              className={`flex items-center justify-between px-6 py-4 group cursor-pointer transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] ${
                index !== tracks.length - 1 ? "border-b border-[rgba(255,255,255,0.05)]" : ""
              }`}
            >
              <div className="flex items-center gap-5 min-w-0" onClick={() => onTrackClick(index)}>
                <span
                  className={`w-6 text-center text-[13px] shrink-0 ${
                    currentSoundIndex === index && isPlaying
                      ? "text-[#ff003f] font-bold"
                      : "text-[#6a7282] group-hover:hidden"
                  }`}
                  style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
                >
                  {currentSoundIndex === index && isPlaying ? (
                    <span className="flex items-center justify-center gap-1 h-3">
                      <span className="w-[2px] h-full bg-[#ff003f] animate-[pulse_1s_ease-in-out_infinite]" />
                      <span className="w-[2px] h-[60%] bg-[#ff003f] animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
                      <span className="w-[2px] h-[80%] bg-[#ff003f] animate-[pulse_0.8s_ease-in-out_infinite_0.4s]" />
                    </span>
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <button
                  className={`w-6 ${
                    currentSoundIndex === index && isPlaying ? "hidden" : "hidden group-hover:flex"
                  } items-center justify-center shrink-0`}
                >
                  <svg className="size-4" fill="none" viewBox="0 0 13.3333 16.6667">
                    <path
                      d={svgPaths.p1f102e00}
                      stroke="#ff003f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                </button>
                <div className="min-w-0">
                  <span
                    className={`block text-[15px] transition-colors duration-200 truncate ${
                      currentSoundIndex === index ? "text-[#ff003f]" : "text-[#e5e7eb] group-hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
                  >
                    {track.title}
                  </span>
                  <span
                    className="block text-[11px] tracking-[1.4px] uppercase text-[#6a7282] mt-0.5"
                    style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
                  >
                    {track.genre || "Electronic"}
                  </span>
                </div>
              </div>
            </FadeInUp>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-[#6a7282] text-sm" style={{ fontFamily: "var(--font-space)" }}>
            Loading tracks from SoundCloud...
          </div>
        )}
      </div>
    </FadeInUp>
  );
}
