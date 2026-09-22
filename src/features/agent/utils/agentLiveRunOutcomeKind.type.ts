export type AgentLiveRunOutcomeKind =
  "passed" | "degraded" | "failed" | "waiting_you" | "running";

export type AgentLiveRunOutcome = {
  readonly kind: AgentLiveRunOutcomeKind;
  readonly chipLabel: string;
  readonly summaryLines: readonly string[];
};
