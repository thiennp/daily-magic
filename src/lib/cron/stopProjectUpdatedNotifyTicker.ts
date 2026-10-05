import {
  PROJECT_UPDATED_NOTIFY_TICKER_KEY,
  type ProjectUpdatedNotifyTickerGlobal,
} from "@/lib/cron/projectUpdatedNotifyTicker.constants";

/** Clear the project.updated notify ticker (tests). Returns true if one was running. */
export const stopProjectUpdatedNotifyTicker = (): boolean => {
  const globalState = globalThis as ProjectUpdatedNotifyTickerGlobal;
  const handle = globalState[PROJECT_UPDATED_NOTIFY_TICKER_KEY];
  if (handle === undefined) {
    return false;
  }
  clearInterval(handle);
  delete globalState[PROJECT_UPDATED_NOTIFY_TICKER_KEY];
  return true;
};
