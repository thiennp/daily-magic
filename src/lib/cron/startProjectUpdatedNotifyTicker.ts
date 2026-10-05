import { isDatabaseUrlConfigured } from "@/lib/db";
import { flushDueProjectUpdatedNotifies } from "@/lib/projects/acl/messaging/flushDueProjectUpdatedNotifies";
import {
  PROJECT_UPDATED_NOTIFY_TICK_MS,
  PROJECT_UPDATED_NOTIFY_TICKER_KEY,
  type ProjectUpdatedNotifyTickerGlobal,
} from "@/lib/cron/projectUpdatedNotifyTicker.constants";

const tick = (): void => {
  void flushDueProjectUpdatedNotifies({ now: new Date() }).catch(
    (error: unknown) => {
      console.error("[project-updated] notify tick failed", error);
    },
  );
};

/**
 * Start the in-process project.updated debounce flush every 1 s, once per process.
 * Interval is unref'd. Without a database it logs once and starts nothing.
 * Returns true only on the call that started it.
 */
export const startProjectUpdatedNotifyTicker = (): boolean => {
  const globalState = globalThis as ProjectUpdatedNotifyTickerGlobal;
  if (globalState[PROJECT_UPDATED_NOTIFY_TICKER_KEY] !== undefined) {
    return false;
  }
  if (!isDatabaseUrlConfigured()) {
    console.info(
      "project.updated notify ticker disabled: no database configured",
    );
    return false;
  }
  const handle = setInterval(tick, PROJECT_UPDATED_NOTIFY_TICK_MS);
  handle.unref();
  globalState[PROJECT_UPDATED_NOTIFY_TICKER_KEY] = handle;
  return true;
};
