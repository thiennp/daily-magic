import { loadAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import type { PersistedTerminalSession } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { shouldPersistAgentLiveTerminalOutput } from "@/features/agent/utils/shouldPersistAgentLiveTerminalOutput";
import { getAgentRunLocalCache } from "@/features/reports/public-api/presentation";
import { resolveRestoredLiveTerminalStatus } from "@/features/agent/utils/resolveRestoredLiveTerminalStatus";
import { resolveAgentRunLastAliveMs } from "@/lib/dispatch/isAgentRunSilentPastStall";
import { seedRestoredAgentLivePendingInput } from "@/features/agent/utils/seedRestoredAgentLivePendingInput";

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
  const cachedRun =
    session.activeRunId !== null
      ? getAgentRunLocalCache(session.activeRunId)
      : null;
  const status = resolveRestoredLiveTerminalStatus({
    status: session.status,
    lastAliveMs: [
      Date.parse(session.updatedAt),
      cachedRun === null ? null : resolveAgentRunLastAliveMs(cachedRun),
    ],
    nowMs: Date.now(),
  });

  return {
    ...initialAgentLiveTerminalState(),
    activeRunId: session.activeRunId,
    output,
    status,
    pendingCommandLine: session.pendingCommandLine,
    sessionWriterAgent: session.sessionWriterAgent,
    sessionDeviceId: session.sessionDeviceId,
    sessionWriterSessionId: session.sessionWriterSessionId ?? null,
    pendingInput:
      session.activeRunId === null
        ? null
        : seedRestoredAgentLivePendingInput({
            runId: session.activeRunId,
            status,
            reportSummary: cachedRun?.reportSummary ?? null,
            output,
          }),
  };
};
