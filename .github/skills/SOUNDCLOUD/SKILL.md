# SKILL: SoundCloud HTML5 Widget API

---

## ⚡ START HERE — Detect the Project Stack

Before writing any code, inspect the project to determine the tech stack. Run the checks below in order and stop at the first match.

### Detection Checklist

```bash
# 1. Check for Next.js
cat package.json | grep '"next"'        # present → Next.js project
ls next.config.js 2>/dev/null           # exists  → Next.js project
ls next.config.ts 2>/dev/null           # exists  → Next.js project

# 2. If Next.js — determine router type
ls app/layout.tsx 2>/dev/null           # exists  → App Router
ls app/layout.js  2>/dev/null           # exists  → App Router
ls pages/_app.tsx 2>/dev/null           # exists  → Pages Router
ls pages/_app.js  2>/dev/null           # exists  → Pages Router

# 3. Check for TypeScript (any project)
ls tsconfig.json 2>/dev/null            # exists  → TypeScript in use

# 4. Check for plain React (non-Next)
cat package.json | grep '"react"'       # present (without "next") → Vite / CRA / React

# 5. Fallback — no package.json
ls package.json 2>/dev/null             # missing → Vanilla HTML/JS
```

---

## 📍 Reading Path by Stack

Once the stack is identified, follow **only** the sections listed for that stack. Do not read sections not listed — they introduce irrelevant patterns.

| Detected Stack | Required Sections | Skip |
|---|---|---|
| **Next.js — App Router** | §REF-1 → §REF-2 → §REF-3 → §REF-4 → §REF-5 → §NX-1 → §NX-2 → §NX-3 → §NX-4 → §NX-5 → §NX-6 → §NX-8 → §NX-9 → §NX-10 | §VAN-*, §NX-7 |
| **Next.js — Pages Router** | §REF-1 → §REF-2 → §REF-3 → §REF-4 → §REF-5 → §NX-1 → §NX-2 → §NX-3 → §NX-4 → §NX-5 → §NX-7 → §NX-8 → §NX-9 → §NX-10 | §VAN-*, §NX-6 |
| **React — Vite / CRA** | §REF-1 → §REF-2 → §REF-3 → §REF-4 → §REF-5 → §NX-1 → §NX-2 → §NX-3 → §NX-4 → §NX-5 → §NX-8 → §NX-9 → §NX-10 | §VAN-*, §NX-6, §NX-7 |
| **Vanilla HTML/JS** | §REF-1 → §REF-2 → §REF-3 → §REF-4 → §REF-5 → §VAN-1 → §VAN-2 | All §NX-* |

> **TypeScript detected on any stack?** Always include §NX-1 (type declarations) — even vanilla projects using `.ts` files benefit from the typed global augmentation.

---
---

# REFERENCE SECTIONS
### All stacks read these first

---

## §REF-1 — How the Widget API Works

The SoundCloud Widget API controls an embedded `<iframe>` player from the parent page via `window.postMessage`. This has two critical consequences:

1. **All getter methods are asynchronous and callback-based** — there is no synchronous return value. Ever.
2. **The widget is not ready immediately** — you must wait for the `READY` event before calling any API methods.

The API script (`api.js`) exposes a single global: `SC.Widget`. Pass it a reference to your iframe element (or its string ID) to receive a controllable widget instance.

---

## §REF-2 — Embed URL Parameters

These parameters are appended as query string values to the iframe `src` URL. They configure the initial visual state and behaviour of the player.

