"use client";

import { useSession } from "next-auth/react";

export type GuestSessionState = "loading" | "guest" | "signed_in";

export function useGuestSessionState(): {
  readonly sessionState: GuestSessionState;
  readonly isSignedIn: boolean;
} {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { sessionState: "loading", isSignedIn: false };
  }

  const isSignedIn = status === "authenticated" && Boolean(session?.user);

  return {
    sessionState: isSignedIn ? "signed_in" : "guest",
    isSignedIn,
  };
}
