import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactBookingForm } from "@/components/contact/ContactBookingForm";

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
          <ContactInfo />
          <ContactBookingForm />
        </div>
      </div>
    </div>
  );
}
