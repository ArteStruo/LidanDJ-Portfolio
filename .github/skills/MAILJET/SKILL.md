# SKILL: Mailjet Email API (Fetch-based, No SDK)

This skill is based on a **raw `fetch` implementation** of the Mailjet Send API v3.1. It does not use the official Mailjet Node.js SDK — all requests are made directly via `fetch` with Basic Auth. This approach works in any environment that supports the Fetch API: Cloudflare Workers, Next.js API routes, Node.js 18+, Deno, and Bun.

---

## ⚡ START HERE — Detect the Project Stack

Inspect the project before writing any code. Run these checks in order and stop at the first match.

```bash
# 1. Cloudflare Workers / Wrangler
ls wrangler.toml 2>/dev/null            # exists → Cloudflare Workers
ls wrangler.jsonc 2>/dev/null           # exists → Cloudflare Workers

# 2. Next.js
cat package.json | grep '"next"'        # present → Next.js
ls next.config.ts 2>/dev/null           # exists  → Next.js
ls next.config.js 2>/dev/null           # exists  → Next.js

# 3. Next.js — determine router type
ls app/layout.tsx 2>/dev/null           # exists → App Router
ls pages/_app.tsx 2>/dev/null           # exists → Pages Router

# 4. Plain Node.js / Bun / Deno
cat package.json | grep '"node"'        # fallback — check engines field
ls index.ts 2>/dev/null
ls server.ts 2>/dev/null

# 5. Check for TypeScript
ls tsconfig.json 2>/dev/null            # exists → TypeScript in use
```

---

## 📍 Reading Path by Stack

| Detected Stack | Required Sections | Skip |
|---|---|---|
| **Cloudflare Workers** | §REF-1 → §REF-2 → §REF-3 → §CF-1 → §CF-2 → §CF-3 → §ERR-1 → §EXT-1 | §NX-* |
| **Next.js — App Router** | §REF-1 → §REF-2 → §REF-3 → §NX-1 → §NX-2 → §NX-3 → §ERR-1 → §EXT-1 | §CF-*, §NX-4 |
| **Next.js — Pages Router** | §REF-1 → §REF-2 → §REF-3 → §NX-1 → §NX-2 → §NX-4 → §ERR-1 → §EXT-1 | §CF-*, §NX-3 |
| **Node.js / Bun / Deno** | §REF-1 → §REF-2 → §REF-3 → §NODE-1 → §NODE-2 → §ERR-1 → §EXT-1 | §CF-*, §NX-* |

> **TypeScript detected?** Always include §REF-3 (types). All examples in this skill are TypeScript-first.

---
---

# REFERENCE SECTIONS
### All stacks read these first

---

## §REF-1 — How the Mailjet Send API Works

Mailjet's Send API v3.1 accepts a JSON `POST` request containing a `Messages` array. Each message object defines a `From`, one or more `To` recipients, an optional `ReplyTo`, a `Subject`, and at least one of `TextPart` or `HTMLPart`.

**Authentication** is HTTP Basic Auth: `base64(API_KEY + ':' + SECRET_KEY)` sent as the `Authorization` header. There is no token exchange step.

**Base endpoint:**
```
POST https://api.mailjet.com/v3.1/send
```

**Minimum required shape of the request body:**
```json
{
  "Messages": [
    {
      "From":    { "Email": "sender@example.com", "Name": "Sender" },
      "To":      [{ "Email": "recipient@example.com", "Name": "Recipient" }],
      "Subject": "Hello",
      "TextPart": "Plain text body"
    }
  ]
}
```

> The `Messages` array supports multiple independent messages per request, but in most application patterns a single message per call is clearest and easiest to debug.

---

## §REF-2 — Environment Variables

Three environment variables are required. Never hard-code credentials.

| Variable | Description |
|---|---|
| `MAILJET_APIKEY` | Public API key from the Mailjet dashboard |
| `MAILJET_SECRETKEY` | Secret API key from the Mailjet dashboard |
| `MAILJET_API` | The full endpoint URL: `https://api.mailjet.com/v3.1/send` |

> Storing the endpoint URL as an env var (rather than hard-coding it) makes it easy to swap in a mock/test URL during development without changing application code. This pattern comes directly from the source example and should be preserved.

**Where to set these:**

| Stack | Location |
|---|---|
| Cloudflare Workers | `wrangler.toml` → `[vars]` block, or Cloudflare dashboard → Secrets |
| Next.js | `.env.local` (never commit this file) |
| Node.js / Bun | `.env` file loaded via `dotenv`, or host environment |

---

## §REF-3 — Core Types

Define these types once. All functions and route handlers import from this file.

