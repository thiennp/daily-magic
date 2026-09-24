const FEEDBACK_OUTCOMES = ["ok", "blocked", "suggestion"] as const;

export type AgentAccessFeedbackOutcome = (typeof FEEDBACK_OUTCOMES)[number];

export interface AgentAccessFeedbackInput {
  readonly outcome: AgentAccessFeedbackOutcome;
  readonly summary: string;
  readonly detail: string | null;
}

const isOutcome = (value: unknown): value is AgentAccessFeedbackOutcome =>
  FEEDBACK_OUTCOMES.some((outcome) => outcome === value);

export const parseAgentAccessFeedback = (
  args: unknown,
): AgentAccessFeedbackInput | null => {
  if (typeof args !== "object" || args === null) {
    return null;
  }

  const record = args as Readonly<Record<string, unknown>>;
  const summary =
    typeof record.summary === "string" ? record.summary.trim() : "";

  if (
    !isOutcome(record.outcome) ||
    summary.length < 3 ||
    summary.length > 280
  ) {
    return null;
  }

  const detail =
    typeof record.detail === "string"
      ? record.detail.trim().slice(0, 2000)
      : "";

  return {
    outcome: record.outcome,
    summary,
    detail: detail.length > 0 ? detail : null,
  };
};
