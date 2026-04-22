import { useEffect, useRef, useState } from "react";
import { CalendarDays, Pencil, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { EventsData } from "@/lib/content-store";

type EventsManagementSectionProps = {
  eventsData: EventsData;
  filteredTagSuggestions: string[];
  newTag: string;
  setNewTag: (value: string) => void;
  onAddTag: (tag?: string) => Promise<void>;
  onRemoveTag: (tag: string) => Promise<void>;
  onEditEvent: (index: number) => void;
  onDeleteEvent: (index: number) => void;
};

export function EventsManagementSection({
  eventsData,
  filteredTagSuggestions,
  newTag,
  setNewTag,
  onAddTag,
  onRemoveTag,
  onEditEvent,
  onDeleteEvent,
}: EventsManagementSectionProps) {
  const [isTagSuggestionsOpen, setIsTagSuggestionsOpen] = useState(false);
  const tagComboboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (tagComboboxRef.current && !tagComboboxRef.current.contains(target)) {
        setIsTagSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-[#111] p-4">
        <h3 className="font-semibold text-white">Hero Tags</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {eventsData.heroTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,0,63,0.35)] bg-[rgba(255,0,63,0.12)] px-3 py-1 text-xs text-[#ffc6d5]"
            >
              {tag}
              <button
                type="button"
                onClick={() => {
                  void onRemoveTag(tag);
                }}
                aria-label={`Remove ${tag}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-2" ref={tagComboboxRef}>
          <div className="relative flex-1">
            <Input
              value={newTag}
              onChange={(event) => {
                setNewTag(event.target.value);
                setIsTagSuggestionsOpen(true);
              }}
              onFocus={() => setIsTagSuggestionsOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void onAddTag();
                  setIsTagSuggestionsOpen(false);
                }
              }}
              placeholder="Add hero tag"
              className="bg-[#0b0b0b] border-white/15 text-white"
            />

            {isTagSuggestionsOpen && filteredTagSuggestions.length > 0 ? (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-40 max-h-56 overflow-y-auto rounded-md border border-white/15 bg-[#0a0a0a] shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
                {filteredTagSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="block w-full px-3 py-2 text-left text-sm text-white hover:bg-[rgba(255,0,63,0.18)] transition-colors"
                    onClick={() => {
                      setNewTag(suggestion);
                      setIsTagSuggestionsOpen(false);
                      void onAddTag(suggestion);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <Button
            onClick={() => {
              void onAddTag();
              setIsTagSuggestionsOpen(false);
            }}
            className="bg-[#ff003f] hover:bg-[#ff1a56] text-white"
          >
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {eventsData.events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 bg-[#101010] px-6 py-12 text-center">
            <CalendarDays className="mx-auto size-8 text-[rgba(255,255,255,0.35)]" />
            <p className="mt-4 text-[18px] text-[rgba(255,255,255,0.8)]">The decks are silent.</p>
            <p className="mt-1 text-sm italic text-[#7a828f]">No upcoming events yet. Drop the first one.</p>
          </div>
        ) : (
          eventsData.events.map((event, index) => (
            <div
              key={event.venue + event.date + index}
              className="rounded-xl border border-white/10 bg-[#111] px-4 py-4 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm sm:text-base">{event.date} {event.year}</p>
                <p className="mt-1 text-[#d1d5dc]">{event.venue}</p>
                <p className="mt-1 text-sm text-[#9ca3af]">{event.location}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#ff4d79]">{event.tag}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="icon" onClick={() => onEditEvent(index)}>
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-[#7f1d1d] hover:bg-[#991b1b]"
                  onClick={() => onDeleteEvent(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
