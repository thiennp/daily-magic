"use client";

import { useCallback, useRef, useState } from "react";

import { useAutoLinkLocalAgentAccount } from "@/features/home/hooks/useAutoLinkLocalAgentAccount";
import { shouldStopAutoLinkAfterFailure } from "@/features/home/utils/autoLinkLocalAgentAccount.util";
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
      } else if (shouldStopAutoLinkAfterFailure(result.errorMessage)) {
        stopAutoLink();
        if (shouldReportError) {
          setLinkError(result.errorMessage ?? "Could not link this Mac.");
        }
      } else if (shouldReportError) {
        setLinkError(result.errorMessage ?? "Could not link this Mac.");
      }

      linkingInFlightRef.current = false;
      if (shouldReportError) {
        setIsLinking(false);
      }
    },
    [appOrigin, onLinked, silentFailures, stopAutoLink],
  );

  useAutoLinkLocalAgentAccount({
    autoLink,
    silentFailures,
    linkNow,
    stopAutoLink,
    linkingInFlightRef,
    autoLinkStoppedRef,
    reachableAttemptCountRef,
  });

  return { isLinking, linkError, linkNow };
}
