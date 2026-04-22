import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { MusicTrack } from "@/lib/content-store";

type MusicManagementSectionProps = {
  tracks: MusicTrack[];
  onEditTrack: (index: number) => void;
  onDeleteTrack: (index: number) => void;
};

export function MusicManagementSection({ tracks, onEditTrack, onDeleteTrack }: MusicManagementSectionProps) {
  return (
    <div className="space-y-3">
      {tracks.map((track, index) => (
        <div
          key={track.id + index}
          className="rounded-xl border border-white/10 bg-[#111] px-4 py-4 flex items-start justify-between gap-3"
        >
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm sm:text-base">{track.title}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-[#99a1af]">{track.genre}</p>
            <p className="mt-1.5 text-sm text-[#9ca3af] truncate max-w-[640px]">{track.url}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="icon" onClick={() => onEditTrack(index)}>
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="bg-[#7f1d1d] hover:bg-[#991b1b]"
              onClick={() => onDeleteTrack(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
