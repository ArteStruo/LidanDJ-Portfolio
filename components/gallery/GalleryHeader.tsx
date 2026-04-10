import { FadeInUp } from "@/components/animations/FadeInUp";

export function GalleryHeader() {
  return (
    <FadeInUp duration={0.6} className="mb-10">
      <p
        className="text-[#ff003f] tracking-[3px] uppercase text-xs mb-3"
        style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
      >
        DJ Lidan · Sri Lanka
      </p>
      <h1
        className="text-[clamp(48px,8vw,80px)] leading-none text-white uppercase"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        Moments
      </h1>
      <p
        className="text-[#99a1af] text-[14px] mt-3 max-w-[480px] leading-relaxed"
        style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
      >
        Behind the decks — photos and video from DJ Lidan&apos;s progressive and electronic music performances
        across Sri Lanka.
      </p>
    </FadeInUp>
  );
}