```typescript
// lib/mail/types.ts  (or src/mail/types.ts — match your project structure)

/** Inbound data from a contact form or API caller */
export type MailDTO = {
  fullName: string;
  email:    string;
  subject:  string;
  message:  string;
};

/** Successful response shape returned by sendEmail() */
export type MailSuccessResult = {
  status: number;
};

/** Mailjet API error detail (from response body) */
export type MailjetErrorMessage = {
  Errors: Array<{
    ErrorIdentifier: string;
    ErrorCode:       string;
    StatusCode:      number;
    ErrorMessage:    string;
    ErrorRelatedTo:  string[];
  }>;
  Status: string;
};

/** Union return type of sendEmail() */
export type SendEmailResult = MailSuccessResult | number;
```

---
---

# CLOUDFLARE WORKERS SECTIONS

---

## §CF-1 — Environment Binding

In Cloudflare Workers, environment variables and secrets are accessed via the `env` object passed to every handler. Type it explicitly to get IDE support and catch missing bindings at compile time.

```typescript
// src/index.ts  (your worker entry point)

export type ENV = {
  MAILJET_APIKEY:    string;
  MAILJET_SECRETKEY: string;
  MAILJET_API:       string;
  // Add other bindings here (KV, D1, R2, etc.)
};

export default {
  async fetch(request: Request, env: ENV): Promise<Response> {
    // env.MAILJET_APIKEY is available here
  },
} satisfies ExportedHandler<ENV>;
```

**`wrangler.toml` — non-secret variables:**
```toml
[vars]
MAILJET_API = "https://api.mailjet.com/v3.1/send"
# MAILJET_APIKEY and MAILJET_SECRETKEY should be set as Secrets, not vars
```

**Setting secrets via Wrangler CLI (never put secrets in wrangler.toml):**
```bash
npx wrangler secret put MAILJET_APIKEY
npx wrangler secret put MAILJET_SECRETKEY
```

**Local development — `.dev.vars` file (gitignored):**
```
MAILJET_APIKEY=your_api_key_here
MAILJET_SECRETKEY=your_secret_key_here
MAILJET_API=https://api.mailjet.com/v3.1/send
```

---

## §CF-2 — `sendEmail` Utility (Cloudflare Workers)

This is the direct implementation from the source example. Place it in a dedicated module — never inline it in a route handler.

```typescript
// src/mail/sendEmail.ts

import type { ENV }  from '../index';
import type { MailDTO, SendEmailResult } from './types';

export async function sendEmail(
  mailRequest: MailDTO,
  env: ENV
): Promise<SendEmailResult> {
  const response = await fetch(env.MAILJET_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(env.MAILJET_APIKEY + ':' + env.MAILJET_SECRETKEY),
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: 'noreply@yourdomain.com',  // ← replace with your verified sender
            Name:  'Your App Name',
          },
          To: [
            {
              Email: 'inbox@yourdomain.com',  // ← replace with your recipient
              Name:  'Your Name',
            },
          ],
          ReplyTo: {
            Email: mailRequest.email,
            Name:  mailRequest.fullName,
          },
          Subject: mailRequest.subject,
          TextPart: [
            'New contact form message',
            `Name:    ${mailRequest.fullName}`,
            `Email:   ${mailRequest.email}`,
            '',
            'Message:',
            mailRequest.message,
          ].join('\n'),
        },
      ],
    }),
  });

  if (!response.ok) {
    return response.status; // Caller receives the HTTP status code as a failure signal
  }

  return { status: response.status };
}
```

> **`From.Email` must be a verified sender in your Mailjet account.** Using an unverified sender address will result in a 400 error. Verify senders at: https://app.mailjet.com/account/sender

---

## §CF-3 — Route Handler (Cloudflare Workers)

```typescript
// src/routes/contact.ts

import type { ENV }    from '../index';
import { sendEmail }   from '../mail/sendEmail';
import type { MailDTO } from '../mail/types';

export async function handleContactRoute(
  request: Request,
  env: ENV
): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body: MailDTO;

  try {
    body = await request.json<MailDTO>();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic validation — extend as needed
  if (!body.fullName || !body.email || !body.subject || !body.message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await sendEmail(body, env);

  // sendEmail returns a raw status number on failure
  if (typeof result === 'number') {
    return new Response(JSON.stringify({ error: 'Failed to send email', code: result }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

**Wire it into your main worker:**
```typescript
// src/index.ts

import { handleContactRoute } from './routes/contact';

