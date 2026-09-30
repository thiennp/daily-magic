import {
  isPromptSdlcTerminalStatus,
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  readPromptSdlcWizardModulePassScore,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { displayPromptSdlcLocalFolder } from "./promptSdlcLocalFolder";

export const readPromptSdlcLocalShownForm = (input: {
  readonly goal: string;
  readonly prompt: string;
  readonly folder: string;
  readonly passScore: string;
  readonly modulePassScore?: string;
  readonly maxRounds?: string;
  readonly judge: string;
  readonly improver: string;
  readonly judgeInstructions?: string;
  readonly improverInstructions?: string;
  readonly runner?: string;
  readonly runnerInstructions?: string;
  readonly cycle: PromptSdlcLocalCycle | null;
}): {
  readonly goal: string;
  readonly prompt: string;
  readonly folder: string;
  readonly passScore: string;
  readonly modulePassScore: string;
  readonly maxRounds: string;
  readonly judge: string;
  readonly improver: string;
  readonly judgeInstructions: string;
  readonly improverInstructions: string;
  readonly runner: string;
  readonly runnerInstructions: string;
  readonly running: boolean;
} => {
  const cycle = input.cycle;
  if (cycle === null) {
    return {
      goal: input.goal,
      prompt: input.prompt,
      folder: input.folder,
      passScore: input.passScore,
      modulePassScore:
        input.modulePassScore ?? String(PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE),
      maxRounds: input.maxRounds ?? String(PROMPT_SDLC_MAX_ROUNDS),
      judge: input.judge,
      improver: input.improver,
      judgeInstructions: input.judgeInstructions ?? "",
      improverInstructions: input.improverInstructions ?? "",
      runner: input.runner ?? "",
      runnerInstructions: input.runnerInstructions ?? "",
      running: false,
    };
  }

  const source = cycle.revisions.find((revision) => revision.roundNumber === 0);
  const wizardTemplate = cycle.wizard?.templatedPrompt.trim() ?? "";
  const prompt =
    wizardTemplate.length > 0
      ? wizardTemplate
      : (source?.promptText ?? input.prompt);
  return {
    goal: cycle.goal,
    prompt,
    folder:
      cycle.workingDirectory === undefined
        ? input.folder
        : displayPromptSdlcLocalFolder(cycle.workingDirectory),
    passScore: String(cycle.passScore),
    modulePassScore: String(readPromptSdlcWizardModulePassScore(cycle.wizard)),
    maxRounds: String(cycle.maxRounds),
    judge: cycle.judgeModel,
    improver: cycle.improverModel,
    judgeInstructions: cycle.judgeInstructions ?? "",
    improverInstructions: cycle.improverInstructions ?? "",
    runner:
      cycle.runnerModel === undefined || cycle.runnerModel === "manual"
        ? ""
        : cycle.runnerModel,
    runnerInstructions: cycle.wizard?.runnerInstructions ?? "",
    running: !isPromptSdlcTerminalStatus(cycle.status),
  };
};
