import { NextRequest, NextResponse } from "next/server";

import { deleteBookingRequest, readBookingRequests } from "@/lib/content-store";
import { getAdminFromRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const payload = await getAdminFromRequest(request);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await readBookingRequests();
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Failed to read bookings:", error);
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = await getAdminFromRequest(request);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id")?.trim();

  if (!id) {
    return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
  }

  try {
    const deleted = await deleteBookingRequest(id);

    if (!deleted) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
