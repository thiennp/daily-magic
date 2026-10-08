"use client";

import { useEffect } from "react";

import { registerAgentLiveProgressFeed } from "@/features/agent/utils/registerAgentLiveProgressFeed";

/** S3: mark this run's floater live so other runs' checkpoints stay out of it. */
export function useRegisterAgentLiveProgressFeed(
  activeRunId: string | null | undefined,
): void {
  useEffect(() => {
    if (activeRunId === null || activeRunId === undefined) {
      return undefined;
    }
    return activeRunId.length > 0
      ? registerAgentLiveProgressFeed(activeRunId)
      : undefined;
  }, [activeRunId]);
}
