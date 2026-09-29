import {
  type HarnessWriterAgent,
  PROMPT_SDLC_PASS_SCORE,
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  readPromptSdlcLocalRunnerModel,
  readPromptSdlcLocalRunModels,
} from "./choosePromptSdlcLocalModels";
import {
  promptSdlcLocalMaxRoundsText,
  readPromptSdlcLocalMaxRounds,
} from "./readPromptSdlcLocalMaxRounds";
import { readPromptSdlcLocalPassScore } from "./readPromptSdlcLocalPassScore";
import {
  displayPromptSdlcLocalFolder,
  PROMPT_SDLC_LOCAL_DEFAULT_FOLDER,
  resolvePromptSdlcLocalFolder,
} from "./promptSdlcLocalFolder";
import {
  readPromptSdlcLocalStartError,
  shownPromptSdlcLocalWriters,
  type PromptSdlcLocalModelSelection,
} from "./promptSdlcLocalForm";

type PromptSdlcLocalRunModels = NonNullable<
  ReturnType<typeof readPromptSdlcLocalRunModels>
>;

type PromptSdlcLocalStartBase = {
  readonly kind: "start";
  readonly goal: string;
  readonly prompt: string;
  readonly judge: PromptSdlcLocalRunModels["judge"];
  readonly improver: PromptSdlcLocalRunModels["improver"];
  readonly workingDirectory: string;
  readonly passScore: number;
  readonly maxRounds: number;
  readonly sourceSkillFile: string;
  readonly judgeInstructions: string;
  readonly improverInstructions: string;
};

export type PromptSdlcLocalPostDecision =
  | (PromptSdlcLocalStartBase & {
      readonly useWizard: true;
      readonly runner: HarnessWriterAgent;
      readonly runnerInstructions: string;
    })
  | (PromptSdlcLocalStartBase & {
      readonly useWizard: false;
    })
  | {
      readonly kind: "form";
      readonly goal: string;
      readonly prompt: string;
      readonly folder: string;
      readonly passScore: string;
      readonly maxRounds: string;
      readonly errorMessage: string | null;
      readonly judge: string;
      readonly improver: string;
      readonly judgeInstructions: string;
      readonly improverInstructions: string;
      readonly runner: string;
      readonly runnerInstructions: string;
    };

export const decidePromptSdlcLocalPost = (input: {
  readonly posted: URLSearchParams | null;
  readonly installedIds: readonly string[];
  readonly selection: PromptSdlcLocalModelSelection;
  readonly goal: string;
  readonly prompt: string;
  readonly pickFolder: () => string | null;
  readonly defaultFolder?: string;
}): PromptSdlcLocalPostDecision => {
  const shown = shownPromptSdlcLocalWriters(
    input.selection,
    input.posted?.get("judge") ?? null,
    input.posted?.get("improver") ?? null,
  );
  const typedPassScore =
    input.posted?.get("passScore") ?? String(PROMPT_SDLC_PASS_SCORE);
  const typedMaxRounds = promptSdlcLocalMaxRoundsText(
    input.posted?.get("maxRounds") ?? null,
  );
  const judgeInstructions =
    input.posted?.get("judgeInstructions")?.trim() ?? "";
  const improverInstructions =
    input.posted?.get("improverInstructions")?.trim() ?? "";
  const runnerInstructions =
    input.posted?.get("runnerInstructions")?.trim() ?? "";
  const postedRunner = input.posted?.get("runner") ?? null;
  const form = (
    folder: string,
    errorMessage: string | null,
  ): PromptSdlcLocalPostDecision => ({
    kind: "form",
    goal: input.goal,
    prompt: input.prompt,
    folder,
    passScore: typedPassScore,
    maxRounds: typedMaxRounds,
    errorMessage,
    judge: shown.judge,
    improver: shown.improver,
    judgeInstructions,
    improverInstructions,
    runner: postedRunner ?? "",
    runnerInstructions,
  });
  if (input.posted === null) {
    return form(input.defaultFolder ?? PROMPT_SDLC_LOCAL_DEFAULT_FOLDER, null);
  }

  const typedFolder =
    input.posted.get("folder") ?? PROMPT_SDLC_LOCAL_DEFAULT_FOLDER;
  if (input.posted.get("intent") === "choose-folder") {
    const picked = input.pickFolder();
    return form(
      picked === null ? typedFolder : displayPromptSdlcLocalFolder(picked),
      null,
    );
  }

  const intent = input.posted.get("intent") ?? "";
  if (intent !== "run" && intent !== "run-classic") {
    return form(typedFolder, null);
  }

  const startError = readPromptSdlcLocalStartError(input.goal, input.prompt);
  if (startError !== null) {
    return form(typedFolder, startError);
  }

  const chosen = readPromptSdlcLocalRunModels(
    input.installedIds,
    input.posted.get("judge"),
    input.posted.get("improver"),
  );
  if (chosen === null) {
    return form(typedFolder, "Choose a judge and an improver.");
  }

  const folder = resolvePromptSdlcLocalFolder(typedFolder);
  if (!folder.ok) {
    return form(typedFolder, folder.errorMessage);
  }

  const useWizard = intent !== "run-classic";
  const passScore = useWizard
    ? { ok: true as const, passScore: PROMPT_SDLC_WIZARD_PASS_SCORE }
    : readPromptSdlcLocalPassScore(typedPassScore);
  if (!passScore.ok) {
    return form(typedFolder, passScore.errorMessage);
  }
  const maxRounds = useWizard
    ? { ok: true as const, maxRounds: PROMPT_SDLC_WIZARD_MAX_ROUNDS }
    : readPromptSdlcLocalMaxRounds(typedMaxRounds);
  if (!maxRounds.ok) {
    return form(typedFolder, maxRounds.errorMessage);
  }

  if (useWizard) {
    const runner = readPromptSdlcLocalRunnerModel(
      input.installedIds,
      postedRunner,
      chosen.judge,
    );
    if (runner === null) {
      return form(typedFolder, "Choose a runner for wizard step 4.");
    }
    return {
      kind: "start",
      goal: input.goal,
      prompt: input.prompt,
      judge: chosen.judge,
      improver: chosen.improver,
      workingDirectory: folder.path,
      passScore: passScore.passScore,
      maxRounds: maxRounds.maxRounds,
      sourceSkillFile: input.posted.get("skillFile")?.trim() ?? "",
      judgeInstructions,
      improverInstructions,
      useWizard: true,
      runner,
      runnerInstructions,
    };
  }

  return {
    kind: "start",
    goal: input.goal,
    prompt: input.prompt,
    judge: chosen.judge,
    improver: chosen.improver,
    workingDirectory: folder.path,
    passScore: passScore.passScore,
    maxRounds: maxRounds.maxRounds,
    sourceSkillFile: input.posted.get("skillFile")?.trim() ?? "",
    judgeInstructions,
    improverInstructions,
    useWizard: false,
  };
};
