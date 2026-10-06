"use client";

import { useCallback, useEffect, useState } from "react";

import { parseAwcGrokWakeLinkHash } from "@/features/projects/access/awcGrokWakeLinkDeepLink";

export type AwcGrokWakeLinkFocusRequest = {
  readonly membershipId: string;
  /** Bumps on every request so the same row can be re-opened. */
  readonly nonce: number;
};

const requestFromHash = (nonce: number): AwcGrokWakeLinkFocusRequest | null => {
  if (typeof window === "undefined") return null;
  const membershipId = parseAwcGrokWakeLinkHash(window.location.hash);
  return membershipId === null ? null : { membershipId, nonce };
};

/**
 * Which member's Grok wake-link form to expand. Sources:
 * - `#wake-link-<membershipId>` on load / hashchange,
 * - `focus(id)` from the "Add wake link" banner button.
 * Rows that are not loaded yet simply pick the request up when they mount.
 */
export const useAwcGrokWakeLinkFocus = (): {
  readonly request: AwcGrokWakeLinkFocusRequest | null;
  readonly focus: (membershipId: string) => void;
} => {
  const [request, setRequest] = useState<AwcGrokWakeLinkFocusRequest | null>(
    () => requestFromHash(1),
  );

  const focus = useCallback((membershipId: string) => {
    setRequest((previous) => ({
      membershipId,
      nonce: (previous?.nonce ?? 0) + 1,
    }));
  }, []);

  useEffect(() => {
    const onHashChange = (): void => {
      setRequest(
        (previous) => requestFromHash((previous?.nonce ?? 0) + 1) ?? previous,
      );
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return { request, focus };
};
