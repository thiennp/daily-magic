import {
  isPromptSdlcTerminalStatus,
  PROMPT_SDLC_MAX_ROUNDS,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { displayPromptSdlcLocalFolder } from "./promptSdlcLocalFolder";

export const readPromptSdlcLocalShownForm = (input: {
  readonly goal: string;
  readonly prompt: string;
  readonly folder: string;
  readonly passScore: string;
  readonly maxRounds?: string;
  readonly judge: string;
  readonly improver: string;
  readonly judgeInstructions?: string;
  readonly improverInstructions?: string;
  readonly cycle: PromptSdlcLocalCycle | null;
}): {
  readonly goal: string;
  readonly prompt: string;
  readonly folder: string;
  readonly passScore: string;
  readonly maxRounds: string;
  readonly judge: string;
  readonly improver: string;
  readonly judgeInstructions: string;
  readonly improverInstructions: string;
  readonly running: boolean;
} => {
  const cycle = input.cycle;
  if (cycle === null) {
    return {
      goal: input.goal,
      prompt: input.prompt,
      folder: input.folder,
      passScore: input.passScore,
      maxRounds: input.maxRounds ?? String(PROMPT_SDLC_MAX_ROUNDS),
      judge: input.judge,
      improver: input.improver,
      judgeInstructions: input.judgeInstructions ?? "",
      improverInstructions: input.improverInstructions ?? "",
      running: false,
    };
  }

  const source = cycle.revisions.find((revision) => revision.roundNumber === 0);
  return {
    goal: cycle.goal,
    prompt: source?.promptText ?? input.prompt,
    folder:
      cycle.workingDirectory === undefined
        ? input.folder
        : displayPromptSdlcLocalFolder(cycle.workingDirectory),
    passScore: String(cycle.passScore),
    maxRounds: String(cycle.maxRounds),
    judge: cycle.judgeModel,
    improver: cycle.improverModel,
    judgeInstructions: cycle.judgeInstructions ?? "",
    improverInstructions: cycle.improverInstructions ?? "",
    running: !isPromptSdlcTerminalStatus(cycle.status),
  };
};