| Parameter        | Type       | Default | Description                                                         |
|-----------------|------------|---------|---------------------------------------------------------------------|
| `url`            | string     | —       | **Required.** The SoundCloud track/playlist URL (must be encoded)   |
| `auto_play`      | true/false | false   | Start playing immediately on load                                   |
| `color`          | hex string | —       | Play button / controls colour — encode `#` as `%23`                |
| `buying`         | true/false | true    | Show/hide the buy button                                            |
| `sharing`        | true/false | true    | Show/hide the share button                                          |
| `download`       | true/false | true    | Show/hide the download button                                       |
| `show_artwork`   | true/false | true    | Show/hide track artwork                                             |
| `show_playcount` | true/false | true    | Show/hide play count                                                |
| `show_user`      | true/false | true    | Show/hide uploader name                                             |
| `start_track`    | number     | 0       | 0-based index of the track to preselect in a playlist               |
| `single_active`  | true/false | true    | When false, multiple players on the page won't pause each other     |

> **Never build this URL by hand inside a component.** Use the `buildWidgetUrl()` utility defined in §NX-2 (React/Next.js) or the manual pattern in §VAN-1 (vanilla).

---

## §REF-3 — Playback Control Methods

All methods are called on the widget instance returned by `SC.Widget()`.

```
widget.play()             Start playback
widget.pause()            Pause playback
widget.toggle()           Toggle play/pause
widget.seekTo(ms)         Jump to position in milliseconds
widget.setVolume(0–100)   Set volume level
widget.next()             Skip to next sound        [playlist only]
widget.prev()             Skip to previous sound    [playlist only]
widget.skip(index)        Jump to sound at 0-based index  [playlist only]
widget.load(url, options) Reload the player with a new URL (preserves event listeners)
```

The `load()` options object accepts all §REF-2 parameters plus a `callback` function fired when the new widget is ready.

---

## §REF-4 — Getter Methods (Always Async)

Getters communicate over `postMessage` and **cannot** return values synchronously. Every getter takes a callback as its only argument.

```javascript
widget.getVolume(cb)            // cb(volume: number)        range 0–100
widget.getDuration(cb)          // cb(duration: number)      milliseconds
widget.getPosition(cb)          // cb(position: number)      milliseconds
widget.getSounds(cb)            // cb(sounds: object[])      all sounds in widget
widget.getCurrentSound(cb)      // cb(sound: object)         currently playing sound
widget.getCurrentSoundIndex(cb) // cb(index: number)         0-based index
widget.isPaused(cb)             // cb(paused: boolean)
```

```javascript
// ❌ WRONG — always returns undefined
const pos = widget.getPosition();

// ✅ CORRECT — consume the value inside the callback
widget.getPosition((pos) => console.log(pos));
```

---

## §REF-5 — Events

Always use `SC.Widget.Events.*` constants — never hard-code the string values.

### Binding / Unbinding

```javascript
widget.bind(SC.Widget.Events.PLAY, handler);
widget.unbind(SC.Widget.Events.PLAY); // removes ALL listeners for this event — no per-listener unbind exists
```

### Audio Events — payload: `{ relativePosition, loadProgress, currentPosition }`

| Constant | Fires when… |
|---|---|
| `SC.Widget.Events.LOAD_PROGRESS` | Periodically while loading |
| `SC.Widget.Events.PLAY_PROGRESS` | Periodically while playing |
| `SC.Widget.Events.PLAY`          | Playback begins |
| `SC.Widget.Events.PAUSE`         | Playback pauses |
| `SC.Widget.Events.FINISH`        | Track ends |
| `SC.Widget.Events.SEEK`          | User seeks |

### UI Events — no payload

| Constant | Fires when… |
|---|---|
| `SC.Widget.Events.READY`             | Widget loaded — API calls now safe |
| `SC.Widget.Events.CLICK_DOWNLOAD`    | User clicks download |
| `SC.Widget.Events.CLICK_BUY`         | User clicks buy |
| `SC.Widget.Events.OPEN_SHARE_PANEL`  | Share panel opened (also fires at end of last track) |
| `SC.Widget.Events.ERROR`             | Error displayed in widget |

---
---

# NEXT.JS & REACT SECTIONS
### Next.js App Router · Next.js Pages Router · React (Vite/CRA)

---

## §NX-1 — TypeScript Type Declarations

Create this file once. All other files import from it — never redeclare types elsewhere.

