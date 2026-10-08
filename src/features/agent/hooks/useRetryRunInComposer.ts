"use client";

import { useCallback } from "react";

import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import { retryRunInComposer } from "@/features/agent/utils/retryRunInComposer";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const loadRunForRetry = async (
  runId: string,
): Promise<AgentRunRecord | null> => {
  const cached = getAgentRunLocalCache(runId);
  if (cached !== null && cached.prompt.trim().length > 0) {
    return cached;
  }
  const outcome = await fetchAgentRunDetail(runId);
  return outcome.status === "ok" ? outcome.run : null;
};

/** 7a3086f1: Retry on Home and the task page, same inputs as the floater. */
export const useRetryRunInComposer = (): ((runId: string) => void) => {
  const { openSendTaskModal, expandRunningSendTask } = useSendTaskModal();
  return useCallback(
    (runId: string) => {
      void retryRunInComposer({
        runId,
        loadRun: loadRunForRetry,
        openComposer: openSendTaskModal,
        expandRun: expandRunningSendTask,
      });
    },
    [expandRunningSendTask, openSendTaskModal],
  );
};
