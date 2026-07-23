"use client";

import { useCallback } from "react";

import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { sendAgentRunStop } from "@/features/dispatch/utils/sendAgentRunStop";

export const useAgentLiveTerminalStopRun = (
  socketRef: { readonly current: WebSocket | null },
  state: AgentLiveTerminalState,
): {
  readonly stopRun: () => void;
} => {
  const stopRun = useCallback(() => {
    const runId = state.activeRunId;
    if (runId === null || runId.length === 0) {
      return;
    }

    void sendAgentRunStop(socketRef.current, runId);
  }, [socketRef, state.activeRunId]);

  return { stopRun };
};
