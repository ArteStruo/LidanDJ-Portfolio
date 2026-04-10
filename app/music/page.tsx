"use client";

import { useState } from "react";
import { FadeInUp } from "@/components/animations/FadeInUp";
import svgPaths from "@/lib/svg-paths";
import { useSoundCloudWidget } from "@/lib/soundcloud/useSoundCloudWidget";
import { buildWidgetUrl } from "@/lib/soundcloud/buildWidgetUrl";

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

        {/* ── PAGE HEADER ── */}
        <FadeInUp duration={0.6} className="mb-10">
          <p
            className="text-[#ff003f] tracking-[3px] uppercase text-xs mb-3"
            style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
          >
            DJ Lidan — Discography
          </p>
          <h1
            className="text-[clamp(48px,8vw,80px)] leading-none text-white uppercase"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Progressive &amp; Electronic Music
          </h1>
          <p
            className="text-[#99a1af] text-[15px] mt-3 max-w-[560px] leading-relaxed"
            style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
          >
            Stream DJ Lidan&apos;s mixes, original productions and live recordings — straight from Colombo,
            Sri Lanka&apos;s underground electronic music scene.
          </p>
        </FadeInUp>

        {/* ── SOUNDCLOUD WIDGET ── */}
        <FadeInUp
          yOffset={30}
          duration={0.8}
          delay={0.15}
          className="relative rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_30px_80px_rgba(0,0,0,0.6)] mb-10"
        >
          {/* Ambient glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[rgba(255,0,63,0.08)] blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[rgba(255,0,63,0.06)] blur-[80px] pointer-events-none" />

          {/* SoundCloud Visual Player */}
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
            className="block w-full relative z-10"
          />
        </FadeInUp>

        {/* ── STREAMING PLATFORMS ── */}
        <FadeInUp
          yOffset={16}
          duration={0.6}
          delay={0.3}
          className="flex items-center gap-3 mb-16 flex-wrap"
        >
          <span
            className="text-[11px] tracking-[2px] uppercase text-[#6a7282] mr-2"
            style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
          >
            Also on
          </span>
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] h-10 px-4 rounded-full text-white transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.15)]"
            >
              {p.icon}
              <span
                className="text-[13px] text-[#d1d5dc]"
                style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
              >
                {p.label}
              </span>
            </a>
          ))}
        </FadeInUp>

        {/* ── FEATURED TRACKS ── */}
        <FadeInUp duration={0.6} delay={0.4}>
          {/* Section label */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-5 flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 21.425 24">
                  <path d={svgPaths.p216aaf80} stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78542" />
                  <path d={svgPaths.p39e0fc0} stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78542" />
                  <path d={svgPaths.p12e0fc00} stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78542" />
                </svg>
              </div>
              <h2
                className="text-[22px] text-white uppercase"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "1px" }}
              >
                Featured Tracks
              </h2>
            </div>
            <a
              href="https://soundcloud.com/nadil-nimnaka"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#ff003f] hover:gap-2.5 transition-all duration-300"
            >
              <span
                className="text-[12px] tracking-[1.5px] uppercase"
                style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
              >
                All Tracks
              </span>
              <svg className="size-4" fill="none" viewBox="0 0 16 16">
                <path d="M3.33333 8H12.6667" stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M8.66667 4L12.6667 8L8.66667 12" stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </a>
          </div>

          {/* Track rows */}
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
                  {/* Left: number + title */}
                  <div className="flex items-center gap-5 min-w-0" onClick={() => onTrackClick(index)}>
                    <span
                      className={`w-6 text-center text-[13px] shrink-0 ${
                        currentSoundIndex === index && isPlaying ? "text-[#ff003f] font-bold" : "text-[#6a7282] group-hover:hidden"
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
                    <button className={`w-6 ${currentSoundIndex === index && isPlaying ? 'hidden' : 'hidden group-hover:flex'} items-center justify-center shrink-0`}>
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

                  {/* Right: plays + date + duration */}
                  {/* <div className="flex items-center gap-6 shrink-0">
                    <span
                      className="text-[12px] text-[#6a7282] hidden sm:block"
                      style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
                    >
                      {track.plays} plays
                    </span>
                  </div> */}
                </FadeInUp>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-[#6a7282] text-sm" style={{ fontFamily: "var(--font-space)" }}>
                Loading tracks from SoundCloud...
              </div>
            )}
          </div>
        </FadeInUp>

        {/* ── BIO STRIP ── */}
        <FadeInUp duration={0.6} delay={0.7} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { value: "12hr", label: "Marathon Sets", desc: "Non-stop underground journeys" },
            { value: "100+", label: "Live Performances", desc: "Across Sri Lanka & abroad" },
            { value: "COL", label: "Based in Colombo", desc: "Sri Lanka's electronic capital" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-[rgba(255,255,255,0.07)] rounded-[16px] px-6 py-5 flex items-center gap-5"
            >
              <div
                className="text-[42px] text-[#ff003f] leading-none shrink-0"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {stat.value}
              </div>
              <div>
                <div
                  className="text-[13px] text-white mb-0.5"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-[12px] text-[#6a7282]"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
                >
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </FadeInUp>
      </div>
    </div>
  );
}
