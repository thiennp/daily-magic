/** Wire-ready reason codes (Desi P0 — do not rename in UI). */
export const AgentRunBudgetReasonCode = {
  ESTIMATE_OK: "estimate_ok",
  ESTIMATE_PAST: "estimate_past",
  SESSION_LIMIT_APPROACHING: "session_limit_approaching",
  SESSION_LIMIT_HIT: "session_limit_hit",
} as const;

export type AgentRunBudgetReasonCodeValue =
  (typeof AgentRunBudgetReasonCode)[keyof typeof AgentRunBudgetReasonCode];

/** Chip / meta — never use for session-limit hard stop. */
export const AGENT_RUN_WORKING_ESTIMATE_CHIP_LABEL = "Working estimate";

/** Chip when SESSION LIMIT applies — never interchange with estimate. */
export const AGENT_RUN_SESSION_LIMIT_CHIP_LABEL = "Session limit";

export const AGENT_RUN_ESTIMATE_PAST_TITLE = "Past working estimate";

export const AGENT_RUN_SESSION_LIMIT_APPROACHING_TITLE =
  "Approaching session limit";

export const AGENT_RUN_SESSION_LIMIT_HIT_TITLE = "Session limit reached";

export const AGENT_RUN_SESSION_LIMIT_HIT_BODY =
  "This run stopped at the session limit. That is a hard stop — not a missed estimate.";

export const buildAgentRunEstimatePastBody = (
  workingEstimateLabel: string,
): string =>
  `This run is past its working estimate (about ${workingEstimateLabel}). It can keep going until the session limit.`;

export const buildAgentRunSessionLimitApproachingBody = (): string =>
  "This run is near the session limit — a hard stop. Wrap up or expect the run to stop when the limit is hit.";

export const buildAgentRunSessionLimitApproachingSecondary = (
  workingEstimateLabel: string,
): string => `Working estimate was about ${workingEstimateLabel} (soft).`;

export const buildAgentRunEstimateOkMeta = (
  workingEstimateLabel: string,
): string => `About ${workingEstimateLabel} for this run`;
