import type { HomeEvent, MusicTrack } from "@/lib/content-store";

export const genreSuggestions = ["Progressive House", "Techno", "Deep House", "Melodic House", "Electronic"];

export const heroTagSuggestions = [
  "Progressive House",
  "Electronic Music",
  "DJ Sri Lanka",
  "Underground Sets",
  "Techno",
  "Deep House",
  "Melodic Techno",
  "Afro House",
  "Minimal",
  "Tech House",
];

export const emptyTrack: MusicTrack = {
  id: "",
  title: "",
  genre: "",
  url: "",
};

export const emptyEvent: HomeEvent = {
  date: "",
  year: "",
  venue: "",
  location: "",
  tag: "",
};
