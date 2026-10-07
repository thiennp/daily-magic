"use client";

import { useEffect } from "react";

import { AWC_PROJECT_MESSENGER_POLL_MS } from "@/features/projects/messenger/awcProjectMessengerPolling.constant";

/**
 * Poll thread list + open thread while Messenger is mounted.
 * Pauses when the tab is hidden. No messenger SSE yet (AW) — poll GETs instead.
 */
export const useAwcProjectMessengerLivePoll = (input: {
  readonly enabled: boolean;
  readonly onTick: () => void;
}): void => {
  const { enabled, onTick } = input;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const poll = {
      intervalId: null as number | null,
      cancelled: false,
    };

    const clearPoll = (): void => {
      if (poll.intervalId !== null) {
        window.clearInterval(poll.intervalId);
        poll.intervalId = null;
      }
    };

    const tick = (): void => {
      if (poll.cancelled) {
        return;
      }
      if (document.visibilityState !== "visible") {
        return;
      }
      onTick();
    };

    const startPoll = (): void => {
      if (poll.intervalId !== null) {
        return;
      }
      poll.intervalId = window.setInterval(tick, AWC_PROJECT_MESSENGER_POLL_MS);
    };

    const onVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        tick();
        startPoll();
      } else {
        clearPoll();
      }
    };

    if (document.visibilityState === "visible") {
      startPoll();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      poll.cancelled = true;
      clearPoll();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled, onTick]);
};
