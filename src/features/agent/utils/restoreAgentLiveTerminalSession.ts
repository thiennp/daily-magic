import { loadAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import type { PersistedTerminalSession } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { shouldPersistAgentLiveTerminalOutput } from "@/features/agent/utils/shouldPersistAgentLiveTerminalOutput";

export const restoreAgentLiveTerminalSession = (
  session: PersistedTerminalSession,
): AgentLiveTerminalState => {
  const persistedOutput = shouldPersistAgentLiveTerminalOutput()
    ? session.output
    : "";
  const cachedOutput =
    session.activeRunId !== null
      ? loadAgentRunTerminalOutput(session.activeRunId)
      : "";
  const output =
    persistedOutput.length > 0
      ? persistedOutput
      : cachedOutput.length > 0
        ? cachedOutput
        : "";

  return {
    ...initialAgentLiveTerminalState(),
    activeRunId: session.activeRunId,
    output,
    status: session.status,
    pendingCommandLine: session.pendingCommandLine,
    sessionWriterAgent: session.sessionWriterAgent,
    sessionDeviceId: session.sessionDeviceId,
    sessionWriterSessionId: session.sessionWriterSessionId ?? null,
  };
};
