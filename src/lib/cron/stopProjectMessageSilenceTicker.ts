import {
  PROJECT_MESSAGE_SILENCE_TICKER_KEY,
  type ProjectMessageSilenceTickerGlobal,
} from "@/lib/cron/projectMessageSilenceTicker.constants";

/** Clear the silence ticker and drop its handle (tests). Returns true if one was running. */
export const stopProjectMessageSilenceTicker = (): boolean => {
  const globalState = globalThis as ProjectMessageSilenceTickerGlobal;
  const handle = globalState[PROJECT_MESSAGE_SILENCE_TICKER_KEY];
  if (handle === undefined) {
    return false;
  }
  clearInterval(handle);
  delete globalState[PROJECT_MESSAGE_SILENCE_TICKER_KEY];
  return true;
};
