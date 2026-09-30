import {
  buildPromptSdlcGoalSuggestionPrompt,
  computePromptSdlcGoalSuggestKey,
  parsePromptSdlcGoalSuggestions,
  preferMeasurablePromptSdlcGoalOptions,
} from "../../../../adapters/promptSdlcAwcCore";

import {
  PROMPT_SDLC_MANUAL_ACTOR,
  readPromptSdlcLocalRunModels,
} from "./choosePromptSdlcLocalModels";
import { resolvePromptSdlcLocalFolder } from "./promptSdlcLocalFolder";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";

export type PromptSdlcGoalSuggestionsUi =
  | {
      readonly kind: "options";
      readonly suggestKey: string;
      readonly options: readonly string[];
      readonly promptFingerprint: string;
      readonly folderFingerprint: string;
      readonly judgeFingerprint: string;
    }
  | { readonly kind: "error"; readonly errorMessage: string };

export const runPromptSdlcGoalSuggestions = async (input: {
  readonly installedIds: readonly string[];
  readonly posted: URLSearchParams;
  readonly prompt: string;
}): Promise<PromptSdlcGoalSuggestionsUi> => {
  const prompt = input.prompt.trim();
  if (prompt.length === 0) {
    return {
      kind: "error",
      errorMessage: "Add a prompt before suggesting goals.",
    };
  }

  const typedFolder = input.posted.get("folder") ?? "";
  const folder = resolvePromptSdlcLocalFolder(typedFolder);
  if (!folder.ok) {
    return { kind: "error", errorMessage: folder.errorMessage };
  }

  const chosen = readPromptSdlcLocalRunModels(
    input.installedIds,
    input.posted.get("judge"),
    input.posted.get("improver"),
  );
  if (chosen === null || chosen.judge === PROMPT_SDLC_MANUAL_ACTOR) {
    return {
      kind: "error",
      errorMessage: "Choose an installed judge writer to suggest goals.",
    };
  }

  const suggestKey = computePromptSdlcGoalSuggestKey({
    promptText: prompt,
    folder: typedFolder,
    judge: chosen.judge,
  });

  const reply = await runPromptSdlcWriterReply({
    writerAgent: chosen.judge,
    prompt: buildPromptSdlcGoalSuggestionPrompt({
      promptText: prompt,
      workingDirectory: folder.path,
    }),
    workingDirectory: folder.path,
  });

  if (!reply.ok) {
    return {
      kind: "error",
      errorMessage: reply.errorMessage ?? "The writer did not reply.",
    };
  }

  const parsed = parsePromptSdlcGoalSuggestions(reply.text, prompt);
  if (!parsed.ok) {
    return { kind: "error", errorMessage: parsed.errorMessage };
  }

  const options = preferMeasurablePromptSdlcGoalOptions(parsed.options);
  if (options.length === 0) {
    return {
      kind: "error",
      errorMessage: "No usable goal suggestions came back. Type your own goal.",
    };
  }

  return {
    kind: "options",
    suggestKey,
    options,
    promptFingerprint: prompt,
    folderFingerprint: typedFolder.trim(),
    judgeFingerprint: chosen.judge,
  };
};
