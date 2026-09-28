import { countPromptSdlcNonImprovingRounds } from "@/lib/promptSdlc/countPromptSdlcNonImprovingRounds";
import { listPromptSdlcLastTryReasons } from "@/lib/promptSdlc/listPromptSdlcLastTryReasons";
import {
  PROMPT_SDLC_STALL_ROUNDS,
  PROMPT_SDLC_STOP_ROUND_LIMIT,
  PROMPT_SDLC_STOP_STALL,
} from "@/lib/promptSdlc/promptSdlcLimits.constant";
import { reconcilePromptSdlcAvoidReasons } from "@/lib/promptSdlc/reconcilePromptSdlcAvoidReasons";

export const formatPromptSdlcStallStop = (
  reasons: readonly string[],
): string => {
  const lines = reconcilePromptSdlcAvoidReasons(reasons);
  if (lines.length === 0) {
    return PROMPT_SDLC_STOP_STALL;
  }

  return `${PROMPT_SDLC_STOP_STALL} Avoid: ${lines.join("; ")}.`;
};

export const readPromptSdlcRewriteStop = (input: {
  readonly scores: readonly number[];
  readonly reasons?: readonly string[];
  readonly round: number;
  readonly maxRounds: number;
}): { readonly type: "stopped"; readonly errorMessage: string } | null => {
  if (input.round + 1 >= input.maxRounds) {
    return {
      type: "stopped",
      errorMessage: PROMPT_SDLC_STOP_ROUND_LIMIT,
    };
  }

  if (
    countPromptSdlcNonImprovingRounds(input.scores) >= PROMPT_SDLC_STALL_ROUNDS
  ) {
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
