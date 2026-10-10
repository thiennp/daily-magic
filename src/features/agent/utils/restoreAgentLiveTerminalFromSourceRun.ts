import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { loadAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { mapAgentRunStatusToLiveTerminalStatus } from "@/features/agent/utils/mapAgentRunStatusToLiveTerminalStatus";
import { readTerminalStore } from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { restoreAgentLiveTerminalSession } from "@/features/agent/utils/restoreAgentLiveTerminalSession";
import { isRestorableAgentLiveTerminalStatus } from "@/features/agent/utils/isRestorableAgentLiveTerminalStatus";
import { getAgentRunLocalCache } from "@/features/reports/public-api/presentation";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import { isAgentRunSilentPastStall } from "@/lib/dispatch/isAgentRunSilentPastStall";
import { seedRestoredAgentLivePendingInput } from "@/features/agent/utils/seedRestoredAgentLivePendingInput";

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
  // 6253aa7e: a run silent for hours restores as ended (Retry), not live.
  const status = isAgentRunSilentPastStall(run, Date.now())
    ? "timed_out"
    : mapAgentRunStatusToLiveTerminalStatus(run.status);

  return {
    ...initialAgentLiveTerminalState(),
    activeRunId: sourceRunId,
    output,
    status,
    sessionWriterAgent: isHarnessWriterAgent(run.writerAgent)
      ? run.writerAgent
      : null,
    sessionDeviceId: run.deviceId,
    pendingInput: seedRestoredAgentLivePendingInput({
      runId: sourceRunId,
      status,
      reportSummary: run.reportSummary ?? null,
    }),
  };
};
