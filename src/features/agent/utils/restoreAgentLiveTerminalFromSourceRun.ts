import { loadAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";

/** Hydrate the live panel from a specific finished job on this browser. */
export const restoreAgentLiveTerminalFromSourceRun = (
  sourceRunId: string,
): AgentLiveTerminalState | null => {
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
    status: "finished",
    sessionWriterAgent: isHarnessWriterAgent(run.writerAgent)
      ? run.writerAgent
      : null,
    sessionDeviceId: run.deviceId,
  };
};
