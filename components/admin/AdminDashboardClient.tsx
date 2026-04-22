"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { EventFormDialog } from "@/components/admin/EventFormDialog";
import { EventsManagementSection } from "@/components/admin/EventsManagementSection";
import { MusicManagementSection } from "@/components/admin/MusicManagementSection";
import { TrackFormDialog } from "@/components/admin/TrackFormDialog";
import { emptyEvent, emptyTrack, genreSuggestions, heroTagSuggestions } from "@/components/admin/admin-constants";
import { formatStorageDate, parseStoredEventDate, slugify } from "@/components/admin/admin-utils";
import type { EventsData, HomeEvent, MusicData, MusicTrack } from "@/lib/content-store";

type AdminSection = "music" | "events";

export function AdminDashboardClient() {
  const [section, setSection] = useState<AdminSection>("music");
  const [musicData, setMusicData] = useState<MusicData>({ tracks: [] });
  const [eventsData, setEventsData] = useState<EventsData>({ heroTags: [], events: [] });
  const [isLoading, setIsLoading] = useState(true);

  const [isTrackDialogOpen, setIsTrackDialogOpen] = useState(false);
  const [editingTrackIndex, setEditingTrackIndex] = useState<number | null>(null);
  const [trackForm, setTrackForm] = useState<MusicTrack>(emptyTrack);
  const [trackIdTouched, setTrackIdTouched] = useState(false);

  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);
  const [eventForm, setEventForm] = useState<HomeEvent>(emptyEvent);
  const [selectedEventDate, setSelectedEventDate] = useState<Date | undefined>(undefined);

  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const [musicResponse, eventsResponse] = await Promise.all([
        fetch("/api/admin/music", { cache: "no-store" }),
        fetch("/api/admin/events", { cache: "no-store" }),
      ]);

      if (!musicResponse.ok || !eventsResponse.ok) {
        toast.error("Failed to load admin data.");
        setIsLoading(false);
        return;
      }

      const [musicJson, eventsJson] = (await Promise.all([
        musicResponse.json(),
        eventsResponse.json(),
      ])) as [MusicData, EventsData];

      setMusicData(musicJson);
      setEventsData(eventsJson);
      setIsLoading(false);
    };

    load();
  }, []);

  const dashboardTitle = useMemo(
    () => (section === "music" ? "Music Management" : "Events Management"),
    [section]
  );

  const openAddTrack = () => {
    setEditingTrackIndex(null);
    setTrackForm(emptyTrack);
    setTrackIdTouched(false);
    setIsTrackDialogOpen(true);
  };

  const openEditTrack = (index: number) => {
    setEditingTrackIndex(index);
    setTrackForm(musicData.tracks[index]);
    setTrackIdTouched(true);
    setIsTrackDialogOpen(true);
  };

  const openAddEvent = () => {
    setEditingEventIndex(null);
    setEventForm(emptyEvent);
    setSelectedEventDate(undefined);
    setIsEventDialogOpen(true);
  };

  const openEditEvent = (index: number) => {
    setEditingEventIndex(index);
    const event = eventsData.events[index];
    setEventForm(event);
    setSelectedEventDate(parseStoredEventDate(event.date, event.year));
    setIsEventDialogOpen(true);
  };

  const saveMusic = async (nextTracks: MusicTrack[]) => {
    const payload: MusicData = { tracks: nextTracks };
    const response = await fetch("/api/admin/music", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      toast.error("Failed to save music changes.");
      return false;
    }

    const freshResponse = await fetch("/api/admin/music", { cache: "no-store" });

    if (!freshResponse.ok) {
      toast.error("Saved, but failed to refresh music data.");
      return false;
    }

    const freshMusic = (await freshResponse.json()) as MusicData;
    setMusicData(freshMusic);
    toast.success("Music updated.");
    return true;
  };

  const saveEvents = async (nextData: EventsData) => {
    const response = await fetch("/api/admin/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextData),
    });

    if (!response.ok) {
      toast.error("Failed to save event changes.");
      return false;
    }

    const freshResponse = await fetch("/api/admin/events", { cache: "no-store" });

    if (!freshResponse.ok) {
      toast.error("Saved, but failed to refresh event data.");
      return false;
    }

    const freshEvents = (await freshResponse.json()) as EventsData;
    setEventsData(freshEvents);
    toast.success("Events updated.");
    return true;
  };

  const handleTrackSave = async () => {
    if (!trackForm.title.trim() || !trackForm.url.trim()) {
      toast.error("Title and SoundCloud URL are required.");
      return;
    }

    if (!trackForm.url.startsWith("https://soundcloud.com/")) {
      toast.error("SoundCloud URL must start with https://soundcloud.com/");
      return;
    }

    const normalizedTrack: MusicTrack = {
      ...trackForm,
      id: trackForm.id.trim() || slugify(trackForm.title),
      title: trackForm.title.trim(),
      genre: trackForm.genre.trim(),
      url: trackForm.url.trim(),
    };

    const nextTracks = [...musicData.tracks];

    if (editingTrackIndex === null) {
      nextTracks.unshift(normalizedTrack);
    } else {
      nextTracks[editingTrackIndex] = normalizedTrack;
    }

    const success = await saveMusic(nextTracks);

    if (success) {
      setIsTrackDialogOpen(false);
    }
  };

  const handleTrackDelete = async (index: number) => {
    const shouldDelete = window.confirm("Delete this track?");

    if (!shouldDelete) {
      return;
    }

    const nextTracks = musicData.tracks.filter((_, trackIndex) => trackIndex !== index);
    await saveMusic(nextTracks);
  };

  const handleEventSave = async () => {
    if (!eventForm.date.trim() || !eventForm.year.trim() || !eventForm.venue.trim()) {
      toast.error("Date, year and venue are required.");
      return;
    }

    const normalizedEvent: HomeEvent = {
      date: eventForm.date.trim(),
      year: eventForm.year.trim(),
      venue: eventForm.venue.trim(),
      location: eventForm.venue.trim(),
      tag: eventForm.tag.trim(),
    };

    const nextEvents = [...eventsData.events];

    if (editingEventIndex === null) {
      nextEvents.unshift(normalizedEvent);
    } else {
      nextEvents[editingEventIndex] = normalizedEvent;
    }

    const success = await saveEvents({ ...eventsData, events: nextEvents });

    if (success) {
      setIsEventDialogOpen(false);
    }
  };

  const handleEventDelete = async (index: number) => {
    const shouldDelete = window.confirm("Delete this event?");

    if (!shouldDelete) {
      return;
    }

    const nextEvents = eventsData.events.filter((_, eventIndex) => eventIndex !== index);
    await saveEvents({ ...eventsData, events: nextEvents });
  };

  const handleAddTag = async (inputTag?: string) => {
    const tag = (inputTag ?? newTag).trim();

    if (!tag) {
      return;
    }

    const normalizedTag = tag.toLowerCase();
    const tagExists = eventsData.heroTags.some((existingTag) => existingTag.toLowerCase() === normalizedTag);

    if (tagExists) {
      toast.error("Tag already exists.");
      return;
    }

    const nextData = { ...eventsData, heroTags: [...eventsData.heroTags, tag] };
    const success = await saveEvents(nextData);

    if (success) {
      setNewTag("");
    }
  };

  const handleEventDateSelect = (date: Date | undefined) => {
    setSelectedEventDate(date);

    if (!date) {
      setEventForm((current) => ({ ...current, date: "", year: "" }));
      return;
    }

    setEventForm((current) => ({
      ...current,
      date: formatStorageDate(date),
      year: String(date.getFullYear()),
    }));
  };

  const filteredTagSuggestions = useMemo(() => {
    const query = newTag.trim().toLowerCase();

    return heroTagSuggestions.filter((suggestion) => {
      const alreadySelected = eventsData.heroTags.some(
        (tag) => tag.toLowerCase() === suggestion.toLowerCase()
      );

      if (alreadySelected) {
        return false;
      }

      if (!query) {
        return true;
      }

      return suggestion.toLowerCase().includes(query);
    });
  }, [eventsData.heroTags, newTag]);

  const handleRemoveTag = async (tag: string) => {
    const shouldDelete = window.confirm(`Remove hero tag \"${tag}\"?`);

    if (!shouldDelete) {
      return;
    }

    const nextData = {
      ...eventsData,
      heroTags: eventsData.heroTags.filter((value) => value !== tag),
    };

    await saveEvents(nextData);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="min-h-screen w-full">
        <AdminSidebar section={section} onSectionChange={setSection} onLogout={handleLogout} />

        <main className="ml-[270px] p-8 md:p-10">
          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 md:p-8">
            <div className="mb-7 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">{dashboardTitle}</h2>

              {section === "music" ? (
                <Button
                  onClick={openAddTrack}
                  className="bg-[#ff003f] hover:bg-[#ff1a56] text-white"
                >
                  <Plus className="size-4" />
                  Add Track
                </Button>
              ) : (
                <Button
                  onClick={openAddEvent}
                  className="bg-[#ff003f] hover:bg-[#ff1a56] text-white"
                >
                  <Plus className="size-4" />
                  Add Event
                </Button>
              )}
            </div>

            {isLoading ? (
              <p className="text-[#9ca3af]">Loading data...</p>
            ) : section === "music" ? (
              <MusicManagementSection
                tracks={musicData.tracks}
                onEditTrack={openEditTrack}
                onDeleteTrack={handleTrackDelete}
              />
            ) : (
              <EventsManagementSection
                eventsData={eventsData}
                filteredTagSuggestions={filteredTagSuggestions}
                newTag={newTag}
                setNewTag={setNewTag}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                onEditEvent={openEditEvent}
                onDeleteEvent={handleEventDelete}
              />
            )}
          </div>
        </main>
      </div>

      <TrackFormDialog
        open={isTrackDialogOpen}
        onOpenChange={setIsTrackDialogOpen}
        isEditing={editingTrackIndex !== null}
        trackForm={trackForm}
        setTrackForm={setTrackForm}
        trackIdTouched={trackIdTouched}
        setTrackIdTouched={setTrackIdTouched}
        genreSuggestions={genreSuggestions}
        slugify={slugify}
        onSave={handleTrackSave}
      />

      <EventFormDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        isEditing={editingEventIndex !== null}
        eventForm={eventForm}
        setEventForm={setEventForm}
        selectedEventDate={selectedEventDate}
        onDateSelect={handleEventDateSelect}
        heroTags={eventsData.heroTags}
        onSave={handleEventSave}
      />
    </div>
  );
}
