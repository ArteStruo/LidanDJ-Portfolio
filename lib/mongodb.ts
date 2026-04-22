import "server-only";

import { Db, MongoClient } from "mongodb";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

const connectionString = process.env.MONGODB_CONNECTION_STRING;
const dbName = process.env.MONGODB_DB_NAME ?? "lidandj_portfolio";

function decodeURIComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeMongoConnectionString(uri: string): string {
  if (!uri.includes("://")) {
    return uri;
  }

  const schemeSeparator = uri.indexOf("://");
  const scheme = uri.slice(0, schemeSeparator);
  const rest = uri.slice(schemeSeparator + 3);
  const slashIndex = rest.indexOf("/");
  const authority = slashIndex === -1 ? rest : rest.slice(0, slashIndex);
  const suffix = slashIndex === -1 ? "" : rest.slice(slashIndex);
  const atIndex = authority.lastIndexOf("@");

  if (atIndex === -1) {
    return uri;
  }

  const userInfo = authority.slice(0, atIndex);
  const host = authority.slice(atIndex + 1);
  const colonIndex = userInfo.indexOf(":");

  if (colonIndex === -1) {
    return uri;
  }

  const username = userInfo.slice(0, colonIndex);
  const password = userInfo.slice(colonIndex + 1);
  const normalizedPassword = encodeURIComponent(decodeURIComponentSafe(password));

  return `${scheme}://${username}:${normalizedPassword}@${host}${suffix}`;
}

function createClientPromise(): Promise<MongoClient> {
  if (!connectionString) {
    throw new Error("Missing required environment variable: MONGODB_CONNECTION_STRING");
  }

  return new MongoClient(normalizeMongoConnectionString(connectionString)).connect();
}

export async function getMongoDb(): Promise<Db | null> {
  if (!connectionString) {
    return null;
  }

  if (!global.__mongoClientPromise) {
    global.__mongoClientPromise = createClientPromise();
  }

  const client = await global.__mongoClientPromise;
  return client.db(dbName);
}
