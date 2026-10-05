// The only module state: the interval handle on globalThis (no pending state),
// so hot reload or a second module copy never starts a second ticker.
export const PROJECT_UPDATED_NOTIFY_TICKER_KEY =
  "__dailyMagicProjectUpdatedNotifyTicker";

/** How often the in-process flusher looks for due debounce rows (~1s). */
export const PROJECT_UPDATED_NOTIFY_TICK_MS = 1_000;

export type ProjectUpdatedNotifyTickerGlobal = typeof globalThis & {
  [PROJECT_UPDATED_NOTIFY_TICKER_KEY]?: ReturnType<typeof setInterval>;
};
