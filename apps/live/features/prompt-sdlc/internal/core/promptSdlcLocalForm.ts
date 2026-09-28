import {
  PROMPT_SDLC_GOAL_MAX_LENGTH,
  PROMPT_SDLC_PROMPT_MAX_LENGTH,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  choosePromptSdlcLocalModels,
  listPromptSdlcLocalWriters,
  PROMPT_SDLC_LOCAL_MODEL_LABELS,
} from "./choosePromptSdlcLocalModels";
import {
  PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE,
  PROMPT_SDLC_LOCAL_GUIDE_GOAL,
  PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT,
} from "./promptSdlcLocalGuide.constant";

export const readPromptSdlcLocalStartError = (
  goal: string,
  prompt: string,
): string | null => {
  if (goal.trim().length === 0 || prompt.trim().length === 0) {
    return "Add a goal and a prompt.";
  }
  if (
    goal.trim().length > PROMPT_SDLC_GOAL_MAX_LENGTH ||
    prompt.trim().length > PROMPT_SDLC_PROMPT_MAX_LENGTH
  ) {
    return "The goal or prompt is too long.";
  }
  return null;
};

export type PromptSdlcLocalWriterChoice = {
  readonly id: keyof typeof PROMPT_SDLC_LOCAL_MODEL_LABELS;
  readonly label: string;
};

export type PromptSdlcLocalModelSelection = {
  readonly note: string;
  readonly canRun: boolean;
  readonly models: ReturnType<typeof choosePromptSdlcLocalModels>;
  readonly writers: readonly PromptSdlcLocalWriterChoice[];
  readonly judge: string;
  readonly improver: string;
};

export const describePromptSdlcLocalModels = (
  installedWriterIds: readonly string[],
): PromptSdlcLocalModelSelection => {
  const models = choosePromptSdlcLocalModels(installedWriterIds);
  const writers = listPromptSdlcLocalWriters(installedWriterIds).map((id) => ({
    id,
    label: PROMPT_SDLC_LOCAL_MODEL_LABELS[id],
  }));
  if (models === null) {
    return {
      note: "No reasoning model is installed on this Mac.",
      canRun: false,
      models,
      writers,
      judge: "",
      improver: "",
    };
  }

  const choosing = writers.length > 1;
  return {
    note: choosing
      ? `Installed: ${writers.map((writer) => writer.label).join(", ")}.`
      : `Judge: ${PROMPT_SDLC_LOCAL_MODEL_LABELS[models.judge]}. Improver: ${PROMPT_SDLC_LOCAL_MODEL_LABELS[models.improver]}.`,
    canRun: true,
    models,
    writers,
    judge: choosing ? "" : models.judge,
    improver: choosing ? "" : models.improver,
  };
};

export const shownPromptSdlcLocalWriters = (
  selection: PromptSdlcLocalModelSelection,
  postedJudge: string | null,
  postedImprover: string | null,
): { readonly judge: string; readonly improver: string } => {
  const judge = selection.writers.find((writer) => writer.id === postedJudge);
  const improver = selection.writers.find(
    (writer) => writer.id === postedImprover,
  );
  return {
    judge: judge?.id ?? selection.judge,
    improver: improver?.id ?? selection.improver,
  };
};

export const readPromptSdlcLocalExampleFields = (
  example: string | null,
): { readonly goal: string; readonly prompt: string } =>
  example === PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE
    ? {
        goal: PROMPT_SDLC_LOCAL_GUIDE_GOAL,
        prompt: PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT,
      }
    : { goal: "", prompt: "" };
