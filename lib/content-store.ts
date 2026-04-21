import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";

export type HomeEvent = {
  date: string;
  year: string;
  venue: string;
  location: string;
  tag: string;
};

export type EventsData = {
  heroTags: string[];
  events: HomeEvent[];
};

export type MusicTrack = {
  id: string;
  title: string;
  url: string;
  genre: string;
};

export type MusicData = {
  tracks: MusicTrack[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_PATH = path.join(DATA_DIR, "events.json");
const MUSIC_PATH = path.join(DATA_DIR, "music.json");

let hasLoggedEventsReadPath = false;
let hasLoggedMusicReadPath = false;

function maybeLogReadPath(kind: "events" | "music", filePath: string) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (kind === "events" && !hasLoggedEventsReadPath) {
    console.log("Reading events from:", filePath);
    hasLoggedEventsReadPath = true;
  }

  if (kind === "music" && !hasLoggedMusicReadPath) {
    console.log("Reading music from:", filePath);
    hasLoggedMusicReadPath = true;
  }
}

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile<T>(filePath: string, payload: T) {
  await fsPromises.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

export function readEventsData(): EventsData {
  maybeLogReadPath("events", EVENTS_PATH);
  return readJsonFile<EventsData>(EVENTS_PATH);
}

export async function writeEventsData(payload: EventsData) {
  await writeJsonFile(EVENTS_PATH, payload);
}

export function readMusicData(): MusicData {
  maybeLogReadPath("music", MUSIC_PATH);
  return readJsonFile<MusicData>(MUSIC_PATH);
}

export async function writeMusicData(payload: MusicData) {
  await writeJsonFile(MUSIC_PATH, payload);
}
