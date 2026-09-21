"use client";

import { useEffect, useRef } from "react";

import {
  useGuestSessionState,
  type GuestSessionState,
} from "@/features/empty-states/useGuestSessionState";
import { syncGuestLibraryDraftsToCloud } from "@/features/library/utils/syncGuestLibraryDraftsToCloud";

export function useSyncGuestLibraryOnSignIn(onSynced?: () => void): void {
  const { sessionState } = useGuestSessionState();
  const lastSyncedSessionRef = useRef<GuestSessionState>("loading");

  useEffect(() => {
    if (sessionState !== "signed_in") {
      if (sessionState === "guest") {
        lastSyncedSessionRef.current = "guest";
      }
      return;
    }

    if (lastSyncedSessionRef.current === "signed_in") {
      return;
    }

    lastSyncedSessionRef.current = "signed_in";

    void syncGuestLibraryDraftsToCloud().then(() => {
      onSynced?.();
    });
  }, [onSynced, sessionState]);
}
