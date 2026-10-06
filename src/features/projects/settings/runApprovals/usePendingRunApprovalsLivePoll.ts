"use client";

import { useEffect } from "react";

import { RUN_APPROVALS_POLL_MS } from "@/features/projects/settings/runApprovals/runApprovalsPolling.constant";

/**
 * Poll pending run approvals while Settings is open. Pauses when the tab is
 * hidden; refetches on visibility and window focus.
 */
export const usePendingRunApprovalsLivePoll = (input: {
  readonly enabled: boolean;
  readonly onTick: () => void;
}): void => {
  const { enabled, onTick } = input;

  useEffect(() => {
    if (!enabled) return;

    const poll = {
      intervalId: null as number | null,
    };
    const clear = (): void => {
      if (poll.intervalId !== null) {
        window.clearInterval(poll.intervalId);
        poll.intervalId = null;
      }
    };
    const tick = (): void => {
      if (document.visibilityState !== "visible") return;
      onTick();
    };
    const start = (): void => {
      if (poll.intervalId !== null) return;
      poll.intervalId = window.setInterval(tick, RUN_APPROVALS_POLL_MS);
    };
    const onVisibility = (): void => {
      if (document.visibilityState === "visible") {
        tick();
        start();
      } else {
        clear();
      }
    };
    const onFocus = (): void => {
      onTick();
    };
    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    return () => {
      clear();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
    };
  }, [enabled, onTick]);
};
