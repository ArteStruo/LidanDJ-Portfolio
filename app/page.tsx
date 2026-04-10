import Link from "next/link";
import { FadeInUp } from "@/components/animations/FadeInUp";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const events = [
  {
    date: "FEB 14",
    year: "2026",
    venue: "Kulture Warehouse",
    location: "Colombo, Sri Lanka",
    tag: "Face-to-Face Battle",
    button: "Bravado vs Lidan F2F",
    highlight: true,
  },
  {
    date: "MAR 02",
    year: "2026",
    venue: "Deep Horizon Club",
    location: "Galle, Sri Lanka",
    tag: "Progressive Night",
    button: "Tickets Available",
    highlight: false,
  },
  {
    date: "MAR 15",
    year: "2026",
    venue: "Underground Marathon — 12 Hour Set",
    location: "Colombo, Sri Lanka",
    tag: "Marathon · 12hrs",
    button: "RSVP Only",
    highlight: false,
  },
  {
    date: "APR 05",
    year: "2026",
    venue: "Sunset Sessions",
    location: "Mirissa, Sri Lanka",
    tag: "Electronic / Outdoor",
    button: "Tickets Available",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#050505]">
      {/* ── HERO ── */}
      <div className="min-h-screen relative overflow-clip">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full bg-[#111] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[rgba(5,5,5,0.55)] to-transparent" />
          <div className="absolute inset-0 bg-[rgba(255,0,63,0.04)]" />
        </div>

        {/* Hero content */}
        <div className="relative flex items-center justify-center min-h-screen px-6">
          <div className="max-w-[900px] text-center pt-20">
            <FadeInUp
              delay={0.1}
              className="text-[#ff003f] tracking-[4px] uppercase mb-6 text-sm"
              style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
            >
              DJ Lidan · Colombo, Sri Lanka
            </FadeInUp>

            <FadeInUp delay={0.2} duration={0.8} yOffset={40}>
              <h1
                className="text-[clamp(72px,12vw,128px)] leading-[0.92] tracking-[-2px] text-white uppercase"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                Deep &amp;
              </h1>
              <h1
                className="text-[clamp(72px,12vw,128px)] leading-[0.92] tracking-[-2px] uppercase bg-clip-text text-transparent"
                style={{
                  fontFamily: "var(--font-bebas)",
                  backgroundImage: "linear-gradient(90deg, rgb(255, 0, 63) 0%, rgb(255, 77, 121) 100%)",
                }}
              >
                Atmospheric
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.5} className="mt-10 mb-14 max-w-[600px] mx-auto">
              <p
                className="text-[20px] leading-[32px] text-[#d1d5dc] mb-3"
                style={{ fontFamily: "var(--font-space)", fontWeight: 300 }}
              >
                Sri Lanka&apos;s foremost progressive and electronic music DJ.
              </p>
              <p
                className="text-[16px] leading-[26px] text-[#99a1af]"
                style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
              >
                Crafting hypnotic underground journeys from the heart of Colombo — deep progressive house,
                atmospheric electronic music, and relentless marathon sets.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.7} className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/music"
                className="bg-[#ff003f] h-[54px] px-8 rounded-full flex items-center gap-3 transition-transform duration-300 hover:scale-105"
              >
                <svg className="size-5" fill="none" viewBox="0 0 20 20">
                  <path d="M9.5 4.16667V15.8333M9.5 15.8333C9.5 17.2141 8.38071 18.3333 7 18.3333C5.61929 18.3333 4.5 17.2141 4.5 15.8333C4.5 14.4526 5.61929 13.3333 7 13.3333C8.38071 13.3333 9.5 14.4526 9.5 15.8333ZM15.5 14.1667V4.16667M15.5 14.1667C15.5 15.5474 14.3807 16.6667 13 16.6667C11.6193 16.6667 10.5 15.5474 10.5 14.1667C10.5 12.7859 11.6193 11.6667 13 11.6667C14.3807 11.6667 15.5 12.7859 15.5 14.1667Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
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
                className="h-[54px] px-8 rounded-full flex items-center border border-[rgba(255,255,255,0.2)] transition-all duration-300 hover:border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.05)]"
              >
                <span
                  className="text-[14px] tracking-[1.6px] uppercase text-white"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
                >
                  View Events
                </span>
              </a>
            </FadeInUp>

            {/* Tag strip */}
            <FadeIn delay={1.0} className="flex items-center justify-center gap-6 mt-16 flex-wrap">
              {["Progressive House", "Electronic Music", "DJ Sri Lanka", "Underground Sets"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-[2px] uppercase text-[rgba(255,255,255,0.25)] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
                >
                  {tag}
                </span>
              ))}
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── EVENTS SECTION ── */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-[1108px] mx-auto">
          {/* Section header */}
          <ScrollReveal
            className="flex items-end justify-between pb-6 border-b border-[rgba(255,255,255,0.1)] mb-10"
          >
            <div>
              <p
                className="text-[#ff003f] tracking-[3px] uppercase text-xs mb-3"
                style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
              >
                DJ Lidan — Live Dates
              </p>
              <h2
                className="text-[clamp(36px,6vw,60px)] leading-none text-white uppercase"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                Upcoming Sets
              </h2>
              <p
                className="text-[14px] text-[#99a1af] mt-2"
                style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
              >
                Catch DJ Lidan live across Sri Lanka&apos;s underground progressive and electronic music circuit.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 hover:gap-3 transition-all duration-300 shrink-0"
            >
              <span
                className="text-[#ff003f] tracking-[1.4px] uppercase text-[12px]"
                style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
              >
                Book a Date
              </span>
              <svg className="size-4" fill="none" viewBox="0 0 16 16">
                <path d="M3.33333 8H12.6667" stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M8.66667 4L12.6667 8L8.66667 12" stroke="#FF003F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </Link>
          </ScrollReveal>

          {/* Events list */}
          <div className="space-y-3">
            {events.map((event, index) => (
              <ScrollReveal
                key={event.date + event.venue}
                delay={index * 0.08}
                yOffset={24}
                className={`bg-[#111] border rounded-[16px] px-6 py-5 flex items-center justify-between group cursor-pointer transition-all duration-300 ${
                  event.highlight
                    ? "border-[rgba(255,0,63,0.4)] shadow-[0_0_30px_rgba(255,0,63,0.07)]"
                    : "border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,0,63,0.25)]"
                }`}
              >
                <div className="flex items-center gap-6 lg:gap-10 min-w-0">
                  {/* Date */}
                  <div className="text-center shrink-0 w-14">
                    <div
                      className="text-[24px] leading-none text-[#ff003f]"
                      style={{ fontFamily: "var(--font-bebas)", letterSpacing: "1px" }}
                    >
                      {event.date}
                    </div>
                    <div
                      className="text-[10px] tracking-[1.5px] text-[#6a7282] mt-0.5"
                      style={{ fontFamily: "var(--font-space)", fontWeight: 500 }}
                    >
                      {event.year}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-10 bg-[rgba(255,255,255,0.08)] shrink-0" />
                  
                  {/* Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3
                        className="text-[17px] text-white truncate"
                        style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
                      >
                        {event.venue}
                      </h3>
                      <span
                        className="text-[10px] tracking-[1.5px] uppercase text-[#ff003f] border border-[rgba(255,0,63,0.35)] px-2 py-0.5 rounded-full hidden sm:inline shrink-0"
                        style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
                      >
                        {event.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                       <svg className="size-3.5 shrink-0" fill="none" viewBox="0 0 16 16">
                        <path d="M8 1.333C5.42 1.333 3.333 3.42 3.333 6c0 3.5 4.667 8.667 4.667 8.667S12.667 9.5 12.667 6C12.667 3.42 10.58 1.333 8 1.333Z" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M8 7.333A1.333 1.333 0 1 0 8 4.667a1.333 1.333 0 0 0 0 2.666Z" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </svg>
                      <span
                        className="text-[12px] text-[#99a1af]"
                        style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
                      >
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="bg-[#ff003f] h-10 px-5 rounded-full tracking-[1.2px] uppercase text-white transition-transform duration-300 hover:scale-105 text-[12px] shrink-0 hidden sm:flex items-center ml-4"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
                >
                  {event.button}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
