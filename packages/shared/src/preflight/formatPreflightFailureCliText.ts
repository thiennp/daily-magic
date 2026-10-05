import type { PreflightUiState } from "./PreflightUiState.type";
import { PREFLIGHT_FAILURE_COPY } from "./preflightFailureCopy.constant";
import { formatPreflightFailureFactsFromRun } from "./formatPreflightFailureFacts";
import { PREFLIGHT_RERUN_HINT } from "./preflightAction.constant";
import { sanitizePreflightDisplayText } from "./formatPreflightFailureFacts";

/**
 * Plain CLI block (≤~6 lines). Empty string for idle/passed (quiet).
 */
export const formatPreflightFailureCliText = (
  state: PreflightUiState,
): string => {
  switch (state.kind) {
    case "idle":
    case "passed":
      return "";
    case "running":
      return PREFLIGHT_FAILURE_COPY.running;
    case "skipped":
      return PREFLIGHT_FAILURE_COPY.skipped;
    case "errored": {
      const safe = sanitizePreflightDisplayText(state.safeMessage.trim());
      const message =
        safe.length > 0 ? safe : PREFLIGHT_FAILURE_COPY.secretSafeFallback;
      return [
        `${PREFLIGHT_FAILURE_COPY.erroredPrefix} ${message}`,
        `${PREFLIGHT_FAILURE_COPY.rerunLabel}: ${PREFLIGHT_RERUN_HINT}`,
      ].join("\n");
    }
    case "blocked": {
      const facts = formatPreflightFailureFactsFromRun(state.result);
      if (facts === null) {
        return "";
      }
      return [
        `${PREFLIGHT_FAILURE_COPY.title} · ${facts.checkId} (${facts.checkName})`,
        `${PREFLIGHT_FAILURE_COPY.reasonLabel}: ${facts.reason}`,
        `${PREFLIGHT_FAILURE_COPY.fixLabel}: ${facts.fix}`,
        `${PREFLIGHT_FAILURE_COPY.rerunLabel}: ${facts.rerunHint}`,
      ].join("\n");
    }
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
};
