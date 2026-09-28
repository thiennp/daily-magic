import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { displayPromptSdlcLocalFolder } from "./promptSdlcLocalFolder";

export const readPromptSdlcLocalShownForm = (input: {
  readonly goal: string;
  readonly prompt: string;
  readonly folder: string;
  readonly passScore: string;
  readonly judge: string;
  readonly improver: string;
  readonly cycle: PromptSdlcLocalCycle | null;
}): {
  readonly goal: string;
  readonly prompt: string;
  readonly folder: string;
  readonly passScore: string;
  readonly judge: string;
  readonly improver: string;
  readonly running: boolean;
} => {
  const cycle = input.cycle;
  if (cycle === null) {
    return {
      goal: input.goal,
      prompt: input.prompt,
      folder: input.folder,
      passScore: input.passScore,
      judge: input.judge,
      improver: input.improver,
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
    judge: cycle.judgeModel,
    improver: cycle.improverModel,
    running: !isPromptSdlcTerminalStatus(cycle.status),
  };
};
