import type { PromptSdlcCycleStatus } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcWriterErrorKind } from "./readPromptSdlcWriterOutput";

/**
 * Agent-facing honesty enum for get_cycle snapshots.
 * timeout / interrupt / no_reply are never silent success.
 */
export type PromptSdlcAgentOutcome =
  | "passed"
  | "failed"
  | "timeout"
  | "interrupt"
  | "no_reply"
  | "usage_limit"
  | "action_required"
  | "budget_exceeded"
  | "judging"
  | "improving"
  | "awaiting_local"
  | "wizard_paused"
  | "stopped";

export const derivePromptSdlcAgentOutcome = (input: {
  readonly status: PromptSdlcCycleStatus;
  readonly errorKind?: PromptSdlcWriterErrorKind | null;
}): PromptSdlcAgentOutcome => {
  if (input.status === "passed") {
    return "passed";
  }
  if (input.errorKind === "writer_timeout") {
    return "timeout";
  }
  if (input.errorKind === "writer_interrupted") {
    return "interrupt";
  }
  if (input.errorKind === "writer_no_reply") {
    return "no_reply";
  }
  if (input.errorKind === "usage_limit") {
    return "usage_limit";
  }
  if (input.errorKind === "action_required") {
    return "action_required";
  }
  if (input.errorKind === "budget_exceeded") {
    return "budget_exceeded";
  }
  if (input.status === "failed") {
    return "failed";
  }
  if (input.status === "stopped") {
    return "stopped";
  }
  return input.status;
};