```typescript
// lib/soundcloud/types.ts

export interface SCWidgetEventData {
  relativePosition: number; // [0, 1]
  loadProgress: number;     // [0, 1]
  currentPosition: number;  // milliseconds
}

export interface SCSound {
  id: number;
  title: string;
  duration: number;
  permalink_url: string;
  artwork_url: string | null;
  user: { username: string };
  [key: string]: unknown;
}

export interface SCWidgetOptions {
  auto_play?: boolean;
  color?: string;          // raw hex e.g. '#ff5500' — builder handles encoding
  buying?: boolean;
  sharing?: boolean;
  download?: boolean;
  show_artwork?: boolean;
  show_playcount?: boolean;
  show_user?: boolean;
  start_track?: number;
  single_active?: boolean;
  callback?: () => void;
}

export interface SCWidgetInstance {
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(milliseconds: number): void;
  setVolume(volume: number): void;
  next(): void;
  prev(): void;
  skip(soundIndex: number): void;
  load(url: string, options?: SCWidgetOptions): void;
  bind(eventName: string, listener: (e?: SCWidgetEventData) => void): void;
  unbind(eventName: string): void;
  getVolume(callback: (volume: number) => void): void;
  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  getSounds(callback: (sounds: SCSound[]) => void): void;
  getCurrentSound(callback: (sound: SCSound) => void): void;
  getCurrentSoundIndex(callback: (index: number) => void): void;
  isPaused(callback: (paused: boolean) => void): void;
}

export interface SCWidgetStatic {
  (iframeElementOrId: HTMLIFrameElement | string): SCWidgetInstance;
  Events: {
    LOAD_PROGRESS: string;
    PLAY_PROGRESS: string;
    PLAY: string;
    PAUSE: string;
    FINISH: string;
    SEEK: string;
    READY: string;
    CLICK_DOWNLOAD: string;
    CLICK_BUY: string;
    OPEN_SHARE_PANEL: string;
    ERROR: string;
  };
}

// Augments the global Window type so TypeScript knows about window.SC
declare global {
  interface Window {
    SC?: { Widget: SCWidgetStatic };
  }
}
```

---

## §NX-2 — Shared Utilities

Two pure utility files used by all React/Next.js patterns. Define them once, import everywhere.

### URL Builder

```typescript
// lib/soundcloud/buildWidgetUrl.ts

import type { SCWidgetOptions } from './types';

const WIDGET_BASE = 'https://w.soundcloud.com/player/';

/**
 * Builds a fully-encoded SoundCloud widget src URL.
 * Pass a raw hex color — # encoding is handled internally.
 */
export function buildWidgetUrl(
  trackUrl: string,
  options: Omit<SCWidgetOptions, 'callback'> = {}
): string {
  const params = new URLSearchParams({ url: trackUrl });

  const map: Record<string, string | undefined> = {
    auto_play:      options.auto_play      != null ? String(options.auto_play)             : undefined,
    color:          options.color          != null ? options.color.replace('#', '%23')      : undefined,
    buying:         options.buying         != null ? String(options.buying)                : undefined,
    sharing:        options.sharing        != null ? String(options.sharing)               : undefined,
    download:       options.download       != null ? String(options.download)              : undefined,
    show_artwork:   options.show_artwork   != null ? String(options.show_artwork)          : undefined,
    show_playcount: options.show_playcount != null ? String(options.show_playcount)        : undefined,
    show_user:      options.show_user      != null ? String(options.show_user)             : undefined,
    start_track:    options.start_track    != null ? String(options.start_track)           : undefined,
    single_active:  options.single_active  != null ? String(options.single_active)         : undefined,
  };

  for (const [key, value] of Object.entries(map)) {
    if (value !== undefined) params.set(key, value);
  }

  return `${WIDGET_BASE}?${params.toString()}`;
}
```

### Script Loader (Singleton)

Loads `api.js` exactly once per page regardless of how many components call it. Returns a Promise resolving with `SC.Widget`.

