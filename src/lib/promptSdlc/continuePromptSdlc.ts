import { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
import { buildPromptSdlcJudgePrompt } from "@/lib/promptSdlc/buildPromptSdlcJudgePrompt";
import { extractImprovedPrompt } from "@/lib/promptSdlc/extractImprovedPrompt";
import { parsePromptJudgementVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";
import type { PromptSdlcVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";
import type { PromptSdlcPriorRound } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";
import { selectPromptSdlcImproverHistory } from "@/lib/promptSdlc/selectPromptSdlcImproverHistory";
import type { PromptSdlcModelChoice } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export type PromptSdlcContinuation =
  | {
      readonly type: "call";
      readonly role: "judge" | "improve";
      readonly prompt: string;
      readonly choice: PromptSdlcModelChoice;
    }
  | { readonly type: "passed" }
  | { readonly type: "stopped" }
  | { readonly type: "failed"; readonly errorMessage: string };

export const JUDGE_REPLY_WAS_NOT_A_SCORE =
  "The judge reply needs a score and a reason.";

export const IMPROVER_REPLY_WAS_EMPTY = "The improver reply was empty.";

export const buildJudgeContinuation = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly passScore: number;
  readonly choice: PromptSdlcModelChoice;
}): PromptSdlcContinuation => ({
  type: "call",
  role: "judge",
  choice: input.choice,
  prompt: buildPromptSdlcJudgePrompt({
    goal: input.goal,
    promptText: input.promptText,
    passScore: input.passScore,
  }),
});

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
  const verdict = parsePromptJudgementVerdict(input.raw);
  if (verdict === null) {
    return {
      verdict: null,
      continuation: {
        type: "failed",
        errorMessage: JUDGE_REPLY_WAS_NOT_A_SCORE,
      },
    };
  }

  if (verdict.score >= input.passScore) {
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
