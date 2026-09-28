import os from "node:os";

import {
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_PASS_SCORE,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const createPromptSdlcLocalCycle = (input: {
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly judgeModel: PromptSdlcLocalCycle["judgeModel"];
  readonly improverModel: PromptSdlcLocalCycle["improverModel"];
  readonly workingDirectory?: string;
  readonly passScore?: number;
  readonly maxRounds?: number;
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
    passScore: input.passScore ?? PROMPT_SDLC_PASS_SCORE,
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
  };
};
