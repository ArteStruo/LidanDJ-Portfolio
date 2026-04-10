import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { HomeEvent } from "@/lib/home-content";

type HomeEventsSectionProps = {
  events: HomeEvent[];
};

export function HomeEventsSection({ events }: HomeEventsSectionProps) {
  return (
    <section id="events" className="py-24 px-6">
      <div className="max-w-[1108px] mx-auto">
        <ScrollReveal className="flex items-end justify-between pb-6 border-b border-[rgba(255,255,255,0.1)] mb-10">
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
          <Link href="/contact" className="flex items-center gap-2 hover:gap-3 transition-all duration-300 shrink-0">
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

                <div className="w-px h-10 bg-[rgba(255,255,255,0.08)] shrink-0" />

                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-[17px] text-white truncate" style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}>
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
                    <span className="text-[12px] text-[#99a1af]" style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}>
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>

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
  );
}
