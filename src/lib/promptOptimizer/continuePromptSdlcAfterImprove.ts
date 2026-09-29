import { buildPromptSdlcStoredJudgePrompt } from "@/lib/promptOptimizer/buildPromptSdlcJudgePrompt";
import { extractImprovedPrompt } from "@/lib/promptOptimizer/extractImprovedPrompt";
import {
  IMPROVER_REPLY_WAS_EMPTY,
  type PromptSdlcContinuation,
} from "@/lib/promptOptimizer/promptSdlcContinuation.type";
import type { PromptSdlcModelChoice } from "@/lib/promptOptimizer/types/PromptSdlcModelChoice.type";

export const buildJudgeContinuation = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly passScore: number;
  readonly choice: PromptSdlcModelChoice;
}): PromptSdlcContinuation => ({
  type: "call",
  role: "judge",
  choice: input.choice,
  prompt: buildPromptSdlcStoredJudgePrompt({
    goal: input.goal,
    promptText: input.promptText,
    passScore: input.passScore,
  }),
});

export const continueAfterImproveReply = (input: {
  readonly raw: string;
  readonly judge: PromptSdlcModelChoice;
  readonly goal: string;
  readonly passScore: number;
}): {
  readonly nextPrompt: string | null;
  readonly continuation: PromptSdlcContinuation;
} => {
  const nextPrompt = extractImprovedPrompt(input.raw);
  if (nextPrompt === null) {
    return {
      nextPrompt: null,
      continuation: {
        type: "failed",
        errorMessage: IMPROVER_REPLY_WAS_EMPTY,
      },
    };
  }

  return {
    nextPrompt,
    continuation: buildJudgeContinuation({
      goal: input.goal,
      promptText: nextPrompt,
      passScore: input.passScore,
      choice: input.judge,
    }),
  };
};
