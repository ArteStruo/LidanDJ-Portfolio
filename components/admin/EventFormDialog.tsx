import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { CalendarDays } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDisplayDate } from "@/components/admin/admin-utils";
import type { HomeEvent } from "@/lib/content-store";

type EventFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  eventForm: HomeEvent;
  setEventForm: Dispatch<SetStateAction<HomeEvent>>;
  selectedEventDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  heroTags: string[];
  onSave: () => Promise<void>;
};

export function EventFormDialog({
  open,
  onOpenChange,
  isEditing,
  eventForm,
  setEventForm,
  selectedEventDate,
  onDateSelect,
  heroTags,
  onSave,
}: EventFormDialogProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (calendarRef.current && !calendarRef.current.contains(target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121212] border-white/15 text-white">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Event" : "Add Event"}</DialogTitle>
          <DialogDescription className="text-[#99a1af]">Update event details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2" ref={calendarRef}>
            <Label>Date</Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCalendarOpen((value) => !value)}
                className="h-9 w-full rounded-md border border-white/15 bg-[#0b0b0b] px-3 text-left text-sm text-white inline-flex items-center justify-between"
              >
                <span className={selectedEventDate ? "text-white" : "text-[#808892]"}>
                  {selectedEventDate ? formatDisplayDate(selectedEventDate) : "Select a date"}
                </span>
                <CalendarDays className="size-4 text-[#9ca3af]" />
              </button>

              {isCalendarOpen ? (
                <div className="absolute z-40 mt-2 rounded-xl border border-white/15 bg-[#0b0b0b] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
                  <DayPicker
                    mode="single"
                    selected={selectedEventDate}
                    onSelect={(date) => {
                      onDateSelect(date);
                      setIsCalendarOpen(false);
                    }}
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear() - 8}
                    toYear={new Date().getFullYear() + 8}
                    className="text-white"
                    classNames={{
                      month: "space-y-3",
                      caption: "flex justify-between items-center gap-2",
                      nav: "flex items-center gap-1",
                      button_previous: "size-7 rounded-md border border-white/15 hover:bg-white/10",
                      button_next: "size-7 rounded-md border border-white/15 hover:bg-white/10",
                      month_caption: "text-sm font-semibold",
                      dropdowns: "flex items-center gap-2",
                      years_dropdown: "bg-[#050505] border border-white/20 rounded px-2 py-1 text-xs",
                      months_dropdown: "bg-[#050505] border border-white/20 rounded px-2 py-1 text-xs",
                      weekdays: "grid grid-cols-7 text-[11px] text-[#8b93a1]",
                      weekday: "text-center",
                      week: "grid grid-cols-7",
                      day: "size-9 text-sm rounded-md hover:bg-white/10",
                      selected: "bg-[#ff003f] text-white hover:bg-[#ff003f]",
                      today: "border border-[rgba(255,0,63,0.45)]",
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Venue</Label>
            <Input
              value={eventForm.venue}
              onChange={(event) => setEventForm((current) => ({ ...current, venue: event.target.value }))}
              className="bg-[#0b0b0b] border-white/15 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Tag</Label>
            <select
              value={eventForm.tag}
              onChange={(event) => setEventForm((current) => ({ ...current, tag: event.target.value }))}
              className="h-9 w-full rounded-md border border-white/15 bg-[#0b0b0b] px-3 text-sm text-white outline-none focus-visible:border-[rgba(255,0,63,0.45)] focus-visible:ring-[3px] focus-visible:ring-[rgba(255,0,63,0.25)]"
            >
              <option value="" className="bg-[#0b0b0b] text-[#9ca3af]">
                Select tag
              </option>
              {heroTags.map((heroTag) => (
                <option key={heroTag} value={heroTag} className="bg-[#0b0b0b] text-white">
                  {heroTag}
                </option>
              ))}
              {eventForm.tag && !heroTags.includes(eventForm.tag) ? (
                <option value={eventForm.tag} className="bg-[#0b0b0b] text-white">
                  {eventForm.tag}
                </option>
              ) : null}
            </select>
            {heroTags.length === 0 ? (
              <p className="text-xs text-[#9ca3af]">Add hero tags above to enable tag selection.</p>
            ) : null}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              void onSave();
            }}
            className="bg-[#ff003f] hover:bg-[#ff1a56] text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
