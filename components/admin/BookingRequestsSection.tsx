import { Mail, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { BookingRequest } from "@/lib/content-store";

type BookingRequestsSectionProps = {
  bookings: BookingRequest[];
  onDeleteBooking: (id: string) => Promise<void>;
};

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function BookingRequestsSection({ bookings, onDeleteBooking }: BookingRequestsSectionProps) {
  return (
    <div className="space-y-3">
      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 bg-[#101010] px-6 py-12 text-center">
          <Mail className="mx-auto size-8 text-[rgba(255,255,255,0.35)]" />
          <p className="mt-4 text-[18px] text-[rgba(255,255,255,0.8)]">No booking requests yet.</p>
          <p className="mt-1 text-sm italic text-[#7a828f]">New form submissions will appear here.</p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-xl border border-white/10 bg-[#111] px-4 py-4 flex items-start justify-between gap-3"
          >
            <div className="min-w-0 space-y-1">
              <p className="text-white font-semibold text-sm sm:text-base">{booking.fullName}</p>
              <p className="text-sm text-[#9ca3af]">{booking.email}</p>
              <p className="text-sm text-[#d1d5dc]">{booking.subject}</p>
              <p className="text-xs uppercase tracking-wide text-[#ff4d79]">
                {formatDateTime(booking.createdAt)}
              </p>
              <p className="pt-1 whitespace-pre-wrap text-sm text-[#c5c9d2]">{booking.message}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="destructive"
                size="icon"
                className="bg-[#7f1d1d] hover:bg-[#991b1b]"
                onClick={() => {
                  void onDeleteBooking(booking.id);
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
