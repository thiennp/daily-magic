import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

export const markAgentLiveTerminalStopRequested = (
  state: AgentLiveTerminalState,
): AgentLiveTerminalState => {
  if (
    state.activeRunId === null ||
    state.activeRunId.length === 0 ||
    state.status === "stopping" ||
    state.status === "finished" ||
    state.status === "idle"
  ) {
    return state;
  }

  return {
    ...state,
    status: "stopping",
  };
};

export const bindAgentLiveTerminalDispatchedRunId = (
  state: AgentLiveTerminalState,
  runId: string,
): AgentLiveTerminalState => {
  const trimmedRunId = runId.trim();
  if (
    trimmedRunId.length === 0 ||
    state.activeRunId !== null ||
    state.sessionWriterAgent === null ||
    (state.status !== "starting" && state.status !== "waiting_approval")
  ) {
    return state;
  }

  return {
    ...state,
    activeRunId: trimmedRunId,
  };
};
