import { countPromptSdlcNonImprovingRounds } from "@/lib/promptOptimizer/countPromptSdlcNonImprovingRounds";
import { listPromptSdlcLastTryReasons } from "@/lib/promptOptimizer/listPromptSdlcLastTryReasons";
import {
  PROMPT_SDLC_STALL_ROUNDS,
  PROMPT_SDLC_STOP_ROUND_LIMIT,
  PROMPT_SDLC_STOP_STALL,
} from "@/lib/promptOptimizer/promptSdlcLimits.constant";
import { reconcilePromptSdlcAvoidReasons } from "@/lib/promptOptimizer/reconcilePromptSdlcAvoidReasons";

export const formatPromptSdlcStallStop = (
  reasons: readonly string[],
): string => {
  const lines = reconcilePromptSdlcAvoidReasons(reasons);
  if (lines.length === 0) {
    return PROMPT_SDLC_STOP_STALL;
  }

  return `${PROMPT_SDLC_STOP_STALL} Avoid: ${lines.join("; ")}.`;
};

/**
 * Round-limit or flat-score early-stop (clean stop; best prompt kept).
 * Flat early-stop uses earlyStopFlat when set, else PROMPT_SDLC_STALL_ROUNDS.
 * Behavior: status "stopped" (not failed) — useThisPrompt stays false; only passed is usable.
 */
export const readPromptSdlcRewriteStop = (input: {
  readonly scores: readonly number[];
  readonly reasons?: readonly string[];
  readonly round: number;
  readonly maxRounds: number;
  /** Override stall threshold (Product earlyStopFlat knob). */
  readonly earlyStopFlat?: number | null;
}): { readonly type: "stopped"; readonly errorMessage: string } | null => {
  if (input.round + 1 >= input.maxRounds) {
    return {
      type: "stopped",
      errorMessage: PROMPT_SDLC_STOP_ROUND_LIMIT,
    };
  }

  const stallLimit =
    input.earlyStopFlat !== undefined &&
    input.earlyStopFlat !== null &&
    Number.isFinite(input.earlyStopFlat) &&
    input.earlyStopFlat >= 1
      ? Math.floor(input.earlyStopFlat)
      : PROMPT_SDLC_STALL_ROUNDS;

  if (countPromptSdlcNonImprovingRounds(input.scores) >= stallLimit) {
    const pairs = input.scores.map((score, index) => ({
      score,
      reasons: input.reasons?.[index] ?? "",
    }));
    return {
      type: "stopped",
      errorMessage: formatPromptSdlcStallStop(
        listPromptSdlcLastTryReasons(pairs),
      ),
    };
  }

  return null;
};