export default {
  async fetch(request: Request, env: ENV): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      return handleContactRoute(request, env);
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<ENV>;
```

---
---

# NEXT.JS SECTIONS

---

## §NX-1 — Environment Variables Setup

```bash
# .env.local  (gitignored — never commit)
MAILJET_APIKEY=your_api_key_here
MAILJET_SECRETKEY=your_secret_key_here
MAILJET_API=https://api.mailjet.com/v3.1/send
```

> In Next.js, environment variables without the `NEXT_PUBLIC_` prefix are **server-only**. Mailjet credentials must never have that prefix — they should never reach the browser bundle.

**Type-safe env helper (recommended):**
```typescript
// lib/env.ts

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

export const env = {
  MAILJET_APIKEY:    requireEnv('MAILJET_APIKEY'),
  MAILJET_SECRETKEY: requireEnv('MAILJET_SECRETKEY'),
  MAILJET_API:       requireEnv('MAILJET_API'),
} as const;
```

---

## §NX-2 — `sendEmail` Utility (Next.js / Node)

```typescript
// lib/mail/sendEmail.ts

import { env }       from '@/lib/env';
import type { MailDTO, SendEmailResult } from './types';

export async function sendEmail(
  mailRequest: MailDTO
): Promise<SendEmailResult> {
  const response = await fetch(env.MAILJET_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(
        `${env.MAILJET_APIKEY}:${env.MAILJET_SECRETKEY}`
      ).toString('base64'), // Buffer.from is preferred over btoa() in Node.js
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: 'noreply@yourdomain.com',  // ← verified sender
            Name:  'Your App Name',
          },
          To: [
            {
              Email: 'inbox@yourdomain.com',
              Name:  'Your Name',
            },
          ],
          ReplyTo: {
            Email: mailRequest.email,
            Name:  mailRequest.fullName,
          },
          Subject: mailRequest.subject,
          TextPart: [
            'New contact form message',
            `Name:    ${mailRequest.fullName}`,
            `Email:   ${mailRequest.email}`,
            '',
            'Message:',
            mailRequest.message,
          ].join('\n'),
        },
      ],
    }),
  });

  if (!response.ok) {
    return response.status;
  }

  return { status: response.status };
}
```

> **`btoa()` vs `Buffer.from()`:** The source example uses `btoa()` which works in Cloudflare Workers and modern browsers. In Node.js (Next.js API routes), prefer `Buffer.from(...).toString('base64')` — it handles non-ASCII characters correctly and is the Node.js idiom.

---

## §NX-3 — Route Handler (App Router)

App Router API routes are Server Components by default — no `'use client'` needed. They run exclusively on the server, so secrets are safe.

```typescript
// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sendEmail }                  from '@/lib/mail/sendEmail';
import type { MailDTO }               from '@/lib/mail/types';

