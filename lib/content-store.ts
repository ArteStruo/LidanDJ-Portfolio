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

const HOME_CONTENT_COLLECTION = "home_content";
const BOOKINGS_COLLECTION = "booking_requests";

const EVENTS_DOCUMENT_ID = "events";
const MUSIC_DOCUMENT_ID = "music";

export async function readEventsData(): Promise<EventsData> {
  const db = await getMongoDb();

  try {
    const collection = db.collection<EventsDocument>(HOME_CONTENT_COLLECTION);
    const doc = await collection.findOne({ _id: EVENTS_DOCUMENT_ID });

    if (doc && Array.isArray(doc.heroTags) && Array.isArray(doc.events)) {
      return { heroTags: doc.heroTags, events: doc.events };
    }

    return { heroTags: [], events: [] };
  } catch (error) {
    console.error("Failed to read events from MongoDB:", error);
    return { heroTags: [], events: [] };
  }
}

export async function writeEventsData(payload: EventsData) {
  const db = await getMongoDb();

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
}

export async function readMusicData(): Promise<MusicData> {
  const db = await getMongoDb();

  try {
    const collection = db.collection<MusicDocument>(HOME_CONTENT_COLLECTION);
    const doc = await collection.findOne({ _id: MUSIC_DOCUMENT_ID });

    if (doc && Array.isArray(doc.tracks)) {
      return { tracks: doc.tracks };
    }

    return { tracks: [] };
  } catch (error) {
    console.error("Failed to read music from MongoDB:", error);
    return { tracks: [] };
  }
}

export async function writeMusicData(payload: MusicData) {
  const db = await getMongoDb();

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
}

export async function readBookingRequests(): Promise<BookingRequest[]> {
  const db = await getMongoDb();

  try {
    const collection = db.collection<BookingDocument>(BOOKINGS_COLLECTION);
    const docs = await collection.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
    return docs;
  } catch (error) {
    console.error("Failed to read bookings from MongoDB:", error);
    return [];
  }
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

  const collection = db.collection<BookingDocument>(BOOKINGS_COLLECTION);
  await collection.insertOne({ _id: booking.id, ...booking });

  return booking;
}

export async function deleteBookingRequest(id: string): Promise<boolean> {
  const db = await getMongoDb();

  const collection = db.collection<BookingDocument>(BOOKINGS_COLLECTION);
  const result = await collection.deleteOne({ _id: id });
  return result.deletedCount > 0;
}
