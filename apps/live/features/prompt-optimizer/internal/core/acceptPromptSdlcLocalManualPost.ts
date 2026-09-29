import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import { stopPromptSdlcLocalCycle } from "./stopPromptSdlcLocalCycle";
import { appendPromptSdlcLocalTokenReview } from "./appendPromptSdlcLocalTokenReview";
import {
  applyPromptSdlcLocalImproverReply,
  applyPromptSdlcLocalJudgeReply,
} from "./applyPromptSdlcLocalReply";
import { isPromptSdlcLocalManualWait } from "./isPromptSdlcLocalManualWait";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

const JUDGE_ERROR = "Add a score from 0 to 100 and the reason for it.";
const WIZARD_EVALUATE_JUDGE_ERROR =
  "Add a score from 1 to 100 and the reason for it.";
const IMPROVE_ERROR = "Write the next prompt.";
const STEP_ERROR = "This step is not waiting for you.";

const wholeScore = (text: string): number | null => {
  const score = Number(text);
  return /^\d{1,3}$/.test(text) && score >= 0 && score <= 100 ? score : null;
};

export const acceptPromptSdlcLocalManualPost = (input: {
  readonly posted: URLSearchParams;
  readonly storePath: string;
}):
  | { readonly kind: "ignored" }
  | { readonly kind: "missing" }
  | {
      readonly kind: "invalid";
      readonly cycle: PromptSdlcLocalCycle;
      readonly errorMessage: string;
    }
  | { readonly kind: "saved"; readonly cycleId: string } => {
  const intent = input.posted.get("intent");
  if (intent === "stop") {
    const cycleId = input.posted.get("cycleId") ?? "";
    return stopPromptSdlcLocalCycle(input.storePath, cycleId)
      ? { kind: "saved", cycleId }
      : { kind: "missing" };
  }
  if (intent !== "manual-judge" && intent !== "manual-improve") {
    return { kind: "ignored" };
  }

  const cycleId = input.posted.get("cycleId") ?? "";
  const cycle = readPromptSdlcLocalCycle(input.storePath, cycleId);
  if (cycle === null || !isPromptSdlcLocalManualWait(cycle)) {
    return cycle === null
      ? { kind: "missing" }
      : { kind: "invalid", cycle, errorMessage: STEP_ERROR };
  }

  if (intent === "manual-judge") {
    if (cycle.judgeModel !== PROMPT_SDLC_MANUAL_ACTOR) {
      return { kind: "invalid", cycle, errorMessage: STEP_ERROR };
    }
    const score = wholeScore(input.posted.get("score") ?? "");
    const reasons = (input.posted.get("reasons") ?? "").trim();
    const wizardEvaluateStep =
      cycle.wizard !== undefined &&
      (cycle.wizard.phase === "evaluate" || cycle.wizard.gate === "evaluate");
    if (score === null || reasons.length === 0) {
      return {
        kind: "invalid",
        cycle,
        errorMessage: wizardEvaluateStep
          ? WIZARD_EVALUATE_JUDGE_ERROR
          : JUDGE_ERROR,
      };
    }
    if (wizardEvaluateStep && score === 0) {
      return {
        kind: "invalid",
        cycle,
        errorMessage: WIZARD_EVALUATE_JUDGE_ERROR,
      };
    }
    const tokenReview =
      cycle.revisions.find((item) => item.roundNumber === cycle.currentRound)
        ?.run?.tokenReview ?? "";
    const next = appendPromptSdlcLocalTokenReview(
      applyPromptSdlcLocalJudgeReply(
        cycle,
        JSON.stringify({
          score,
          passed: score >= cycle.passScore,
          reasons,
        }),
      ),
      tokenReview,
    );
    savePromptSdlcLocalCycle(input.storePath, next);
    return { kind: "saved", cycleId: cycle.id };
  }

  if (cycle.improverModel !== PROMPT_SDLC_MANUAL_ACTOR) {
    return { kind: "invalid", cycle, errorMessage: STEP_ERROR };
  }
  const prompt = (input.posted.get("prompt") ?? "").trim();
  if (prompt.length === 0) {
    return { kind: "invalid", cycle, errorMessage: IMPROVE_ERROR };
  }
  const next = applyPromptSdlcLocalImproverReply(cycle, prompt);
  savePromptSdlcLocalCycle(input.storePath, next);
  return { kind: "saved", cycleId: cycle.id };
};