```typescript
// lib/soundcloud/loadScript.ts

import type { SCWidgetStatic } from './types';

const SCRIPT_SRC = 'https://w.soundcloud.com/player/api.js';
let   loadPromise: Promise<SCWidgetStatic> | null = null;

/**
 * Idempotent script loader. Safe to call from multiple components —
 * the <script> tag is only ever injected once, even across hot reloads.
 */
export function loadSoundCloudScript(): Promise<SCWidgetStatic> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<SCWidgetStatic>((resolve, reject) => {
    // Already loaded (e.g. hot reload, or next/script injected it)
    if (window.SC?.Widget) {
      resolve(window.SC.Widget);
      return;
    }

    const script   = document.createElement('script');
    script.src     = SCRIPT_SRC;
    script.async   = true;
    script.onload  = () =>
      window.SC?.Widget
        ? resolve(window.SC.Widget)
        : reject(new Error('SC.Widget not found after script load'));
    script.onerror = () => reject(new Error('Failed to load SoundCloud Widget API'));

    document.head.appendChild(script);
  });

  return loadPromise;
}
```

> **Why module-level singleton?** React components mount and unmount repeatedly. Without this guard, each mount injects a duplicate `<script>` tag, re-initialises the global, and breaks any existing widget instances on the page.

---

## §NX-3 — `useSoundCloudWidget` Hook

The single hook all components must use. Handles: SSR safety, script loading, widget instantiation, the `READY` gate, declarative event binding, and full cleanup on unmount.

