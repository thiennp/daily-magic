import { readPromptSdlcLocalRunModels } from "./choosePromptSdlcLocalModels";
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
    }
  | {
      readonly kind: "form";
      readonly goal: string;
      readonly prompt: string;
      readonly folder: string;
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
  const form = (
    folder: string,
    errorMessage: string | null,
  ): PromptSdlcLocalPostDecision => ({
    kind: "form",
    goal: input.goal,
    prompt: input.prompt,
    folder,
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
    return form(
      typedFolder,
      input.selection.models === null
        ? input.selection.note
        : "Choose a writer that is installed on this Mac.",
    );
  }

  const folder = resolvePromptSdlcLocalFolder(typedFolder);
  if (!folder.ok) {
    return form(typedFolder, folder.errorMessage);
  }

  return {
    kind: "start",
    goal: input.goal,
    prompt: input.prompt,
    judge: chosen.judge,
    improver: chosen.improver,
    workingDirectory: folder.path,
  };
};
