import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { loadAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { mapAgentRunStatusToLiveTerminalStatus } from "@/features/agent/utils/mapAgentRunStatusToLiveTerminalStatus";
import { readTerminalStore } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { restoreAgentLiveTerminalSession } from "@/features/agent/utils/restoreAgentLiveTerminalSession";
import { isRestorableAgentLiveTerminalStatus } from "@/features/agent/utils/isRestorableAgentLiveTerminalStatus";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";

/** Prefer archived live-session chrome, then job-history cache. */
export const restoreAgentLiveTerminalFromSourceRun = (
  sourceRunId: string,
): AgentLiveTerminalState | null => {
  const store = readTerminalStore();
  const archived =
    store.byRunId[sourceRunId] ??
    (store.current?.activeRunId === sourceRunId ? store.current : null);
  if (
    archived !== null &&
    archived !== undefined &&
    isRestorableAgentLiveTerminalStatus(archived.status)
  ) {
    return restoreAgentLiveTerminalSession(archived);
  }

  const run = getAgentRunLocalCache(sourceRunId);
  if (run === null) {
    return null;
  }

  const cachedOutput = loadAgentRunTerminalOutput(sourceRunId);
  const output =
    cachedOutput.length > 0
      ? cachedOutput
      : (run.resultOutput ?? "").length > 0
        ? (run.resultOutput ?? "")
        : "";

  return {
    ...initialAgentLiveTerminalState(),
    activeRunId: sourceRunId,
    output,
    status: mapAgentRunStatusToLiveTerminalStatus(run.status),
    sessionWriterAgent: isHarnessWriterAgent(run.writerAgent)
      ? run.writerAgent
      : null,
    sessionDeviceId: run.deviceId,
  };
};
