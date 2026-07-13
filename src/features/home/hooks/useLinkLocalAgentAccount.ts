"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { isLocalAgentWitchWakeServerReachable } from "@/lib/agentWitch/isLocalAgentWitchWakeServerReachable";
import { linkLocalAgentToSignedInAccount } from "@/lib/agentWitch/linkLocalAgentAccount";

const AUTO_LINK_POLL_MS = 5_000;

export function useLinkLocalAgentAccount({
  appOrigin,
  autoLink,
  silentFailures = false,
  onLinked,
}: {
  readonly appOrigin: string;
  readonly autoLink: boolean;
  readonly silentFailures?: boolean;
  readonly onLinked?: () => void;
}): {
  readonly isLinking: boolean;
  readonly linkError: string | null;
  readonly linkNow: () => Promise<void>;
} {
  const linkingInFlightRef = useRef(false);
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const linkNow = useCallback(
    async (options?: { readonly reportError?: boolean }): Promise<void> => {
      if (linkingInFlightRef.current) {
        return;
      }

      const shouldReportError = options?.reportError ?? !silentFailures;

      linkingInFlightRef.current = true;
      if (shouldReportError) {
        setIsLinking(true);
        setLinkError(null);
      }

      const result = await linkLocalAgentToSignedInAccount(appOrigin);
      if (result.ok) {
        onLinked?.();
      } else if (shouldReportError) {
        setLinkError(result.errorMessage ?? "Could not link this Mac.");
      }

      linkingInFlightRef.current = false;
      if (shouldReportError) {
        setIsLinking(false);
      }
    },
    [appOrigin, onLinked, silentFailures],
  );

  useEffect(() => {
    if (!autoLink) {
      return;
    }

    const activeRef = { current: true };

    const tryAutoLink = async (): Promise<void> => {
      if (!activeRef.current || linkingInFlightRef.current) {
        return;
      }

      const isReachable = await isLocalAgentWitchWakeServerReachable();
      if (!activeRef.current || !isReachable) {
        return;
      }

      await linkNow({ reportError: !silentFailures });
    };

    const timer = setInterval(() => {
      void tryAutoLink();
    }, AUTO_LINK_POLL_MS);

    const initialTimer = setTimeout(() => {
      void tryAutoLink();
    }, 0);

    return () => {
      activeRef.current = false;
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, [autoLink, linkNow, silentFailures]);

  return { isLinking, linkError, linkNow };
}
