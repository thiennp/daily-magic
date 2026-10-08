"use client";

import { useEffect } from "react";

import {
  clearLiveFloaterRunId,
  resolveLiveFloaterRunIdToPersist,
  setLiveFloaterRunId,
} from "@/features/agent/utils/liveFloaterRunIdStorage";

/** afae8216: remember the floater's live run so a reload can reopen it. */
export const useLiveFloaterRunIdPersistence = (input: {
  readonly enabled: boolean;
  readonly runId: string | null;
  readonly status: string;
  readonly hasPendingQuestion: boolean;
}): void => {
  const { enabled, runId, status, hasPendingQuestion } = input;
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const persisted = resolveLiveFloaterRunIdToPersist({
      runId,
      status,
      hasPendingQuestion,
    });
    if (persisted === null) {
      clearLiveFloaterRunId();
      return;
    }
    setLiveFloaterRunId(persisted);
  }, [enabled, runId, status, hasPendingQuestion]);
};
