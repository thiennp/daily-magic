import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

export const AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL = {
  passed: "Success",
  degraded: "Completed with fallback",
  failed: "Failed",
  waiting_you: "Waiting on you",
  running: "In progress",
} as const;

export const AGENT_LIVE_PROGRESS_EMPTY_ACTIVE_DETAIL = "Waiting for output…";

export const formatAgentLiveProgressSkippedDetail = (input: {
  readonly stepLabel: string;
  readonly reason: string;
}): string => `${input.stepLabel}: Skipped — ${input.reason}`;

export const formatAgentLiveRunDegradedSummary = (reason: string): string =>
  `Completed with fallback — ${reason}`;

export const formatAgentLiveRunFailedSummary = (reason: string): string =>
  `Failed — ${reason}`;

export const resolveMarketplacePlanEstimateFallbackReason = (
  reasonCode: string | null,
): string => {
  if (
    reasonCode === MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY
  ) {
    return "Writer API key missing — used CLI fallback";
  }
  if (reasonCode !== null && reasonCode.trim().length > 0) {
    return reasonCode.replaceAll("_", " ").toLowerCase();
  }
  return "Used CLI fallback";
};

export const isCliFallbackMarketplacePlanEstimateBackend = (
  backend: string | null,
): boolean =>
  backend !== null &&
  (backend === "cli-fallback-missing-anthropic-writer-api-key" ||
    backend.startsWith("cli-fallback"));
