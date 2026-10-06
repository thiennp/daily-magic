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

/** Pimi auth addendum — exact copy; do not paraphrase. */
export const CLAUDE_LOGIN_EXPIRED_LOCKED_REASON =
  "Claude login expired — sign in again to continue.";

/** Pimi auth addendum — exact copy (curly apostrophe in can’t). */
export const WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON =
  "Writer API key missing and Claude CLI can’t run.";

export const formatAgentRunHonestyWaitingYouTerminalSummary = (
  reason: string,
): string => `Waiting on you — ${reason}`;

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
