import { NextRequest, NextResponse } from "next/server";

import { getAdminFromRequest } from "@/lib/admin-auth";
import type { EventsData, HomeEvent } from "@/lib/content-store";
import { readEventsData, writeEventsData } from "@/lib/content-store";

export const runtime = "nodejs";

function isHomeEvent(value: unknown): value is HomeEvent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const event = value as HomeEvent;

  return (
    typeof event.date === "string" &&
    typeof event.year === "string" &&
    typeof event.venue === "string" &&
    typeof event.location === "string" &&
    typeof event.tag === "string"
  );
}

function isEventsPayload(value: unknown): value is EventsData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as EventsData;

  return (
    Array.isArray(payload.heroTags) &&
    payload.heroTags.every((tag) => typeof tag === "string") &&
    Array.isArray(payload.events) &&
    payload.events.every(isHomeEvent)
  );
}

export async function GET(request: NextRequest) {
  const payload = await getAdminFromRequest(request);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(readEventsData(), { status: 200 });
}

export async function PUT(request: NextRequest) {
  const payload = await getAdminFromRequest(request);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isEventsPayload(body)) {
    return NextResponse.json({ error: "Invalid events payload" }, { status: 400 });
  }

  try {
    await writeEventsData(body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to write events.json:", error);
    return NextResponse.json({ error: "Failed to save events" }, { status: 500 });
  }
}
