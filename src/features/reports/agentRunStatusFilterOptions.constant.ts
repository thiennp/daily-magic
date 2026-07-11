import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

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
  { label: "Expired", value: AgentRunStatus.EXPIRED },
];
