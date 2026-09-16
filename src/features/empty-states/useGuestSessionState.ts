"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {
  GUEST_SESSION_LOADING_TIMEOUT_MS,
  resolveGuestSessionState,
  type GuestSessionState,
} from "@/features/empty-states/resolveGuestSessionState";

export type { GuestSessionState };

export function useGuestSessionState(): {
  readonly sessionState: GuestSessionState;
  readonly isSignedIn: boolean;
} {
  const { data: session, status } = useSession();
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setLoadingTimedOut(true);
    }, GUEST_SESSION_LOADING_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
      setLoadingTimedOut(false);
    };
  }, [status]);

  const hasUser = Boolean(session?.user);
  const sessionState = resolveGuestSessionState({
    status,
    hasUser,
    loadingTimedOut,
  });

  return {
    sessionState,
    isSignedIn: sessionState === "signed_in",
  };
}
