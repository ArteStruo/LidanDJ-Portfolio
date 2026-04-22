"use client";

import { useState } from "react";

export function VideoCard({
  thumbnail,
  title,
  subtitle,
  duration,
  embedUrl,
  large = false,
}: {
  thumbnail: string;
  title: string;
  subtitle: string;
  duration: string;
  embedUrl?: string;
  large?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative w-full h-full group rounded-[16px] overflow-hidden bg-black ${large ? "cursor-pointer" : "cursor-pointer"}`}>
      {playing && embedUrl ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`${embedUrl}?autoplay=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-[rgba(255,0,63,0.06)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
            aria-label={`Play ${title}`}
          >
            <div className={`${large ? "size-20" : "size-14"} rounded-full bg-[#ff003f]/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff003f] shadow-[0_0_40px_rgba(255,0,63,0.4)]`}>
              <svg
                className={large ? "size-8 ml-1" : "size-6 ml-0.5"}
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>

          {/* Video badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[rgba(255,0,63,0.4)]">
            <div className="size-1.5 rounded-full bg-[#ff003f] animate-pulse" />
            <span
              className="text-[10px] tracking-[2px] uppercase text-white"
              style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
            >
              Video
            </span>
          </div>

          {/* Duration badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span
              className="text-[11px] text-white tabular-nums"
              style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
            >
              {duration}
            </span>
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
            <p
              className={`text-white mb-0.5 ${large ? "text-[20px]" : "text-[15px]"}`}
              style={{ fontFamily: "var(--font-bebas)", letterSpacing: "1px" }}
            >
              {title}
            </p>
            <p
              className="text-[11px] tracking-[1.5px] uppercase text-[rgba(255,255,255,0.55)]"
              style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
            >
              {subtitle}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
