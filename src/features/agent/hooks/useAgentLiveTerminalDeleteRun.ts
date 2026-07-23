"use client";

import { useCallback, type Dispatch, type SetStateAction } from "react";

import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { finishAgentLiveTerminalSession } from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { finishAgentLiveTerminalWriterSession } from "@/features/agent/utils/sendWriterSessionEnd";
import { deleteAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";

export const useAgentLiveTerminalDeleteRun = (
  socketRef: { readonly current: WebSocket | null },
  state: AgentLiveTerminalState,
  setState: Dispatch<SetStateAction<AgentLiveTerminalState>>,
): {
  readonly deleteRun: () => void;
} => {
  const deleteRun = useCallback(() => {
    const runId = state.activeRunId;
    if (runId === null || runId.length === 0) {
      return;
    }

    void deleteAgentRunHistory(runId);
    setState((current) => {
      if (current.activeRunId !== runId) {
        return current;
      }

      finishAgentLiveTerminalWriterSession(socketRef.current, current);
      return finishAgentLiveTerminalSession();
    });
  }, [setState, socketRef, state.activeRunId]);

  return { deleteRun };
};
