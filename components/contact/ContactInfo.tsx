import { SlideIn } from "@/components/animations/SlideIn";
import svgPaths from "@/lib/svg-paths";

type SocialLinkProps = {
  icon: React.ReactNode;
  label: string;
  href?: string;
};

function SocialLink({ icon, label, href = "#" }: SocialLinkProps) {
  return (
    <a
      href={href}
      className="bg-[rgba(255,255,255,0.05)] h-11 px-4 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]"
    >
      {icon}
      <span
        className="text-[13px] text-white"
        style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
      >
        {label}
      </span>
    </a>
  );
}

export function ContactInfo() {
  return (
    <SlideIn xOffset={-40} duration={0.8} className="space-y-8">
      <div>
        <p
          className="text-[#ff003f] tracking-[2.5px] sm:tracking-[3px] uppercase text-[11px] sm:text-xs mb-4"
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
          className="text-[15px] sm:text-[17px] leading-[26px] sm:leading-[30px] text-[#99a1af]"
          style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
        >
          DJ Lidan is Sri Lanka&apos;s premier progressive and electronic music DJ, based in Colombo and
          available for club bookings, underground festival appearances, face-to-face battles, and
          international events. Get in touch to discuss your next show.
        </p>
      </div>

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
        <a href="mailto:lidanmusic.02@gmail.com" className="flex items-center gap-4 group mt-6">
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
            className="text-[16px] sm:text-[18px] text-white group-hover:text-[#ff003f] transition-colors duration-300 break-all"
            style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
          >
            lidanmusic.02@gmail.com
          </span>
        </a>

        <div className="flex gap-4 flex-wrap">
          <SocialLink
            label="@lidan.music"
            icon={
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
            }
          />

          <SocialLink
            label="lidan music"
            icon={
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
            }
          />
        </div>
      </div>
    </SlideIn>
  );
}