```typescript
// lib/soundcloud/useSoundCloudWidget.ts

import { useEffect, useRef, useCallback, RefObject } from 'react';
import { loadSoundCloudScript }                      from './loadScript';
import type { SCWidgetInstance, SCWidgetOptions, SCWidgetEventData } from './types';

export interface WidgetEventHandlers {
  onReady?:          () => void;
  onPlay?:           (e: SCWidgetEventData) => void;
  onPause?:          (e: SCWidgetEventData) => void;
  onFinish?:         (e: SCWidgetEventData) => void;
  onSeek?:           (e: SCWidgetEventData) => void;
  onPlayProgress?:   (e: SCWidgetEventData) => void;
  onLoadProgress?:   (e: SCWidgetEventData) => void;
  onError?:          () => void;
  onClickDownload?:  () => void;
  onClickBuy?:       () => void;
  onOpenSharePanel?: () => void;
}

export interface UseSoundCloudWidgetOptions extends SCWidgetOptions {
  events?: WidgetEventHandlers;
}

export interface UseSoundCloudWidgetReturn {
  widgetRef: RefObject<HTMLIFrameElement | null>;
  isReady:   boolean;
  // Stable memoised wrappers — safe to pass as props without causing extra renders
  play:      () => void;
  pause:     () => void;
  toggle:    () => void;
  seekTo:    (ms: number) => void;
  setVolume: (volume: number) => void;
  next:      () => void;
  prev:      () => void;
  skip:      (index: number) => void;
}

export function useSoundCloudWidget(
  options: UseSoundCloudWidgetOptions = {}
): UseSoundCloudWidgetReturn {
  const widgetRef   = useRef<HTMLIFrameElement | null>(null);
  const instanceRef = useRef<SCWidgetInstance | null>(null);
  const isReadyRef  = useRef(false);
  // Stable ref to options — prevents the effect from re-running on every render
  const optionsRef  = useRef(options);
  useEffect(() => { optionsRef.current = options; });

  useEffect(() => {
    // SSR guard — window does not exist on the server
    if (typeof window === 'undefined') return;
    if (!widgetRef.current) return;

    let cancelled = false;

    loadSoundCloudScript()
      .then((SCWidget) => {
        if (cancelled || !widgetRef.current) return;

        const widget          = SCWidget(widgetRef.current);
        instanceRef.current   = widget;
        const { events = {} } = optionsRef.current;

        // Bind every declared handler to its corresponding event constant
        const bindings: Array<[string, ((e?: SCWidgetEventData) => void) | undefined]> = [
          [SCWidget.Events.PLAY,             events.onPlay],
          [SCWidget.Events.PAUSE,            events.onPause],
          [SCWidget.Events.FINISH,           events.onFinish],
          [SCWidget.Events.SEEK,             events.onSeek],
          [SCWidget.Events.PLAY_PROGRESS,    events.onPlayProgress],
          [SCWidget.Events.LOAD_PROGRESS,    events.onLoadProgress],
          [SCWidget.Events.ERROR,            events.onError],
          [SCWidget.Events.CLICK_DOWNLOAD,   events.onClickDownload],
          [SCWidget.Events.CLICK_BUY,        events.onClickBuy],
          [SCWidget.Events.OPEN_SHARE_PANEL, events.onOpenSharePanel],
        ];

        for (const [event, handler] of bindings) {
          if (handler) widget.bind(event, handler);
        }

        // READY binds last — it signals the widget is fully initialised
        widget.bind(SCWidget.Events.READY, () => {
          if (cancelled) return;
          isReadyRef.current = true;
          events.onReady?.();
        });
      })
      .catch((err) => console.error('[useSoundCloudWidget]', err));

    return () => {
      cancelled = true;
      // Unbind all events on unmount — prevents memory leaks and stale closures
      if (instanceRef.current && window.SC?.Widget) {
        const { Events } = window.SC.Widget;
        [
          Events.READY, Events.PLAY, Events.PAUSE, Events.FINISH,
          Events.SEEK, Events.PLAY_PROGRESS, Events.LOAD_PROGRESS,
          Events.ERROR, Events.CLICK_DOWNLOAD, Events.CLICK_BUY,
          Events.OPEN_SHARE_PANEL,
        ].forEach((e) => instanceRef.current!.unbind(e));
      }
      instanceRef.current = null;
      isReadyRef.current  = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty — options are read via optionsRef

  // Stable action wrappers — referentially equal across renders
  const play      = useCallback(() => instanceRef.current?.play(),               []);
  const pause     = useCallback(() => instanceRef.current?.pause(),              []);
  const toggle    = useCallback(() => instanceRef.current?.toggle(),             []);
  const seekTo    = useCallback((ms: number) => instanceRef.current?.seekTo(ms), []);
  const setVolume = useCallback((v: number)  => instanceRef.current?.setVolume(v),[]);
  const next      = useCallback(() => instanceRef.current?.next(),               []);
  const prev      = useCallback(() => instanceRef.current?.prev(),               []);
  const skip      = useCallback((i: number)  => instanceRef.current?.skip(i),   []);

  return { widgetRef, isReady: isReadyRef.current, play, pause, toggle, seekTo, setVolume, next, prev, skip };
}
```

---

## §NX-4 — `SoundCloudPlayer` Component

A thin, `memo`-wrapped presentational component. It owns only the iframe. All logic and state lives in the parent via the hook.

```typescript
// components/SoundCloudPlayer/SoundCloudPlayer.tsx

import React, { memo, useMemo } from 'react';
import { buildWidgetUrl }       from '@/lib/soundcloud/buildWidgetUrl';
import { useSoundCloudWidget }  from '@/lib/soundcloud/useSoundCloudWidget';
import type { SCWidgetOptions } from '@/lib/soundcloud/types';
import type { WidgetEventHandlers } from '@/lib/soundcloud/useSoundCloudWidget';

export interface SoundCloudPlayerProps {
  /** Full SoundCloud track or playlist URL */
  url: string;
  /** Player display / behaviour options */
  options?: Omit<SCWidgetOptions, 'callback'>;
  /** Event handlers */
  events?: WidgetEventHandlers;
  /** iframe height in px — 166 for a single track, 450 for a playlist */
  height?: number;
  className?: string;
}

export const SoundCloudPlayer = memo(function SoundCloudPlayer({
  url,
  options  = {},
  events   = {},
  height   = 166,
  className,
}: SoundCloudPlayerProps) {
  const { widgetRef } = useSoundCloudWidget({ ...options, events });

  // Memoised so the iframe src is stable — prevents unintended remounts
  const src = useMemo(() => buildWidgetUrl(url, options), [url, options]);

  return (
    <iframe
      ref={widgetRef}
      src={src}
      width="100%"
      height={height}
      scrolling="no"
      frameBorder="0"
      allow="autoplay"
      title="SoundCloud Player"
      className={className}
    />
  );
});
```

