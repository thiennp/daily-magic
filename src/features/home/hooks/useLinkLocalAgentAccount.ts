"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  AUTO_LINK_LOCAL_AGENT_POLL_MS,
  MAX_REACHABLE_AUTO_LINK_ATTEMPTS,
  shouldStopAutoLinkAfterFailure,
} from "@/features/home/utils/autoLinkLocalAgentAccount.util";
import { isLocalAgentWitchWakeServerReachable } from "@/lib/agentWitch/isLocalAgentWitchWakeServerReachable";
import { linkLocalAgentToSignedInAccount } from "@/lib/agentWitch/linkLocalAgentAccount";

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
  const autoLinkStoppedRef = useRef(false);
  const reachableAttemptCountRef = useRef(0);
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const stopAutoLink = useCallback((): void => {
    autoLinkStoppedRef.current = true;
  }, []);

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
        stopAutoLink();
        onLinked?.();
      } else {
        if (shouldStopAutoLinkAfterFailure(result.errorMessage)) {
          stopAutoLink();
        }

        if (shouldReportError) {
          setLinkError(result.errorMessage ?? "Could not link this Mac.");
        }
      }

      linkingInFlightRef.current = false;
      if (shouldReportError) {
        setIsLinking(false);
      }
    },
    [appOrigin, onLinked, silentFailures, stopAutoLink],
  );

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

      const isReachable = await isLocalAgentWitchWakeServerReachable();
      if (!activeRef.current || !isReachable) {
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
  }, [autoLink, linkNow, silentFailures, stopAutoLink]);

  return { isLinking, linkError, linkNow };
}
