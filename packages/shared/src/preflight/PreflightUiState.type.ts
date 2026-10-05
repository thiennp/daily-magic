import type { PreflightRunResult } from "./PreflightResult.type";

/**
 * Presentation states for CLI / AWL / AWC (note 02). Distinct from
 * PreflightResultStatus (pass|warn|block|errored|skipped) which is the
 * engine roll-up; this is what chrome shows.
 */
export type PreflightUiState =
  | { readonly kind: "idle" }
  | { readonly kind: "running" }
  | { readonly kind: "passed" }
  | {
      readonly kind: "blocked";
      readonly result: PreflightRunResult;
    }
  | {
      readonly kind: "errored";
      readonly safeMessage: string;
    }
  | { readonly kind: "skipped" };
