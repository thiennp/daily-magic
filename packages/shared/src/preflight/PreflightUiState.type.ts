import type { PreflightRunResult } from "./PreflightResult.type";

/**
 * Presentation states for CLI / AWL / AWC (note 02 + NRG follow-up).
 * Distinct from PreflightResultStatus which is the engine roll-up.
 */
export type PreflightUiState =
  | { readonly kind: "idle" }
  | { readonly kind: "running" }
  | { readonly kind: "passed" }
  | {
      /** Hard block and/or errored-check primary (red chrome). */
      readonly kind: "blocked";
      readonly result: PreflightRunResult;
    }
  | {
      /** Warn-only: soft note + continue path (no red block chrome). */
      readonly kind: "warned";
      readonly result: PreflightRunResult;
    }
  | {
      /** Whole preflight could not run (engine-level). */
      readonly kind: "errored";
      readonly safeMessage: string;
    }
  | { readonly kind: "skipped" };
