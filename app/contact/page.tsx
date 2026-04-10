import { SlideIn } from "@/components/animations/SlideIn";
import svgPaths from "@/lib/svg-paths";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 relative">
      {/* Top Border Gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[512px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(255, 0, 63) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="max-w-[1060px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column — Info */}
          <SlideIn
            xOffset={-40}
            duration={0.8}
            className="space-y-8"
          >
            <div>
              <p
                className="text-[#ff003f] tracking-[3px] uppercase text-xs mb-4"
                style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
              >
                Bookings · DJ Lidan
              </p>
              <h1
                className="text-[clamp(44px,7vw,68px)] leading-none text-white uppercase mb-5"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                Book DJ Lidan
              </h1>
              <p
                className="text-[17px] leading-[30px] text-[#99a1af]"
                style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
              >
                DJ Lidan is Sri Lanka&apos;s premier progressive and electronic music DJ, based in Colombo and
                available for club bookings, underground festival appearances, face-to-face battles, and
                international events. Get in touch to discuss your next show.
              </p>
            </div>

            {/* What's available */}
            <div className="space-y-3 pt-2">
              {[
                "Club Nights — Colombo & across Sri Lanka",
                "Progressive & Electronic Music Events",
                "12-Hour Underground Marathon Sets",
                "Face-to-Face DJ Battles",
                "International Festival Appearances",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-[#ff003f] shrink-0" />
                  <span
                    className="text-[14px] text-[#99a1af]"
                    style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              <a href="mailto:booking@lidanmusic.com" className="flex items-center gap-4 group mt-6">
                <svg className="size-6" fill="none" viewBox="0 0 24 24">
                  <path
                    d={svgPaths.p2bf8f980}
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d={svgPaths.p311e6900}
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span
                  className="text-[18px] text-white group-hover:text-[#ff003f] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
                >
                  booking@lidanmusic.com
                </span>
              </a>

              <div className="flex gap-4 flex-wrap">
                <a
                  href="#"
                  className="bg-[rgba(255,255,255,0.05)] h-11 px-4 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]"
                >
                  <svg className="size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.p4b98700}
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                    <path
                      d={svgPaths.p19f4a800}
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                    <path
                      d="M14.5833 5.41667H14.5917"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                  <span
                    className="text-[13px] text-white"
                    style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
                  >
                    @lidan.music
                  </span>
                </a>

                <a
                  href="#"
                  className="bg-[rgba(255,255,255,0.05)] h-11 px-4 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]"
                >
                  <svg className="size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.p3a470400}
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                    <path
                      d={svgPaths.p212a8900}
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                  <span
                    className="text-[13px] text-white"
                    style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
                  >
                    lidan music
                  </span>
                </a>
              </div>
            </div>
          </SlideIn>

          {/* Right Column — Form */}
          <SlideIn
            xOffset={40}
            duration={0.8}
            delay={0.2}
            className="bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-8"
          >
            <h2
              className="text-[28px] text-white uppercase mb-6"
              style={{ fontFamily: "var(--font-bebas)", letterSpacing: "1px" }}
            >
              Send a Booking Inquiry
            </h2>
            <form className="space-y-5">
              <div>
                <label
                  className="block text-[11px] tracking-[1.8px] uppercase text-[#99a1af] mb-2"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[14px] px-4 py-3 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,0,63,0.5)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-space)" }}
                />
              </div>

              <div>
                <label
                  className="block text-[11px] tracking-[1.8px] uppercase text-[#99a1af] mb-2"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[14px] px-4 py-3 text-[15px] text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,0,63,0.5)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-space)" }}
                />
              </div>

              <div>
                <label
                  className="block text-[11px] tracking-[1.8px] uppercase text-[#99a1af] mb-2"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
                >
                  Event Type
                </label>
                <select
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[14px] px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[rgba(255,0,63,0.5)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-space)" }}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-[#111]">Select event type...</option>
                  <option value="club" className="bg-[#111]">Club Night — Sri Lanka</option>
                  <option value="festival" className="bg-[#111]">Festival / Outdoor</option>
                  <option value="marathon" className="bg-[#111]">Marathon Set (12hr+)</option>
                  <option value="battle" className="bg-[#111]">DJ Battle</option>
                  <option value="private" className="bg-[#111]">Private Event</option>
                  <option value="international" className="bg-[#111]">International</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-[11px] tracking-[1.8px] uppercase text-[#99a1af] mb-2"
                  style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
                >
                  Inquiry / Booking Details
                </label>
                <textarea
                  placeholder="Tell me about your event — date, venue, location, and any other details..."
                  rows={4}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[14px] px-4 py-3 text-[15px] leading-[24px] text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,0,63,0.5)] transition-colors duration-300 resize-none"
                  style={{ fontFamily: "var(--font-space)" }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff003f] h-14 rounded-[14px] tracking-[1.8px] uppercase text-white transition-transform duration-300 hover:scale-105 text-[14px]"
                style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
              >
                Send Booking Inquiry
              </button>
            </form>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}
