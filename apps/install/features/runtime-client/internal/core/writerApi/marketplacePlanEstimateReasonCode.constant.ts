/** Mac vibe plan/estimate observability (Testi grep). Keep in sync with `scripts/dispatch/marketplacePlanEstimateReasonCode.constant.ts`. */
export const MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY =
  "MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY";

export const MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID =
  "MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID";

export const MARKETPLACE_PLAN_ESTIMATE_LOG_PASS_PREFIX =
  "[agent-witch] marketplace plan/estimate modelOverride=";

/** Testi grep when Anthropic Writer API key is missing (intentional claude-cli fallback). */
export const MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_MISSING_KEY =
  "[agent-witch] marketplace plan/estimate falling back to claude-cli (Writer API key missing)";

export const MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_EMPTY_CATALOG =
  "[agent-witch] marketplace plan/estimate falling back to claude-cli (empty catalog model id)";
