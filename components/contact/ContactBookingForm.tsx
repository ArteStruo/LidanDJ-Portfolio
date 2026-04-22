"use client";

import { useState } from "react";

import { SlideIn } from "@/components/animations/SlideIn";

export function ContactBookingForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatusMessage("");
    setHasError(false);
    setIsSubmitting(true);

    const subject = eventType
      ? `Booking Inquiry — ${eventType}`
      : "Booking Inquiry";

    const composedMessage = eventType
      ? `Event Type: ${eventType}\n\n${message}`
      : message;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          subject,
          message: composedMessage,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(payload?.error ?? "Failed to send inquiry");
      }

      setFullName("");
      setEmail("");
      setEventType("");
      setMessage("");
      setStatusMessage("Thanks — your inquiry has been sent.");
    } catch (error) {
      const fallbackMessage = "Could not send inquiry right now. Please try again.";

      setHasError(true);
      setStatusMessage(error instanceof Error ? error.message : fallbackMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SlideIn
      xOffset={40}
      duration={0.8}
      delay={0.2}
      className="bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8"
    >
      <h2
        className="text-[24px] sm:text-[28px] text-white uppercase mb-6"
        style={{ fontFamily: "var(--font-bebas)", letterSpacing: "1px" }}
      >
        Send a Booking Inquiry
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-[11px] tracking-[1.8px] uppercase text-[#99a1af] mb-2"
            style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
          >
            Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Your Name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
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
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            name="eventType"
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[14px] px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[rgba(255,0,63,0.5)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-space)" }}
            value={eventType}
            onChange={(event) => setEventType(event.target.value)}
            required
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
            name="message"
            placeholder="Tell me about your event — date, venue, location, and any other details..."
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[14px] px-4 py-3 text-[15px] leading-[24px] text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,0,63,0.5)] transition-colors duration-300 resize-none"
            style={{ fontFamily: "var(--font-space)" }}
          />
        </div>

        {statusMessage ? (
          <p
            className={`text-[13px] ${hasError ? "text-[#ff4d4f]" : "text-[#2ecc71]"}`}
            style={{ fontFamily: "var(--font-space)" }}
          >
            {statusMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ff003f] h-14 rounded-[14px] tracking-[1.8px] uppercase text-white transition-transform duration-300 hover:scale-105 text-[14px] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
        >
          {isSubmitting ? "Sending..." : "Send Booking Inquiry"}
        </button>
      </form>
    </SlideIn>
  );
}
