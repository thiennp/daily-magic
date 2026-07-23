"use client";

import type { Dispatch, SetStateAction } from "react";

import { useAgentLiveTerminalDeleteRun } from "@/features/agent/hooks/useAgentLiveTerminalDeleteRun";
import { useAgentLiveTerminalStopRun } from "@/features/agent/hooks/useAgentLiveTerminalStopRun";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

export const useAgentLiveTerminalRunControls = (
  socketRef: { readonly current: WebSocket | null },
  state: AgentLiveTerminalState,
  setState: Dispatch<SetStateAction<AgentLiveTerminalState>>,
): {
  readonly bindDispatchedRunId: (runId: string) => void;
  readonly stopRun: () => void;
  readonly deleteRun: () => void;
} => {
  const { bindDispatchedRunId, stopRun } = useAgentLiveTerminalStopRun(
    state,
    setState,
  );
  const { deleteRun } = useAgentLiveTerminalDeleteRun(
    socketRef,
    state,
    setState,
  );

  return { bindDispatchedRunId, stopRun, deleteRun };
};
