import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { isLiveAgentLiveTerminalStatus } from "@/features/agent/utils/isLiveAgentLiveTerminalStatus";
import { AGENT_RUN_SILENT_STALL_MS } from "@/lib/dispatch/agentRunHeartbeat.constant";

/**
 * ed42d8ce / 6253aa7e: a stored "streaming" session from hours ago came back
 * on every load and pinned New task to its computer. A live status with no
 * sign of life past the stall window restores as timed out instead.
 */
export const resolveRestoredLiveTerminalStatus = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly lastAliveMs: readonly (number | null)[];
  readonly nowMs: number;
}): AgentLiveTerminalStatus => {
  if (!isLiveAgentLiveTerminalStatus(input.status)) {
    return input.status;
  }
  const known = input.lastAliveMs.filter(
    (ms): ms is number => ms !== null && Number.isFinite(ms),
  );
  if (known.length === 0) {
    return input.status;
  }
  return input.nowMs - Math.max(...known) > AGENT_RUN_SILENT_STALL_MS
    ? "timed_out"
    : input.status;
};
