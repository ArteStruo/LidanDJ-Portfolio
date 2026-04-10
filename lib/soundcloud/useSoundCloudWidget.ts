import { useEffect, useRef, useCallback, RefObject, useState } from 'react';
import { loadSoundCloudScript } from './loadScript';
import type { SCWidgetInstance, SCWidgetOptions, SCWidgetEventData, SCSound } from './types';

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
  play:      () => void;
  pause:     () => void;
  toggle:    () => void;
  seekTo:    (ms: number) => void;
  setVolume: (volume: number) => void;
  next:      () => void;
  prev:      () => void;
  skip:      (index: number) => void;
  getSounds: (callback: (sounds: SCSound[]) => void) => void;
  getCurrentSound: (callback: (sound: SCSound) => void) => void;
  getCurrentSoundIndex: (callback: (index: number) => void) => void;
  load: (url: string, options?: SCWidgetOptions) => void;
}

export function useSoundCloudWidget(
  options: UseSoundCloudWidgetOptions = {}
): UseSoundCloudWidgetReturn {
  const widgetRef   = useRef<HTMLIFrameElement | null>(null);
  const instanceRef = useRef<SCWidgetInstance | null>(null);
  const [isReady, setIsReady]  = useState(false);
  const optionsRef  = useRef(options);
  
  useEffect(() => { optionsRef.current = options; });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!widgetRef.current) return;

    let cancelled = false;

    loadSoundCloudScript()
      .then((SCWidget) => {
        if (cancelled || !widgetRef.current) return;

        const widget          = SCWidget(widgetRef.current);
        instanceRef.current   = widget;
        const { events = {} } = optionsRef.current;

        const bindings: Array<[string, ((e: unknown) => void) | undefined]> = [
          [
            SCWidget.Events.PLAY,
            events.onPlay ? (e) => events.onPlay?.(e as SCWidgetEventData) : undefined,
          ],
          [
            SCWidget.Events.PAUSE,
            events.onPause ? (e) => events.onPause?.(e as SCWidgetEventData) : undefined,
          ],
          [
            SCWidget.Events.FINISH,
            events.onFinish ? (e) => events.onFinish?.(e as SCWidgetEventData) : undefined,
          ],
          [
            SCWidget.Events.SEEK,
            events.onSeek ? (e) => events.onSeek?.(e as SCWidgetEventData) : undefined,
          ],
          [
            SCWidget.Events.PLAY_PROGRESS,
            events.onPlayProgress
              ? (e) => events.onPlayProgress?.(e as SCWidgetEventData)
              : undefined,
          ],
          [
            SCWidget.Events.LOAD_PROGRESS,
            events.onLoadProgress
              ? (e) => events.onLoadProgress?.(e as SCWidgetEventData)
              : undefined,
          ],
          [SCWidget.Events.ERROR, events.onError ? () => events.onError?.() : undefined],
          [
            SCWidget.Events.CLICK_DOWNLOAD,
            events.onClickDownload ? () => events.onClickDownload?.() : undefined,
          ],
          [SCWidget.Events.CLICK_BUY, events.onClickBuy ? () => events.onClickBuy?.() : undefined],
          [
            SCWidget.Events.OPEN_SHARE_PANEL,
            events.onOpenSharePanel ? () => events.onOpenSharePanel?.() : undefined,
          ],
        ];

        for (const [event, handler] of bindings) {
          if (handler) widget.bind(event, handler);
        }

        widget.bind(SCWidget.Events.READY, () => {
          if (cancelled) return;
          setIsReady(true);
          // Use the current options reference to call onReady
          optionsRef.current.events?.onReady?.();
        });
      })
      .catch((err) => console.error('[useSoundCloudWidget]', err));

    return () => {
      cancelled = true;
      if (instanceRef.current && window.SC?.Widget) {
        try {
          const { Events } = window.SC.Widget;
          [
            Events.READY,
            Events.PLAY,
            Events.PAUSE,
            Events.FINISH,
            Events.SEEK,
            Events.PLAY_PROGRESS,
            Events.LOAD_PROGRESS,
            Events.ERROR,
            Events.CLICK_DOWNLOAD,
            Events.CLICK_BUY,
            Events.OPEN_SHARE_PANEL,
          ].forEach((e) => {
            try {
              instanceRef.current?.unbind(e);
            } catch {
              // Ignore widget teardown issues during route transitions.
            }
          });
        } catch {
          // Ignore widget teardown issues during route transitions.
        }
      }
      instanceRef.current = null;
      setIsReady(false);
    };
  }, []);

  const play            = useCallback(() => instanceRef.current?.play(),               []);
  const pause           = useCallback(() => instanceRef.current?.pause(),              []);
  const toggle          = useCallback(() => instanceRef.current?.toggle(),             []);
  const seekTo          = useCallback((ms: number) => instanceRef.current?.seekTo(ms), []);
  const setVolume       = useCallback((v: number)  => instanceRef.current?.setVolume(v),[]);
  const next            = useCallback(() => instanceRef.current?.next(),               []);
  const prev            = useCallback(() => instanceRef.current?.prev(),               []);
  const skip            = useCallback((i: number)  => instanceRef.current?.skip(i),   []);
  const getSounds       = useCallback((cb: (sounds: SCSound[]) => void) => instanceRef.current?.getSounds(cb), []);
  const getCurrentSound = useCallback((cb: (sound: SCSound) => void) => instanceRef.current?.getCurrentSound(cb), []);
  const getCurrentSoundIndex = useCallback((cb: (index: number) => void) => instanceRef.current?.getCurrentSoundIndex(cb), []);
  const load            = useCallback((url: string, opts?: SCWidgetOptions) => instanceRef.current?.load(url, opts), []);

  return { widgetRef, isReady, play, pause, toggle, seekTo, setVolume, next, prev, skip, getSounds, getCurrentSound, getCurrentSoundIndex, load };
}
