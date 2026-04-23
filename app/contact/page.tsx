import type { Metadata } from "next";

import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactBookingForm } from "@/components/contact/ContactBookingForm";

export const metadata: Metadata = {
  title: "Contact & Bookings",
  description:
    "Book DJ Lidan for club nights, private events, and collaborations. Send your enquiry and get booking details directly.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Bookings | DJ Lidan",
    description:
      "Book DJ Lidan for club nights, private events, and collaborations. Send your enquiry and get booking details directly.",
    url: "/contact",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact DJ Lidan",
      },
    ],
  },
  twitter: {
    title: "Contact & Bookings | DJ Lidan",
    description:
      "Book DJ Lidan for club nights, private events, and collaborations. Send your enquiry and get booking details directly.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-16 sm:pb-20 relative">
      {/* Top Border Gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[min(512px,90vw)]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(255, 0, 63) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          <ContactInfo />
          <ContactBookingForm />
        </div>
      </div>
    </div>
  );
}
