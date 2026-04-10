import { ReactNode } from "react";
import { FadeInUp } from "@/components/animations/FadeInUp";

type Platform = {
  label: string;
  icon: ReactNode;
  href: string;
};

type StreamingPlatformsProps = {
  platforms: Platform[];
};

export function StreamingPlatforms({ platforms }: StreamingPlatformsProps) {
  return (
    <FadeInUp yOffset={16} duration={0.6} delay={0.3} className="flex items-center gap-3 mb-16 flex-wrap">
      <span
        className="text-[11px] tracking-[2px] uppercase text-[#6a7282] mr-2"
        style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
      >
        Also on
      </span>
      {platforms.map((platform) => (
        <a
          key={platform.label}
          href={platform.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] h-10 px-4 rounded-full text-white transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.15)]"
        >
          {platform.icon}
          <span
            className="text-[13px] text-[#d1d5dc]"
            style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
          >
            {platform.label}
          </span>
        </a>
      ))}
    </FadeInUp>
  );
}
