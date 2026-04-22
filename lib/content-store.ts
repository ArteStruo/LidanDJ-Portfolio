import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";

import { getMongoDb } from "@/lib/mongodb";

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

export type BookingRequest = {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type BookingRequestsData = {
  bookings: BookingRequest[];
};

type EventsDocument = EventsData & { _id: string; updatedAt?: string };
type MusicDocument = MusicData & { _id: string; updatedAt?: string };
type BookingDocument = BookingRequest & { _id: string };

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_PATH = path.join(DATA_DIR, "events.json");
const MUSIC_PATH = path.join(DATA_DIR, "music.json");
const BOOKINGS_PATH = path.join(DATA_DIR, "bookings.json");

const HOME_CONTENT_COLLECTION = "home_content";
const BOOKINGS_COLLECTION = "booking_requests";

const EVENTS_DOCUMENT_ID = "events";
const MUSIC_DOCUMENT_ID = "music";

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
  await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
  await fsPromises.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function readEventsDataFromJson(): EventsData {
  maybeLogReadPath("events", EVENTS_PATH);
  return readJsonFile<EventsData>(EVENTS_PATH);
}

function readMusicDataFromJson(): MusicData {
  maybeLogReadPath("music", MUSIC_PATH);
  return readJsonFile<MusicData>(MUSIC_PATH);
}

function readBookingsDataFromJson(): BookingRequestsData {
  try {
    return readJsonFile<BookingRequestsData>(BOOKINGS_PATH);
  } catch {
    return { bookings: [] };
  }
}

async function writeBookingsDataToJson(payload: BookingRequestsData) {
  await writeJsonFile(BOOKINGS_PATH, payload);
}

async function writeEventsDataToJson(payload: EventsData) {
  await writeJsonFile(EVENTS_PATH, payload);
}

async function writeMusicDataToJson(payload: MusicData) {
  await writeJsonFile(MUSIC_PATH, payload);
}

export async function readEventsData(): Promise<EventsData> {
  const db = await getMongoDb();

  if (!db) {
    return readEventsDataFromJson();
  }

  try {
    const collection = db.collection<EventsData & { _id: string }>(HOME_CONTENT_COLLECTION);
    const doc = await collection.findOne({ _id: EVENTS_DOCUMENT_ID });

    if (doc && Array.isArray(doc.heroTags) && Array.isArray(doc.events)) {
      return { heroTags: doc.heroTags, events: doc.events };
    }
  } catch (error) {
    console.error("Failed to read events from MongoDB, falling back to JSON:", error);
  }

  return readEventsDataFromJson();
}

export async function writeEventsData(payload: EventsData) {
  const db = await getMongoDb();

  if (db) {
    try {
      const collection = db.collection<EventsDocument>(HOME_CONTENT_COLLECTION);

      await collection.updateOne(
        { _id: EVENTS_DOCUMENT_ID },
        {
          $set: {
            heroTags: payload.heroTags,
            events: payload.events,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
    } catch (error) {
      console.error("Failed to write events to MongoDB, mirroring only to JSON:", error);
    }
  }

  await writeEventsDataToJson(payload);
}

export async function readMusicData(): Promise<MusicData> {
  const db = await getMongoDb();

  if (!db) {
    return readMusicDataFromJson();
  }

  try {
    const collection = db.collection<MusicDocument>(HOME_CONTENT_COLLECTION);
    const doc = await collection.findOne({ _id: MUSIC_DOCUMENT_ID });

    if (doc && Array.isArray(doc.tracks)) {
      return { tracks: doc.tracks };
    }
  } catch (error) {
    console.error("Failed to read music from MongoDB, falling back to JSON:", error);
  }

  return readMusicDataFromJson();
}

export async function writeMusicData(payload: MusicData) {
  const db = await getMongoDb();

  if (db) {
    try {
      const collection = db.collection<MusicDocument>(HOME_CONTENT_COLLECTION);

      await collection.updateOne(
        { _id: MUSIC_DOCUMENT_ID },
        {
          $set: {
            tracks: payload.tracks,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
    } catch (error) {
      console.error("Failed to write music to MongoDB, mirroring only to JSON:", error);
    }
  }

  await writeMusicDataToJson(payload);
}

export async function readBookingRequests(): Promise<BookingRequest[]> {
  const db = await getMongoDb();

  if (db) {
    try {
      const collection = db.collection<BookingDocument>(BOOKINGS_COLLECTION);
      const docs = await collection.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return docs;
    } catch (error) {
      console.error("Failed to read bookings from MongoDB, falling back to JSON:", error);
    }
  }

  const { bookings } = readBookingsDataFromJson();
  return [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createBookingRequest(
  payload: Omit<BookingRequest, "id" | "createdAt">
): Promise<BookingRequest> {
  const booking: BookingRequest = {
    id: crypto.randomUUID(),
    fullName: payload.fullName,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
    createdAt: new Date().toISOString(),
  };

  const db = await getMongoDb();

  if (db) {
    try {
      const collection = db.collection<BookingDocument>(BOOKINGS_COLLECTION);
      await collection.insertOne({ _id: booking.id, ...booking });
    } catch (error) {
      console.error("Failed to write booking to MongoDB, mirroring only to JSON:", error);
    }
  }

  const current = readBookingsDataFromJson();
  await writeBookingsDataToJson({ bookings: [booking, ...current.bookings] });

  return booking;
}

export async function deleteBookingRequest(id: string): Promise<boolean> {
  let deletedInMongo = false;

  const db = await getMongoDb();

  if (db) {
    try {
      const collection = db.collection<BookingDocument>(BOOKINGS_COLLECTION);
      const result = await collection.deleteOne({ _id: id });
      deletedInMongo = result.deletedCount > 0;
    } catch (error) {
      console.error("Failed to delete booking from MongoDB:", error);
    }
  }

  const current = readBookingsDataFromJson();
  const next = current.bookings.filter((booking) => booking.id !== id);
  const deletedInJson = next.length !== current.bookings.length;

  if (deletedInJson) {
    await writeBookingsDataToJson({ bookings: next });
  }

  return deletedInMongo || deletedInJson;
}
