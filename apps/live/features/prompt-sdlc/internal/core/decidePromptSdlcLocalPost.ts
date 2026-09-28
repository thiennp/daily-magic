import { PROMPT_SDLC_PASS_SCORE } from "../../../../adapters/promptSdlcAwcCore";
import { readPromptSdlcLocalRunModels } from "./choosePromptSdlcLocalModels";
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

export type PromptSdlcLocalPostDecision =
  | {
      readonly kind: "start";
      readonly goal: string;
      readonly prompt: string;
      readonly judge: PromptSdlcLocalRunModels["judge"];
      readonly improver: PromptSdlcLocalRunModels["improver"];
      readonly workingDirectory: string;
      readonly passScore: number;
    }
  | {
      readonly kind: "form";
      readonly goal: string;
      readonly prompt: string;
      readonly folder: string;
      readonly passScore: string;
      readonly errorMessage: string | null;
      readonly judge: string;
      readonly improver: string;
    };

export const decidePromptSdlcLocalPost = (input: {
  readonly posted: URLSearchParams | null;
  readonly installedIds: readonly string[];
  readonly selection: PromptSdlcLocalModelSelection;
  readonly goal: string;
  readonly prompt: string;
  readonly pickFolder: () => string | null;
}): PromptSdlcLocalPostDecision => {
  const shown = shownPromptSdlcLocalWriters(
    input.selection,
    input.posted?.get("judge") ?? null,
    input.posted?.get("improver") ?? null,
  );
  const typedPassScore =
    input.posted?.get("passScore") ?? String(PROMPT_SDLC_PASS_SCORE);
  const form = (
    folder: string,
    errorMessage: string | null,
  ): PromptSdlcLocalPostDecision => ({
    kind: "form",
    goal: input.goal,
    prompt: input.prompt,
    folder,
    passScore: typedPassScore,
    errorMessage,
    judge: shown.judge,
    improver: shown.improver,
  });
  if (input.posted === null) {
    return form(PROMPT_SDLC_LOCAL_DEFAULT_FOLDER, null);
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

  const passScore = readPromptSdlcLocalPassScore(typedPassScore);
  if (!passScore.ok) {
    return form(typedFolder, passScore.errorMessage);
  }

  return {
    kind: "start",
    goal: input.goal,
    prompt: input.prompt,
    judge: chosen.judge,
    improver: chosen.improver,
    workingDirectory: folder.path,
    passScore: passScore.passScore,
  };
};
