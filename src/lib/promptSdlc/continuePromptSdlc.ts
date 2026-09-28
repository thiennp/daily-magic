import { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
import { choosePromptSdlcImproverReference } from "@/lib/promptSdlc/choosePromptSdlcImproverReference";
import { parsePromptSdlcJudgeVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";
import type { PromptSdlcVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";
import type { PromptSdlcPriorRound } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";
import {
  JUDGE_REPLY_WAS_NOT_A_SCORE,
  type PromptSdlcContinuation,
} from "@/lib/promptSdlc/promptSdlcContinuation.type";
import { PROMPT_SDLC_MAX_ROUNDS } from "@/lib/promptSdlc/promptSdlcLimits.constant";
import { readPromptSdlcRewriteStop } from "@/lib/promptSdlc/readPromptSdlcRewriteStop";
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
  readonly round?: number;
  readonly maxRounds?: number;
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

  const priorRounds = input.priorRounds ?? [];
  const round = input.round ?? priorRounds.length;
  const scored = [
    ...priorRounds.map((item) => ({
      score: item.score,
      reasons: item.reasons,
    })),
    { score: verdict.score, reasons: verdict.reasons },
  ];
  const stop = readPromptSdlcRewriteStop({
    scores: scored.map((item) => item.score),
    reasons: scored.map((item) => item.reasons),
    round,
    maxRounds: input.maxRounds ?? PROMPT_SDLC_MAX_ROUNDS,
  });
  if (stop !== null) {
    return { verdict, continuation: stop };
  }

  const reference = choosePromptSdlcImproverReference({
    current: {
      roundNumber: round,
      promptText: input.promptText,
      score: verdict.score,
      reasons: verdict.reasons,
    },
    priorRounds,
  });

  return {
    verdict,
    continuation: {
      type: "call",
      role: "improve",
      choice: input.improver,
      prompt: buildPromptSdlcImproverPrompt({
        goal: input.goal,
        promptText: reference.promptText,
        score: reference.score,
        reasons: reference.reasons,
        avoid: reference.avoid,
      }),
    },
  };
};
