import { PROMPT_SDLC_WIZARD_MAX_SPLIT_OPTIONS } from "./promptSdlcWizardLimits.constant";
import { formatPromptSdlcWizardAvoidBlock } from "./formatPromptSdlcWizardAvoidBlock";

export const buildPromptSdlcSeparatePrompt = (input: {
  readonly goal: string;
  readonly templatedPrompt: string;
  readonly avoid: readonly string[];
  readonly stepInstructions: string;
  readonly lastAttemptSummary: string;
}): string => {
  const avoid = formatPromptSdlcWizardAvoidBlock(input.avoid);
  const extra =
    input.stepInstructions.trim().length === 0
      ? ""
      : `Extra instructions:\n${input.stepInstructions.trim()}\n`;
  const last =
    input.lastAttemptSummary.trim().length === 0
      ? ""
      : `Last attempt (fix this):\n${input.lastAttemptSummary.trim()}\n`;

  return [
    "Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.",
    `Return at most ${PROMPT_SDLC_WIZARD_MAX_SPLIT_OPTIONS} options.`,
    "Mark exactly one option recommended:true (best accuracy per token).",
    "topology is chain or parallel.",
    "Each module needs id, title, prompt, order (0-based).",
    "",
    `Goal:\n${input.goal.trim()}`,
    "",
    `Templated prompt:\n${input.templatedPrompt.trim()}`,
    "",
    extra,
    last,
    avoid,
    "",
    "Reply with JSON only:",
    '{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}',
  ]
    .filter((line) => line.length > 0)
    .join("\n");
};
