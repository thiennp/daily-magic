export type AgentRunHonestyOutcomeKind =
  | "passed"
  | "degraded"
  | "failed"
  | "waiting_you"
  | "running"
  | "connecting"
  | "stopped"
  | "timed_out";

export type AgentRunHonestyOutcome = {
  readonly kind: AgentRunHonestyOutcomeKind;
  readonly chipLabel: string;
  readonly summaryLines: readonly string[];
};

export type AgentRunHonestyLiveStatus =
  | "idle"
  | "starting"
  | "waiting_approval"
  | "streaming"
  | "stopping"
  | "error"
  | "finished";
