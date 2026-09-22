import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

/** Pimi/Desi locked chip labels — do not paraphrase in product UI. */
export const AGENT_RUN_HONESTY_CHIP_LABEL = {
  passed: "Success",
  degraded: "Completed with fallback",
  failed: "Failed",
  waiting_you: "Waiting on you",
  running: "In progress",
  connecting: "Connecting",
  stopped: "Stopped",
  timed_out: "Timed out",
} as const;

export const AGENT_RUN_HONESTY_EMPTY_ACTIVE_DETAIL = "Waiting for output…";

export const AGENT_RUN_HONESTY_USED_FALLBACK_SUFFIX = "Used fallback";

export const formatAgentRunHonestySkippedDetail = (reason: string): string =>
  `Skipped — ${reason}`;

export const formatAgentRunHonestyDegradedSummary = (reason: string): string =>
  `Completed with fallback — ${reason}`;

export const formatAgentRunHonestyFailedSummary = (reason: string): string =>
  `Failed — ${reason}`;

export const MARKETPLACE_CLI_FALLBACK_LOCKED_REASON =
  "Writer API key missing — ran via CLI fallback.";

export const resolveMarketplacePlanEstimateFallbackReason = (
  reasonCode: string | null,
): string => {
  if (
    reasonCode === MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY
  ) {
    return MARKETPLACE_CLI_FALLBACK_LOCKED_REASON;
  }
  if (reasonCode !== null && reasonCode.trim().length > 0) {
    return reasonCode.replaceAll("_", " ").toLowerCase();
  }
  return AGENT_RUN_HONESTY_USED_FALLBACK_SUFFIX;
};

export const isCliFallbackMarketplacePlanEstimateBackend = (
  backend: string | null,
): boolean =>
  backend !== null &&
  (backend === "cli-fallback-missing-anthropic-writer-api-key" ||
    backend.startsWith("cli-fallback"));

export const isStoppedByUserOutput = (output: string): boolean =>
  /Stopped by user\.?/i.test(output);
