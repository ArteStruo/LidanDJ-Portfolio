import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/lib/mail/sendEmail";
import type { MailDTO } from "@/lib/mail/types";

export const runtime = "nodejs";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
  let body: MailDTO;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { fullName, email, subject, message } = body;

  if (
    !isNonEmptyString(fullName) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(subject) ||
    !isNonEmptyString(message)
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const result = await sendEmail({
      fullName: fullName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (!result.ok) {
      console.error("[contact-api] Mail send failed", {
        status: result.status,
        error: result.error,
      });

      return NextResponse.json(
        { error: "Could not send inquiry right now. Please try again later." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[contact-api] Unexpected send error", error);

    return NextResponse.json(
      { error: "Could not send inquiry right now. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
