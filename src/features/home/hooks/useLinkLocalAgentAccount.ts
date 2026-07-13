"use client";

import { useCallback, useEffect, useState } from "react";

import { linkLocalAgentToSignedInAccount } from "@/lib/agentWitch/linkLocalAgentAccount";

export function useLinkLocalAgentAccount({
  appOrigin,
  enabled,
  onLinked,
}: {
  readonly appOrigin: string;
  readonly enabled: boolean;
  readonly onLinked?: () => void;
}): {
  readonly isLinking: boolean;
  readonly linkError: string | null;
  readonly linkNow: () => Promise<void>;
} {
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const linkNow = useCallback(async (): Promise<void> => {
    setIsLinking(true);
    setLinkError(null);

    const result = await linkLocalAgentToSignedInAccount(appOrigin);
    if (result.ok) {
      onLinked?.();
    } else {
      setLinkError(result.errorMessage ?? "Could not link this Mac.");
    }

    setIsLinking(false);
  }, [appOrigin, onLinked]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const runLink = (): void => {
      void linkNow();
    };

    const initialTimer = setTimeout(runLink, 0);
    const timer = setInterval(runLink, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, [enabled, linkNow]);

  return { isLinking, linkError, linkNow };
}
