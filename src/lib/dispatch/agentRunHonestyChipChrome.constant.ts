import type { AgentRunHonestyOutcomeKind } from "@/lib/dispatch/agentRunHonestyOutcome.type";

/** Pimi locked chrome roles — labels in `AGENT_RUN_HONESTY_CHIP_LABEL`. */
export type AgentRunHonestyChipChrome =
  "progress" | "attention" | "success" | "warning" | "error" | "stop";

export const AGENT_RUN_HONESTY_CHIP_CHROME: Record<
  AgentRunHonestyOutcomeKind,
  AgentRunHonestyChipChrome
> = {
  connecting: "progress",
  running: "progress",
  waiting_you: "attention",
  passed: "success",
  degraded: "warning",
  failed: "error",
  stopped: "stop",
  timed_out: "stop",
};
