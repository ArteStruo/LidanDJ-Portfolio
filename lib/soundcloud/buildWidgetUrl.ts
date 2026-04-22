import type { SCWidgetOptions } from './types';

const WIDGET_BASE = 'https://w.soundcloud.com/player/';

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
    visual:         options.visual         != null ? String(options.visual)                : undefined,
  };

  for (const [key, value] of Object.entries(map)) {
    if (value !== undefined) params.set(key, value);
  }

  return `${WIDGET_BASE}?${params.toString()}`;
}