```typescript
// components/SoundCloudPlayer/index.ts — barrel export
export { SoundCloudPlayer }           from './SoundCloudPlayer';
export type { SoundCloudPlayerProps } from './SoundCloudPlayer';
```

**Minimal usage:**
```tsx
<SoundCloudPlayer url="https://soundcloud.com/artist/track-name" />
```

**With options and event handlers:**
```tsx
<SoundCloudPlayer
  url="https://soundcloud.com/artist/track-name"
  height={166}
  options={{ auto_play: false, color: '#ff5500', show_user: true }}
  events={{
    onReady:        () => console.log('ready'),
    onPlay:         (e) => console.log('playing at', e.currentPosition),
    onPlayProgress: (e) => setProgress(e.relativePosition),
    onFinish:       () => console.log('finished'),
    onError:        () => console.error('widget error'),
  }}
/>
```

---

## §NX-5 — Controlling the Widget from a Parent (Custom Controls)

When a parent needs to drive playback independently (custom control bar, keyboard shortcuts, etc.), call the hook in the parent and render the iframe directly. Do not pass the widget instance as a prop.

```tsx
// Works in both App Router and Pages Router
'use client'; // Only needed in App Router

import { useState, useMemo }    from 'react';
import { useSoundCloudWidget }  from '@/lib/soundcloud/useSoundCloudWidget';
import { buildWidgetUrl }       from '@/lib/soundcloud/buildWidgetUrl';

const TRACK_URL = 'https://soundcloud.com/artist/track-name';

export default function PlayerPage() {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const { widgetRef, play, pause, toggle, seekTo, setVolume } =
    useSoundCloudWidget({
      events: {
        onReady: () => {
          // Access getters via the global after READY fires
          window.SC?.Widget(widgetRef.current!).getDuration(
            (ms) => setDuration(ms)
          );
        },
        onPlayProgress: (e) => setProgress(e.relativePosition),
        onFinish:       ()  => setProgress(1),
      },
    });

  const src = useMemo(
    () => buildWidgetUrl(TRACK_URL, { auto_play: false, color: '#ff5500' }),
    []
  );

  return (
    <div>
      <iframe
        ref={widgetRef}
        src={src}
        width="100%"
        height={166}
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
        title="SoundCloud Player"
      />
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={toggle}>Toggle</button>
        <button onClick={() => seekTo(0)}>Restart</button>
        <button onClick={() => setVolume(50)}>50% Vol</button>
      </div>
      <progress value={progress} max={1} />
      <p>Duration: {Math.round(duration / 1000)}s</p>
    </div>
  );
}
```

---

## §NX-6 — Next.js App Router Specifics

**Every component that uses hooks must be a Client Component.**

```tsx
'use client'; // Must be the very first line of any file using useEffect / useRef
```

**Script loading — two compatible approaches:**

Option A (recommended): Let the hook call `loadSoundCloudScript()` inside `useEffect` automatically. No extra setup needed in `layout.tsx`.

Option B: Inject `api.js` via `next/script` in the root layout. The singleton loader's `window.SC?.Widget` guard makes both options compatible — the script is never loaded twice.

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        {/* lazyOnload: defers until after the page is interactive — doesn't block rendering */}
        <Script src="https://w.soundcloud.com/player/api.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
