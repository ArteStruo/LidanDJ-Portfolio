import { env } from "@/lib/env";
import type { MailDTO, SendEmailResult } from "@/lib/mail/types";

const mailFromEmail = process.env.MAILJET_FROM_EMAIL ?? "lidanmusic.02@gmail.com";
const mailFromName = process.env.MAILJET_FROM_NAME ?? "LidanDJ Portfolio";
const mailToEmail = process.env.MAILJET_TO_EMAIL ?? "lidanmusic.02@gmail.com";
const mailToName = process.env.MAILJET_TO_NAME ?? "Booking Inbox";

export async function sendEmail(mailRequest: MailDTO): Promise<SendEmailResult> {
  const response = await fetch(env.MAILJET_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${env.MAILJET_APIKEY}:${env.MAILJET_SECRETKEY}`).toString("base64")}`,
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: mailFromEmail,
            Name: mailFromName,
          },
          To: [
            {
              Email: mailToEmail,
              Name: mailToName,
            },
          ],
          ReplyTo: {
            Email: mailRequest.email,
            Name: mailRequest.fullName,
          },
          Subject: mailRequest.subject,
          TextPart: [
            "New contact form message",
            `Name:    ${mailRequest.fullName}`,
            `Email:   ${mailRequest.email}`,
            `Subject: ${mailRequest.subject}`,
            "",
            "Message:",
            mailRequest.message,
          ].join("\n"),
        },
      ],
    }),
  });

  if (!response.ok) {
    const responseBody = await response.text();

    let parsedError: string | undefined;

    if (responseBody) {
      try {
        parsedError = JSON.stringify(JSON.parse(responseBody));
      } catch {
        parsedError = responseBody;
      }
    }

    return {
      ok: false,
      status: response.status,
      error: parsedError,
    };
  }

  return { ok: true, status: response.status };
}
