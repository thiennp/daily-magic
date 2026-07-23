"use client";

import { useCallback, type Dispatch, type SetStateAction } from "react";

import {
  bindAgentLiveTerminalDispatchedRunId,
  markAgentLiveTerminalStopRequested,
} from "@/features/agent/utils/agentLiveTerminalStopRun";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { sendAgentRunStop } from "@/features/dispatch/utils/sendAgentRunStop";

export const useAgentLiveTerminalStopRun = (
  state: AgentLiveTerminalState,
  setState: Dispatch<SetStateAction<AgentLiveTerminalState>>,
): {
  readonly bindDispatchedRunId: (runId: string) => void;
  readonly stopRun: () => void;
} => {
  const bindDispatchedRunId = useCallback(
    (runId: string) => {
      setState((current) =>
        bindAgentLiveTerminalDispatchedRunId(current, runId),
      );
    },
    [setState],
  );

  const stopRun = useCallback(() => {
    const runId = state.activeRunId;
    if (runId === null || runId.length === 0) {
      return;
    }

    setState((current) => markAgentLiveTerminalStopRequested(current));
    void sendAgentRunStop(runId).then((result) => {
      if (result.ok) {
        return;
      }

      setState((current) =>
        current.activeRunId === runId && current.status === "stopping"
          ? {
              ...current,
              status: "streaming",
              output: `${current.output}${
                current.output.endsWith("\n") ? "" : "\n"
              }${result.errorMessage ?? "Could not stop run."}\n`,
            }
          : current,
      );
    });
  }, [setState, state.activeRunId]);

  return { bindDispatchedRunId, stopRun };
};