```

**`next/script` strategy comparison:**

| Strategy | When it loads | Use for Widget API? |
|---|---|---|
| `beforeInteractive` | Before page hydration | ❌ Widget needs the DOM |
| `afterInteractive`  | After hydration        | ✅ Acceptable |
| `lazyOnload`        | After all resources    | ✅ Recommended |

**Server Components cannot use the Widget API.** Any file that instantiates the widget, calls the hook, or references `window` must be a Client Component. Keep all widget logic in `'use client'` files.

---

## §NX-7 — Next.js Pages Router Specifics

In the Pages Router, all components are client-rendered by default — no `'use client'` directive is needed.

**Optional: inject the script globally via `_document.tsx`:**

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Loads after the page — does not block rendering */}
        <script src="https://w.soundcloud.com/player/api.js" async />
      </body>
    </Html>
  );
}
```

> Using `_document.tsx` is optional. The `loadSoundCloudScript()` singleton works identically in Pages Router and injects the script on demand when the component mounts.

**`getServerSideProps` / `getStaticProps`** run on the server. Never reference `window`, `SC`, or widget instances inside them. All widget initialisation belongs in `useEffect`.

---

## §NX-8 — Multiple Players

Each call to `useSoundCloudWidget` creates a fully independent widget instance. No shared state or context needed.

```tsx
'use client'; // App Router only

import { useMemo }             from 'react';
import { useSoundCloudWidget } from '@/lib/soundcloud/useSoundCloudWidget';
import { buildWidgetUrl }      from '@/lib/soundcloud/buildWidgetUrl';

function TrackItem({ url }: { url: string }) {
  const { widgetRef, play, pause } = useSoundCloudWidget();

  // single_active: false — prevents players from pausing each other at the iframe level
  const src = useMemo(() => buildWidgetUrl(url, { single_active: false }), [url]);

  return (
    <div>
      <iframe
        ref={widgetRef}
        src={src}
        width="100%"
        height={166}
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
        title="SoundCloud Player"
      />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
}

export default function TrackList({ urls }: { urls: string[] }) {
  return (
    <div>
      {urls.map((url) => <TrackItem key={url} url={url} />)}
    </div>
  );
}
```

---

## §NX-9 — Recommended File Structure

```
lib/
  soundcloud/
    types.ts                ← §NX-1  Single source of truth for all types
    buildWidgetUrl.ts       ← §NX-2  Pure URL builder
    loadScript.ts           ← §NX-2  Singleton script loader
    useSoundCloudWidget.ts  ← §NX-3  The hook

components/
  SoundCloudPlayer/
    SoundCloudPlayer.tsx    ← §NX-4  Presentational iframe component
    index.ts                ← §NX-4  Barrel export
```

---

## §NX-10 — React / Next.js Gotchas

| Mistake | Consequence | Fix |
|---|---|---|
| Accessing `window.SC` outside `useEffect` | Crashes during SSR — `window` is undefined on the server | Only access `window` inside `useEffect`, or guard with `if (typeof window === 'undefined') return` |
| Calling widget methods before `READY` fires | Silent failure — the widget ignores calls made before it initialises | Gate all initial calls inside `onReady` |
| Injecting `api.js` with a JSX `<script>` tag | React strips or ignores inline `<script>` tags during rendering | Use `loadScript.ts` or `next/script` |
| Passing new inline arrow functions as `events` each render | Creates a new object reference every render | Define handlers with `useCallback` or declare them outside the component |
| Forgetting `'use client'` in App Router | Build error — Server Components cannot use `useEffect` or `useRef` | Add `'use client'` as the first line of any file that uses React hooks |
| Not memoising `buildWidgetUrl` result | New `src` string on every render remounts the iframe and resets the player | Wrap in `useMemo(() => buildWidgetUrl(url, options), [url])` |
| Calling `next()` / `prev()` / `skip()` on a single track | Silent failure | These methods only work when the widget contains a playlist |
| Expecting `unbind()` to remove one specific listener | It removes all listeners for that event | Design handlers to be stateless, or use refs for conditional logic inside a single bound handler |

---
---

