import {
  buildPromptSdlcJudgePrompt,
  buildPromptSdlcWizardEvaluateJudgePrompt,
} from "../../../../adapters/promptSdlcAwcCore";

import type {
  PromptSdlcLocalCycle,
  PromptSdlcLocalRevision,
} from "./promptSdlcLocalCycle.type";

export const readPromptSdlcWizardRevisionRoundJudgePrompt = (
  cycle: PromptSdlcLocalCycle,
  revision: Pick<PromptSdlcLocalRevision, "promptText" | "run">,
): string | null => {
  if (cycle.judgePromptTextOnly === true) {
    const prompt = buildPromptSdlcWizardEvaluateJudgePrompt({
      goal: cycle.goal,
      promptText: revision.promptText,
      passScore: cycle.passScore,
      instructions: cycle.judgeInstructions,
    }).trim();
    return prompt.length === 0 ? null : prompt;
  }
  const run = revision.run;
  if (run === undefined) {
    return null;
  }
  const prompt = buildPromptSdlcJudgePrompt({
    goal: cycle.goal,
    lookedAt: run.lookedAt ?? "the writer reply",
    evidence: run.evidence ?? run.output,
    tokens: run.tokens,
    delayMs: run.delayMs,
    passScore: cycle.passScore,
    instructions: cycle.judgeInstructions,
  }).trim();
  return prompt.length === 0 ? null : prompt;
};
