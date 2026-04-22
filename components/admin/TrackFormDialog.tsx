import type { Dispatch, SetStateAction } from "react";

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
import type { MusicTrack } from "@/lib/content-store";

type TrackFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  trackForm: MusicTrack;
  setTrackForm: Dispatch<SetStateAction<MusicTrack>>;
  trackIdTouched: boolean;
  setTrackIdTouched: (value: boolean) => void;
  genreSuggestions: string[];
  slugify: (value: string) => string;
  onSave: () => Promise<void>;
};

export function TrackFormDialog({
  open,
  onOpenChange,
  isEditing,
  trackForm,
  setTrackForm,
  trackIdTouched,
  setTrackIdTouched,
  genreSuggestions,
  slugify,
  onSave,
}: TrackFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121212] border-white/15 text-white">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Track" : "Add Track"}</DialogTitle>
          <DialogDescription className="text-[#99a1af]">
            Update SoundCloud track details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={trackForm.title}
              onChange={(event) => {
                const title = event.target.value;
                setTrackForm((current) => ({
                  ...current,
                  title,
                  id: trackIdTouched ? current.id : slugify(title),
                }));
              }}
              className="bg-[#0b0b0b] border-white/15 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>SoundCloud URL</Label>
            <Input
              value={trackForm.url}
              onChange={(event) => setTrackForm((current) => ({ ...current, url: event.target.value }))}
              className="bg-[#0b0b0b] border-white/15 text-white"
              placeholder="https://soundcloud.com/..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Genre</Label>
            <Input
              value={trackForm.genre}
              onChange={(event) => setTrackForm((current) => ({ ...current, genre: event.target.value }))}
              list="genre-suggestions"
              className="bg-[#0b0b0b] border-white/15 text-white"
            />
            <datalist id="genre-suggestions">
              {genreSuggestions.map((genre) => (
                <option key={genre} value={genre} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2">
            <Label>ID (slug)</Label>
            <Input
              value={trackForm.id}
              onChange={(event) => {
                setTrackIdTouched(true);
                setTrackForm((current) => ({ ...current, id: event.target.value }));
              }}
              className="bg-[#0b0b0b] border-white/15 text-white"
            />
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
