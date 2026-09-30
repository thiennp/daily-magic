import {
  PROMPT_SDLC_GOAL_MAX_LENGTH,
  PROMPT_SDLC_PROMPT_MAX_LENGTH,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  choosePromptSdlcLocalModels,
  listPromptSdlcLocalWriters,
  PROMPT_SDLC_LOCAL_MODEL_LABELS,
  PROMPT_SDLC_MANUAL_ACTOR,
} from "./choosePromptSdlcLocalModels";
import {
  PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE,
  PROMPT_SDLC_LOCAL_GUIDE_GOAL,
  PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT,
} from "./promptSdlcLocalGuide.constant";
import {
  PROMPT_SDLC_WIZARD_VERIFICATION_EXAMPLE,
  PROMPT_SDLC_WIZARD_VERIFICATION_GOAL,
  PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT,
} from "./promptSdlcWizardVerificationScenario";

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
  readonly runner: string;
};

export const describePromptSdlcLocalModels = (
  installedWriterIds: readonly string[],
): PromptSdlcLocalModelSelection => {
  const models = choosePromptSdlcLocalModels(installedWriterIds);
  const writers = listPromptSdlcLocalWriters(installedWriterIds).map((id) => ({
    id,
    label: PROMPT_SDLC_LOCAL_MODEL_LABELS[id],
  }));
  const note =
    writers.length === 0
      ? "No reasoning model is installed. You can score and rewrite the prompt yourself."
      : `Installed: ${writers.map((writer) => writer.label).join(", ")}.`;
  return {
    note,
    canRun: true,
    models,
    writers,
    judge: "",
    improver: "",
    runner: "",
  };
};

const shownActor = (
  selection: PromptSdlcLocalModelSelection,
  posted: string | null,
  fallback: string,
): string => {
  if (
    posted === PROMPT_SDLC_MANUAL_ACTOR ||
    (posted !== null &&
      selection.writers.some((writer) => writer.id === posted))
  ) {
    return posted;
  }
  return fallback;
};

export const shownPromptSdlcLocalWriters = (
  selection: PromptSdlcLocalModelSelection,
  postedJudge: string | null,
  postedImprover: string | null,
  postedRunner: string | null = null,
): {
  readonly judge: string;
  readonly improver: string;
  readonly runner: string;
} => ({
  judge: shownActor(selection, postedJudge, selection.judge),
  improver: shownActor(selection, postedImprover, selection.improver),
  runner: shownActor(selection, postedRunner, selection.runner),
});

export const readPromptSdlcLocalExampleFields = (
  example: string | null,
): { readonly goal: string; readonly prompt: string } => {
  if (example === PROMPT_SDLC_WIZARD_VERIFICATION_EXAMPLE) {
    return {
      goal: PROMPT_SDLC_WIZARD_VERIFICATION_GOAL,
      prompt: PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT,
    };
  }
  if (example === PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE) {
    return {
      goal: PROMPT_SDLC_LOCAL_GUIDE_GOAL,
      prompt: PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT,
    };
  }
  return { goal: "", prompt: "" };
};
