import { isDatabaseUrlConfigured } from "@/lib/db";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import { PROJECT_B2B_SILENCE_TICK_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

// The only module state: the interval handle on globalThis, so dev hot reload or a second module copy never starts a second ticker in one process.
const TICKER_GLOBAL_KEY = "__dailyMagicProjectMessageSilenceTicker";

type TickerGlobal = typeof globalThis & {
  [TICKER_GLOBAL_KEY]?: ReturnType<typeof setInterval>;
};

const tick = (): void => {
  void checkProjectMessageSilence({ now: new Date() }).catch(
    (error: unknown) => {
      console.error("[project-messages] silence tick failed", error);
    },
  );
};

/**
 * Start the in-process silence check every 60 s, once per process.
 * The interval is unref'd so it never keeps the process alive.
 * Returns true only on the call that started it.
 */
export const startProjectMessageSilenceTicker = (): boolean => {
  const globalState = globalThis as TickerGlobal;
  if (
    globalState[TICKER_GLOBAL_KEY] !== undefined ||
    !isDatabaseUrlConfigured()
  ) {
    return false;
  }
  const handle = setInterval(tick, PROJECT_B2B_SILENCE_TICK_MS);
  handle.unref();
  globalState[TICKER_GLOBAL_KEY] = handle;
  return true;
};
