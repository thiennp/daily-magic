"use client";

import { useEffect } from "react";

import { loadMyMacDevicesSnapshot } from "@/features/agent/hooks/fetchMyMacDevicesFromApi";
import {
  AUTO_LINK_LOCAL_AGENT_POLL_MS,
  MAX_REACHABLE_AUTO_LINK_ATTEMPTS,
} from "@/features/home/utils/autoLinkLocalAgentAccount.util";

export const useAutoLinkLocalAgentAccount = (input: {
  readonly autoLink: boolean;
  readonly silentFailures: boolean;
  readonly linkNow: (options?: {
    readonly reportError?: boolean;
  }) => Promise<void>;
  readonly stopAutoLink: () => void;
  readonly linkingInFlightRef: { current: boolean };
  readonly autoLinkStoppedRef: { current: boolean };
  readonly reachableAttemptCountRef: { current: number };
}): void => {
  const {
    autoLink,
    silentFailures,
    linkNow,
    stopAutoLink,
    linkingInFlightRef,
    autoLinkStoppedRef,
    reachableAttemptCountRef,
  } = input;

  useEffect(() => {
    if (!autoLink || autoLinkStoppedRef.current) {
      return;
    }

    const activeRef = { current: true };

    const tryAutoLink = async (): Promise<void> => {
      if (
        !activeRef.current ||
        autoLinkStoppedRef.current ||
        linkingInFlightRef.current
      ) {
        return;
      }

      const snapshot = await loadMyMacDevicesSnapshot().catch(() => ({
        devices: [] as const,
        hadError: true,
      }));
      if (!activeRef.current || snapshot.devices.length === 0) {
        return;
      }

      reachableAttemptCountRef.current += 1;
      if (reachableAttemptCountRef.current > MAX_REACHABLE_AUTO_LINK_ATTEMPTS) {
        stopAutoLink();
        return;
      }

      await linkNow({ reportError: !silentFailures });
    };

    const timer = setInterval(() => {
      void tryAutoLink();
    }, AUTO_LINK_LOCAL_AGENT_POLL_MS);
    const initialTimer = setTimeout(() => {
      void tryAutoLink();
    }, 0);

    return () => {
      activeRef.current = false;
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, [
    autoLink,
    autoLinkStoppedRef,
    linkNow,
    linkingInFlightRef,
    reachableAttemptCountRef,
    silentFailures,
    stopAutoLink,
  ]);
};
