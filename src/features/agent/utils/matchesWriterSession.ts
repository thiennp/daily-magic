import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

export const matchesWriterSession = (
  state: AgentLiveTerminalState,
  payload: Record<string, unknown>,
): boolean => {
  const writerSessionId =
    typeof payload.writerSessionId === "string" ? payload.writerSessionId : "";

  if (
    state.sessionWriterSessionId !== null &&
    writerSessionId.length > 0 &&
    writerSessionId !== state.sessionWriterSessionId
  ) {
    return false;
  }

  return true;
};