export async function POST(request: NextRequest) {
  let body: MailDTO;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { fullName, email, subject, message } = body;

  if (!fullName || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const result = await sendEmail({ fullName, email, subject, message });

  if (typeof result === 'number') {
    return NextResponse.json(
      { error: 'Failed to send email', code: result },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
```

---

## §NX-4 — Route Handler (Pages Router)

```typescript
// pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail }                             from '@/lib/mail/sendEmail';
import type { MailDTO }                          from '@/lib/mail/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fullName, email, subject, message } = req.body as MailDTO;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const result = await sendEmail({ fullName, email, subject, message });

  if (typeof result === 'number') {
    return res.status(502).json({ error: 'Failed to send email', code: result });
  }

  return res.status(200).json({ success: true });
}
```

---
---

# NODE.JS / BUN / DENO SECTIONS

---

## §NODE-1 — Environment Setup

```typescript
// lib/env.ts  — load before any other imports that need env vars

import 'dotenv/config'; // npm i dotenv  (Node.js only — Bun and Deno load .env natively)

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

export const env = {
  MAILJET_APIKEY:    requireEnv('MAILJET_APIKEY'),
  MAILJET_SECRETKEY: requireEnv('MAILJET_SECRETKEY'),
  MAILJET_API:       requireEnv('MAILJET_API'),
} as const;
```

**`.env` file:**
```
MAILJET_APIKEY=your_api_key_here
MAILJET_SECRETKEY=your_secret_key_here
MAILJET_API=https://api.mailjet.com/v3.1/send
```

---

## §NODE-2 — `sendEmail` Utility (Node / Bun / Deno)

The implementation is identical to §NX-2. Import from the shared `lib/mail/sendEmail.ts` — do not duplicate it.

If running **Node.js < 18** (where `fetch` is not available globally):
```bash
npm i node-fetch
```
```typescript
import fetch from 'node-fetch';
```

For **Node.js 18+**, **Bun**, and **Deno**, the global `fetch` is available — no import needed.

---
---

# ERROR HANDLING

---

## §ERR-1 — Error Handling Patterns

### Current behaviour (from source example)

`sendEmail()` returns either a `{ status: number }` object on success, or a raw `number` (the HTTP status code) on failure. The caller distinguishes them with `typeof result === 'number'`.

```typescript
const result = await sendEmail(mailRequest, env);

if (typeof result === 'number') {
  // Mailjet returned a non-2xx status
  console.error('Mailjet error, HTTP status:', result);
}
```

### Improved pattern — typed error result

For more informative error handling, extend the return type to include the error body:

```typescript
// lib/mail/types.ts — add to existing types

export type MailFailureResult = {
  status:  number;
  error:   string;
  body?:   unknown;
};

export type SendEmailResult = MailSuccessResult | MailFailureResult;
```

```typescript
// lib/mail/sendEmail.ts — updated failure branch

if (!response.ok) {
  let body: unknown;
  try { body = await response.json(); } catch { /* non-JSON error body */ }

  return {
    status: response.status,
    error:  `Mailjet API error: ${response.status} ${response.statusText}`,
    body,
  };
}
```

```typescript
// Caller — updated check

const result = await sendEmail(mailRequest, env);

if ('error' in result) {
  console.error(result.error, result.body);
  // Handle gracefully — return 502 to client, log internally
}
```

### Common Mailjet HTTP error codes

| Status | Meaning | Likely cause |
|---|---|---|
| 400 | Bad Request | Malformed JSON, invalid email address format, missing required field |
| 401 | Unauthorised | Wrong API key or secret — check credentials |
| 403 | Forbidden | Sender address not verified in Mailjet account |
| 429 | Too Many Requests | Rate limit hit — implement exponential backoff |
| 500 | Mailjet Internal Error | Transient — retry with backoff |

---
---

# EXTENSIONS

---

## §EXT-1 — Common Extensions to the Base Pattern

### Adding HTML body

```typescript
// In the Messages[0] object — add alongside or instead of TextPart
HTMLPart: `
  <h2>New Contact Message</h2>
  <p><strong>Name:</strong> ${mailRequest.fullName}</p>
  <p><strong>Email:</strong> ${mailRequest.email}</p>
  <hr />
  <p>${mailRequest.message.replace(/\n/g, '<br />')}</p>
`,
```

> Always provide both `TextPart` and `HTMLPart` when using HTML — email clients that don't render HTML will fall back to `TextPart`.

### Sending to multiple recipients

```typescript
To: [
  { Email: 'admin@example.com',  Name: 'Admin' },
  { Email: 'team@example.com',   Name: 'Team Inbox' },
],
```

### CC and BCC

```typescript
Cc:  [{ Email: 'cc@example.com',  Name: 'CC Recipient' }],
Bcc: [{ Email: 'bcc@example.com', Name: 'BCC Recipient' }],
```

### Custom headers (e.g. tracking ID)

```typescript
Headers: {
  'X-Contact-Source': 'website-contact-form',
},
```

### Extending `MailDTO` for HTML or attachments

```typescript
// lib/mail/types.ts

export type MailDTO = {
  fullName:   string;
  email:      string;
  subject:    string;
  message:    string;
  htmlMessage?: string;    // optional HTML version
  replyTo?:   string;      // override reply-to if different from email
};
```

---
---

# QUICK REFERENCE

```
STEP 0 — DETECT STACK
  wrangler.toml exists              → Cloudflare Workers  → §REF + §CF-1 + §CF-2 + §CF-3
  next in package.json + app/       → Next.js App Router  → §REF + §NX-1 + §NX-2 + §NX-3
  next in package.json + pages/     → Next.js Pages Router → §REF + §NX-1 + §NX-2 + §NX-4
  neither → Node / Bun / Deno       → §REF + §NODE-1 + §NODE-2

ALWAYS READ
  §REF-1  How Mailjet Send API v3.1 works
  §REF-2  Environment variables (names, locations, never commit)
  §REF-3  Core TypeScript types (MailDTO, SendEmailResult)
  §ERR-1  Error handling patterns and HTTP error codes
  §EXT-1  Common extensions (HTML body, multiple recipients, CC/BCC)

KEY RULES
  - From.Email MUST be verified in the Mailjet dashboard
  - Never use btoa() in Node.js — use Buffer.from(...).toString('base64')
  - Never put MAILJET_APIKEY/SECRETKEY in client-side code or NEXT_PUBLIC_ vars
  - In Cloudflare Workers, set secrets via `wrangler secret put`, never in wrangler.toml
  - Always check typeof result === 'number' (or 'error' in result) before using the response
  - Store MAILJET_API as an env var so it can be mocked in tests without code changes

MAILJET SEND API ENDPOINT
  POST https://api.mailjet.com/v3.1/send
  Auth: Basic base64(APIKEY:SECRETKEY)

REQUIRED MESSAGE FIELDS
  From.Email / From.Name
  To[].Email / To[].Name
  Subject
  TextPart (and/or HTMLPart)
```