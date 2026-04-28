import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { FadeInUp } from "@/components/animations/FadeInUp";

type HomeHeroProps = {
  tags: string[];
};

export function HomeHero({ tags }: HomeHeroProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/Studio-2.jpeg"
          alt="DJ Lidan"
          fill
          priority
          className="object-cover object-[70%_20%] scale-105"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10">
        {/* Dark overlay (reduced for better image visibility) */}
        <div className="absolute inset-0 bg-[#111] opacity-40" />

        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[rgba(5,5,5,0.6)] to-transparent" />

        {/* Subtle brand tint */}
        <div className="absolute inset-0 bg-[rgba(255,0,63,0.05)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="max-w-[900px] text-center pt-24 sm:pt-20">

          <FadeInUp
            delay={0.1}
            className="text-[#ff003f] tracking-[3px] sm:tracking-[4px] uppercase mb-5 sm:mb-6 text-[11px] sm:text-sm"
            style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
          >
            DJ Lidan · Colombo, Sri Lanka
          </FadeInUp>

          <FadeInUp delay={0.2} duration={0.8} yOffset={40}>
            <h1
              className="text-[clamp(46px,12vw,128px)] leading-[0.92] tracking-[-1px] sm:tracking-[-2px] text-white uppercase"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              Deep &amp;
            </h1>
            <h1
              className="text-[clamp(46px,12vw,128px)] leading-[0.92] tracking-[-1px] sm:tracking-[-2px] uppercase bg-clip-text text-transparent"
              style={{
                fontFamily: "var(--font-bebas)",
                backgroundImage:
                  "linear-gradient(90deg, rgb(255, 0, 63) 0%, rgb(255, 77, 121) 100%)",
              }}
            >
              Atmospheric
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.5} className="mt-8 sm:mt-10 mb-10 sm:mb-14 max-w-[600px] mx-auto">
            <p
              className="text-[17px] sm:text-[20px] leading-[28px] sm:leading-[32px] text-[#d1d5dc] mb-3"
              style={{ fontFamily: "var(--font-space)", fontWeight: 300 }}
            >
              Sri Lanka&apos;s foremost progressive and electronic music DJ.
            </p>
            <p
              className="text-[14px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#99a1af]"
              style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
            >
              Crafting hypnotic underground journeys from the heart of Colombo — deep progressive house,
              atmospheric electronic music, and relentless marathon sets.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.7} className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link
              href="/music"
              className="bg-[#ff003f] h-[50px] sm:h-[54px] px-6 sm:px-8 rounded-full flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <svg className="size-5" fill="none" viewBox="0 0 20 20">
                <path
                  d="M9.5 4.16667V15.8333M9.5 15.8333C9.5 17.2141 8.38071 18.3333 7 18.3333C5.61929 18.3333 4.5 17.2141 4.5 15.8333C4.5 14.4526 5.61929 13.3333 7 13.3333C8.38071 13.3333 9.5 14.4526 9.5 15.8333ZM15.5 14.1667V4.16667M15.5 14.1667C15.5 15.5474 14.3807 16.6667 13 16.6667C11.6193 16.6667 10.5 15.5474 10.5 14.1667C10.5 12.7859 11.6193 11.6667 13 11.6667C14.3807 11.6667 15.5 12.7859 15.5 14.1667Z"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-[14px] tracking-[1.6px] uppercase text-white"
                style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
              >
                Listen Now
              </span>
            </Link>

            <a
              href="#events"
              className="h-[50px] sm:h-[54px] px-6 sm:px-8 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.2)] transition-all duration-300 hover:border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.05)] w-full sm:w-auto"
            >
              <span
                className="text-[14px] tracking-[1.6px] uppercase text-white"
                style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
              >
                View Events
              </span>
            </a>
          </FadeInUp>

          <FadeIn delay={1.0} className="flex items-center justify-center gap-2.5 sm:gap-6 mt-12 sm:mt-16 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase text-[rgba(255,255,255,0.25)] border border-[rgba(255,255,255,0.08)] px-2.5 sm:px-3 py-1 rounded-full"
                style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </FadeIn>
        </div>
      </div>
    </div>
  );
}