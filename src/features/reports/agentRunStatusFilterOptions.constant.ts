import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { AGENT_RUN_TIMED_OUT_COPY } from "@/features/reports/agentRunTimedOutCopy.constant";

export const STATUS_FILTER_OPTIONS: readonly {
  readonly label: string;
  readonly value: AgentRunStatusValue | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Pending approval", value: AgentRunStatus.PENDING_APPROVAL },
  { label: "Running", value: AgentRunStatus.RUNNING },
  { label: "Completed", value: AgentRunStatus.COMPLETED },
  { label: "Failed", value: AgentRunStatus.FAILED },
  { label: "Denied", value: AgentRunStatus.DENIED },
  { label: AGENT_RUN_TIMED_OUT_COPY.statusLabel, value: AgentRunStatus.EXPIRED },
];
