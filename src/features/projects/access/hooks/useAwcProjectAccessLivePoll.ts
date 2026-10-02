"use client";

import { useEffect } from "react";

import { AWC_PROJECT_ACCESS_POLL_MS } from "@/features/projects/access/awcProjectAccessPolling.constant";
import {
  loadAwcProjectAccess,
  type AwcProjectAccessSnapshot,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";

/**
 * Silent Access snapshot poll while Project Access is mounted.
 * Pending (and members/invites) refresh without flipping the panel spinner.
 * Pauses when the tab is hidden; clears on unmount / projectId change.
 * No Access SSE yet (AW) — poll GET access snapshot instead.
 */
export const useAwcProjectAccessLivePoll = (input: {
  readonly projectId: string;
  readonly onSnapshot: (snapshot: AwcProjectAccessSnapshot) => void;
}): void => {
  const { projectId, onSnapshot } = input;

  useEffect(() => {
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

    const pollSilent = async (): Promise<void> => {
      if (poll.cancelled) {
        return;
      }
      if (document.visibilityState !== "visible") {
        return;
      }
      const snapshot = await loadAwcProjectAccess(projectId);
      if (poll.cancelled || !snapshot.ok) {
        return;
      }
      onSnapshot(snapshot);
    };

    const startPoll = (): void => {
      if (poll.intervalId !== null) {
        return;
      }
      poll.intervalId = window.setInterval(() => {
        void pollSilent();
      }, AWC_PROJECT_ACCESS_POLL_MS);
    };

    const onVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        void pollSilent();
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
  }, [projectId, onSnapshot]);
};
