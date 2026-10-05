// The only module state: the interval handle on globalThis (no silence state), so dev hot reload or a second module copy never starts a second ticker in one process.
export const PROJECT_MESSAGE_SILENCE_TICKER_KEY =
  "__dailyMagicProjectMessageSilenceTicker";

export type ProjectMessageSilenceTickerGlobal = typeof globalThis & {
  [PROJECT_MESSAGE_SILENCE_TICKER_KEY]?: ReturnType<typeof setInterval>;
};
