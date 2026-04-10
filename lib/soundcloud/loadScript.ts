import type { SCWidgetStatic } from './types';

const SCRIPT_SRC = 'https://w.soundcloud.com/player/api.js';
let loadPromise: Promise<SCWidgetStatic> | null = null;

export function loadSoundCloudScript(): Promise<SCWidgetStatic> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<SCWidgetStatic>((resolve, reject) => {
    if (window.SC?.Widget) {
      resolve(window.SC.Widget);
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () =>
      window.SC?.Widget
        ? resolve(window.SC.Widget)
        : reject(new Error('SC.Widget not found after script load'));
    script.onerror = () => reject(new Error('Failed to load SoundCloud Widget API'));

    document.head.appendChild(script);
  });

  return loadPromise;
}
