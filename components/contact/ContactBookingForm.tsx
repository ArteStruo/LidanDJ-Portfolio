import { SlideIn } from "@/components/animations/SlideIn";

export function ContactBookingForm() {
  return (
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
  );
}
