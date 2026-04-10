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
  genre?: string;
  playback_count?: number;
  created_at?: string;
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
  visual?: boolean;        // Adding visual to options for the big player
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

declare global {
  interface Window {
    SC?: { Widget: SCWidgetStatic };
  }
}