# VANILLA HTML/JS SECTIONS
### Only for projects with no framework — no `package.json` or no React/Next dependency

---

## §VAN-1 — Setup

```html
<!-- Step 1: Embed the iframe -->
<iframe
  id="sc-widget"
  width="100%"
  height="166"
  scrolling="no"
  frameborder="no"
  allow="autoplay"
  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&auto_play=false&color=%23ff5500">
</iframe>

<!-- Step 2: Load the API script — must appear before any SC.Widget() calls -->
<script src="https://w.soundcloud.com/player/api.js"></script>

<script>
  // Step 3: Instantiate — pass the element or its string ID
  var widget = SC.Widget(document.getElementById('sc-widget'));

  // Step 4: Always wait for READY before calling any methods
  widget.bind(SC.Widget.Events.READY, function() {
    widget.getDuration(function(ms) {
      console.log('Duration:', ms, 'ms');
    });
  });
</script>
```

---

## §VAN-2 — Full Vanilla Reference Example

```html
<!DOCTYPE html>
<html>
<head><title>SoundCloud Widget</title></head>
<body>

  <iframe
    id="sc-widget"
    width="100%"
    height="166"
    scrolling="no"
    frameborder="no"
    allow="autoplay"
    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293
         &auto_play=false&color=%23ff5500&show_user=true">
  </iframe>

  <button onclick="widget.play()">Play</button>
  <button onclick="widget.pause()">Pause</button>
  <button onclick="widget.toggle()">Toggle</button>
  <button onclick="widget.seekTo(0)">Restart</button>
  <button onclick="widget.setVolume(50)">50% Vol</button>
  <div id="status"></div>

  <script src="https://w.soundcloud.com/player/api.js"></script>
  <script>
    var widget = SC.Widget('sc-widget');
    var status = document.getElementById('status');

    widget.bind(SC.Widget.Events.READY, function() {
      widget.getCurrentSound(function(sound) {
        status.textContent = 'Loaded: ' + sound.title;
      });
    });

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
      status.textContent = 'Progress: ' + Math.round(e.relativePosition * 100) + '%';
    });

    widget.bind(SC.Widget.Events.FINISH, function() {
      status.textContent = 'Finished.';
    });

    widget.bind(SC.Widget.Events.ERROR, function() {
      status.textContent = 'Error in widget.';
    });
  </script>

</body>
</html>
```

---
---

# QUICK REFERENCE

```
STEP 0 — DETECT STACK
  next in package.json + app/layout.*   → Next.js App Router   → §REF + §NX + §NX-6
  next in package.json + pages/_app.*   → Next.js Pages Router → §REF + §NX + §NX-7
  react in package.json (no next)       → React Vite/CRA       → §REF + §NX (skip §NX-6/7)
  no package.json                       → Vanilla HTML/JS       → §REF + §VAN

CORE CONCEPTS (all stacks — read first)
  §REF-1  How the Widget API works (postMessage, async, READY gate)
  §REF-2  Embed URL parameters
  §REF-3  Playback control methods
  §REF-4  Getter methods (always async / callback-based)
  §REF-5  Events and SC.Widget.Events constants

REACT / NEXT.JS IMPLEMENTATION
  §NX-1   TypeScript types          → lib/soundcloud/types.ts
  §NX-2   Utilities                 → buildWidgetUrl.ts + loadScript.ts
  §NX-3   useSoundCloudWidget hook  → lib/soundcloud/useSoundCloudWidget.ts
  §NX-4   SoundCloudPlayer component → components/SoundCloudPlayer/
  §NX-5   Parent-controlled player (custom controls)
  §NX-6   App Router: 'use client', next/script strategies
  §NX-7   Pages Router: _document.tsx, getServerSideProps rules
  §NX-8   Multiple players on one page
  §NX-9   Recommended file structure
  §NX-10  Gotchas

VANILLA HTML/JS
  §VAN-1  3-step setup
  §VAN-2  Full reference example
```