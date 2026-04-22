import fs from "node:fs";
import path from "node:path";

import { MongoClient } from "mongodb";

const rootDir = process.cwd();
const envPath = path.join(rootDir, ".env");
const dataDir = path.join(rootDir, "data");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

loadEnvFile(envPath);

const mongoUri = process.env.MONGODB_CONNECTION_STRING;
const dbName = process.env.MONGODB_DB_NAME ?? "lidandj_portfolio";

if (!mongoUri) {
  console.error("Missing MONGODB_CONNECTION_STRING in environment.");
  process.exit(1);
}

const eventsData = readJson(path.join(dataDir, "events.json"), { heroTags: [], events: [] });
const musicData = readJson(path.join(dataDir, "music.json"), { tracks: [] });
const bookingsData = readJson(path.join(dataDir, "bookings.json"), { bookings: [] });

const client = new MongoClient(mongoUri);

try {
  await client.connect();

  const db = client.db(dbName);
  const homeContent = db.collection("home_content");
  const bookings = db.collection("booking_requests");

  await homeContent.updateOne(
    { _id: "events" },
    {
      $set: {
        heroTags: eventsData.heroTags,
        events: eventsData.events,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );

  await homeContent.updateOne(
    { _id: "music" },
    {
      $set: {
        tracks: musicData.tracks,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );

  if (Array.isArray(bookingsData.bookings) && bookingsData.bookings.length > 0) {
    for (const booking of bookingsData.bookings) {
      if (!booking?.id) {
        continue;
      }

      await bookings.updateOne(
        { _id: booking.id },
        {
          $set: {
            ...booking,
          },
        },
        { upsert: true }
      );
    }
  }

  console.log("MongoDB migration completed successfully.");
  console.log(`Database: ${dbName}`);
  console.log("Collections: home_content, booking_requests");
} catch (error) {
  console.error("MongoDB migration failed:", error);
  process.exitCode = 1;
} finally {
  await client.close();
}
