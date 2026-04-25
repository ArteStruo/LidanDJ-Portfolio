import { NextRequest, NextResponse } from "next/server";

import { getAdminFromRequest } from "@/lib/admin-auth";
import type { MusicData, MusicTrack } from "@/lib/content-store";
import { readMusicData, writeMusicData } from "@/lib/content-store";

export const runtime = "nodejs";

function isMusicTrack(value: unknown): value is MusicTrack {
  if (!value || typeof value !== "object") {
    return false;
  }

  const track = value as MusicTrack;

  return (
    typeof track.id === "string" &&
    typeof track.title === "string" &&
    typeof track.url === "string" &&
    typeof track.genre === "string"
  );
}

function isMusicPayload(value: unknown): value is MusicData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as MusicData;

  return Array.isArray(payload.tracks) && payload.tracks.every(isMusicTrack);
}

export async function GET(request: NextRequest) {
  const payload = await getAdminFromRequest(request);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await readMusicData(), { status: 200 });
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

  if (!isMusicPayload(body)) {
    return NextResponse.json({ error: "Invalid music payload" }, { status: 400 });
  }

  try {
    await writeMusicData(body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to write music.json:", error);
    return NextResponse.json({ error: "Failed to save music" }, { status: 500 });
  }
}
