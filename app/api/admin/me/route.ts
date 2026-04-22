import { NextRequest, NextResponse } from "next/server";

import { getAdminFromRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const payload = await getAdminFromRequest(request);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: payload.sub }, { status: 200 });
}
