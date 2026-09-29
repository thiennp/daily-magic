import {
  PROMPT_SDLC_GOAL_MAX_LENGTH,
  PROMPT_SDLC_PROMPT_MAX_LENGTH,
} from "@/lib/promptOptimizer/promptSdlcLimits.constant";
import { promptSdlcChoiceNeedsMac } from "@/lib/promptOptimizer/promptSdlcModelChoice";
import type { PromptSdlcModelChoice } from "@/lib/promptOptimizer/types/PromptSdlcModelChoice.type";

export interface PromptSdlcStartInput {
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly deviceId: string | null;
  readonly judge: PromptSdlcModelChoice;
  readonly improver: PromptSdlcModelChoice;
}

export const validatePromptSdlcStart = (
  input: PromptSdlcStartInput,
): string | null => {
  if (
    input.goal.trim().length === 0 ||
    input.sourcePrompt.trim().length === 0
  ) {
    return "Add a goal and a prompt.";
  }

  if (
    input.goal.trim().length > PROMPT_SDLC_GOAL_MAX_LENGTH ||
    input.sourcePrompt.trim().length > PROMPT_SDLC_PROMPT_MAX_LENGTH
  ) {
    return "The goal or prompt is too long.";
  }

  if (input.judge.kind === "ollama" || input.improver.kind === "ollama") {
    return "The prompt optimizer uses reasoning models only: Claude, Codex, Cursor, Antigravity, or Cursor Cloud.";
  }

  if (
    (promptSdlcChoiceNeedsMac(input.judge) ||
      promptSdlcChoiceNeedsMac(input.improver)) &&
    (input.deviceId === null || input.deviceId.trim().length === 0)
  ) {
    return "Choose a Mac for the writer.";
  }

  return null;
};
