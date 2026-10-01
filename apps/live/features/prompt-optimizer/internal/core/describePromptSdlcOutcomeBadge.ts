import type { PromptSdlcCycleStatus } from "../../../../adapters/promptSdlcAwcCore";
import { PROMPT_SDLC_COST_COPY } from "./promptSdlcCostControl.constant";
import { derivePromptSdlcAgentOutcome } from "./derivePromptSdlcAgentOutcome";
import type { PromptSdlcWriterErrorKind } from "./readPromptSdlcWriterOutput";

export type PromptSdlcOutcomeBadge = {
  readonly badgeClass: string;
  readonly badgeLabel: string;
  readonly outcome: ReturnType<typeof derivePromptSdlcAgentOutcome>;
};

/**
 * Unmistakable terminal outcome chrome for failed / budget_exceeded / timeout / etc.
 * useThisPrompt remains gated separately (only status === passed).
 */
export const describePromptSdlcOutcomeBadge = (input: {
  readonly status: PromptSdlcCycleStatus;
  readonly errorKind?: PromptSdlcWriterErrorKind | null;
}): PromptSdlcOutcomeBadge => {
  const outcome = derivePromptSdlcAgentOutcome({
    status: input.status,
    errorKind: input.errorKind ?? undefined,
  });
  if (outcome === "budget_exceeded") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",
      badgeLabel: PROMPT_SDLC_COST_COPY.budgetExceededBadge,
      outcome,
    };
  }
  if (outcome === "failed") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-failed",
      badgeLabel: "Failed",
      outcome,
    };
  }
  if (outcome === "timeout") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-failed",
      badgeLabel: "Timed out",
      outcome,
    };
  }
  if (outcome === "interrupt") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-failed",
      badgeLabel: "Interrupted",
      outcome,
    };
  }
  if (outcome === "no_reply") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-failed",
      badgeLabel: "No reply",
      outcome,
    };
  }
  if (outcome === "usage_limit") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-failed",
      badgeLabel: "Usage limit",
      outcome,
    };
  }
  if (outcome === "action_required") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-failed",
      badgeLabel: "Action required",
      outcome,
    };
  }
  if (outcome === "passed") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-done",
      badgeLabel: "Passed",
      outcome,
    };
  }
  if (outcome === "stopped") {
    return {
      badgeClass: "sdlc-run-badge sdlc-run-badge-finished",
      badgeLabel: "Finished",
      outcome,
    };
  }
  return {
    badgeClass: "sdlc-run-badge",
    badgeLabel: outcome.replaceAll("_", " "),
    outcome,
  };
};
