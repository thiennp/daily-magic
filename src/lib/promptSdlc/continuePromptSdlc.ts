import { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
import { parsePromptSdlcJudgeVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";
import type { PromptSdlcVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";
import type { PromptSdlcPriorRound } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";
import {
  JUDGE_REPLY_WAS_NOT_A_SCORE,
  type PromptSdlcContinuation,
} from "@/lib/promptSdlc/promptSdlcContinuation.type";
import { selectPromptSdlcImproverHistory } from "@/lib/promptSdlc/selectPromptSdlcImproverHistory";
import type { PromptSdlcModelChoice } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export type { PromptSdlcContinuation } from "@/lib/promptSdlc/promptSdlcContinuation.type";
export {
  IMPROVER_REPLY_WAS_EMPTY,
  JUDGE_REPLY_WAS_NOT_A_SCORE,
} from "@/lib/promptSdlc/promptSdlcContinuation.type";
export {
  buildJudgeContinuation,
  continueAfterImproveReply,
} from "@/lib/promptSdlc/continuePromptSdlcAfterImprove";

export const continueAfterJudgeReply = (input: {
  readonly raw: string;
  readonly passScore: number;
  readonly goal: string;
  readonly promptText: string;
  readonly improver: PromptSdlcModelChoice;
  readonly priorRounds?: readonly PromptSdlcPriorRound[];
}): {
  readonly verdict: PromptSdlcVerdict | null;
  readonly continuation: PromptSdlcContinuation;
} => {
  const verdict = parsePromptSdlcJudgeVerdict(input.raw, input.passScore);
  if (verdict === null) {
    return {
      verdict: null,
      continuation: {
        type: "failed",
        errorMessage: JUDGE_REPLY_WAS_NOT_A_SCORE,
      },
    };
  }

  if (verdict.passed) {
    return { verdict, continuation: { type: "passed" } };
  }

  return {
    verdict,
    continuation: {
      type: "call",
      role: "improve",
      choice: input.improver,
      prompt: buildPromptSdlcImproverPrompt({
        goal: input.goal,
        promptText: input.promptText,
        score: verdict.score,
        reasons: verdict.reasons,
        history: selectPromptSdlcImproverHistory({
          priorRounds: input.priorRounds ?? [],
          currentScore: verdict.score,
        }),
      }),
    },
  };
};
