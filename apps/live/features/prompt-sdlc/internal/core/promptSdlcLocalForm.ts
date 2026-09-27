import {
  PROMPT_SDLC_GOAL_MAX_LENGTH,
  PROMPT_SDLC_PROMPT_MAX_LENGTH,
} from "@/lib/promptSdlc/promptSdlcLimits.constant";
import {
  choosePromptSdlcLocalModels,
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

export const describePromptSdlcLocalModels = (
  installedWriterIds: readonly string[],
): {
  readonly note: string;
  readonly canRun: boolean;
  readonly models: ReturnType<typeof choosePromptSdlcLocalModels>;
} => {
  const models = choosePromptSdlcLocalModels(installedWriterIds);
  if (models === null) {
    return {
      note: "No reasoning model is installed on this Mac.",
      canRun: false,
      models,
    };
  }

  return {
    note: `Judge: ${PROMPT_SDLC_LOCAL_MODEL_LABELS[models.judge]}. Improver: ${PROMPT_SDLC_LOCAL_MODEL_LABELS[models.improver]}.`,
    canRun: true,
    models,
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
