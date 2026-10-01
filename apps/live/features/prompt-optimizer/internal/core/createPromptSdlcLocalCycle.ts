import {
  defaultPromptSdlcCostControls,
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_PASS_SCORE,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  type PromptSdlcCostControls,
  type PromptSdlcWizardState,
} from "../../../../adapters/promptSdlcAwcCore";
import os from "node:os";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const createPromptSdlcLocalCycle = (input: {
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly judgeModel: PromptSdlcLocalCycle["judgeModel"];
  readonly improverModel: PromptSdlcLocalCycle["improverModel"];
  readonly workingDirectory?: string;
  readonly passScore?: number;
  readonly maxRounds?: number;
  readonly sourceSkill?: PromptSdlcLocalCycle["sourceSkill"];
  readonly judgeInstructions?: string;
  readonly improverInstructions?: string;
  readonly wizard?: PromptSdlcWizardState;
  readonly runnerModel?: PromptSdlcLocalCycle["runnerModel"];
  readonly costControls?: PromptSdlcCostControls;
}): PromptSdlcLocalCycle => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    goal: input.goal.trim(),
    judgeModel: input.judgeModel,
    improverModel: input.improverModel,
    workingDirectory: input.workingDirectory ?? os.homedir(),
    status: "judging",
    currentRound: 0,
    passScore:
      input.passScore ??
      (input.wizard !== undefined
        ? PROMPT_SDLC_WIZARD_PASS_SCORE
        : PROMPT_SDLC_PASS_SCORE),
    maxRounds: input.maxRounds ?? PROMPT_SDLC_MAX_ROUNDS,
    errorMessage: null,
    createdAt: now,
    updatedAt: now,
    revisions: [
      {
        roundNumber: 0,
        promptText: input.sourcePrompt.trim(),
        judgement: null,
      },
    ],
    ...(input.sourceSkill === undefined
      ? {}
      : { sourceSkill: input.sourceSkill }),
    ...(input.judgeInstructions === undefined
      ? {}
      : { judgeInstructions: input.judgeInstructions }),
    ...(input.improverInstructions === undefined
      ? {}
      : { improverInstructions: input.improverInstructions }),
    ...(input.wizard === undefined ? {} : { wizard: input.wizard }),
    ...(input.runnerModel === undefined
      ? {}
      : { runnerModel: input.runnerModel }),
    costControls: input.costControls ?? defaultPromptSdlcCostControls(),
  };
};
