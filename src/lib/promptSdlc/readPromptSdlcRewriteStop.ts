import { countPromptSdlcNonImprovingRounds } from "@/lib/promptSdlc/countPromptSdlcNonImprovingRounds";
import {
  PROMPT_SDLC_STALL_ROUNDS,
  PROMPT_SDLC_STOP_ROUND_LIMIT,
  PROMPT_SDLC_STOP_STALL,
} from "@/lib/promptSdlc/promptSdlcLimits.constant";

export const readPromptSdlcRewriteStop = (input: {
  readonly scores: readonly number[];
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
    return { type: "stopped", errorMessage: PROMPT_SDLC_STOP_STALL };
  }

  return null;
};
