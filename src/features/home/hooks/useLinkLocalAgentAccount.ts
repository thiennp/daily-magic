"use client";

import { useCallback, useRef, useState } from "react";

import { linkLocalAgentToSignedInAccount } from "@/lib/agentWitch/linkLocalAgentAccount";

export function useLinkLocalAgentAccount({
  appOrigin,
  onLinked,
}: {
  readonly appOrigin: string;
  readonly onLinked?: () => void;
}): {
  readonly isLinking: boolean;
  readonly linkError: string | null;
  readonly linkNow: () => Promise<void>;
} {
  const linkingInFlightRef = useRef(false);
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const linkNow = useCallback(async (): Promise<void> => {
    if (linkingInFlightRef.current) {
      return;
    }

    linkingInFlightRef.current = true;
    setIsLinking(true);
    setLinkError(null);

    const result = await linkLocalAgentToSignedInAccount(appOrigin);
    if (result.ok) {
      onLinked?.();
    } else {
      setLinkError(result.errorMessage ?? "Could not link this Mac.");
    }

    linkingInFlightRef.current = false;
    setIsLinking(false);
  }, [appOrigin, onLinked]);

  return { isLinking, linkError, linkNow };
}
