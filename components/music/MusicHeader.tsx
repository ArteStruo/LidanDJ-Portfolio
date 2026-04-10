import { FadeInUp } from "@/components/animations/FadeInUp";

export function MusicHeader() {
  return (
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
  );
}
