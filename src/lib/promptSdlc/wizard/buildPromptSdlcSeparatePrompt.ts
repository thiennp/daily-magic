import { PROMPT_SDLC_WIZARD_MAX_SPLIT_OPTIONS } from "./promptSdlcWizardLimits.constant";
import { formatPromptSdlcWizardAvoidBlock } from "./formatPromptSdlcWizardAvoidBlock";
import type PromptSdlcWizardVariable from "./types/PromptSdlcWizardVariable.type";

const formatPromptSdlcWizardVariablesBlock = (
  variables: readonly PromptSdlcWizardVariable[],
): string => {
  if (variables.length === 0) {
    return "";
  }
  const lines = variables.map(
    (item) =>
      `- {{${item.name}}}: ${item.description.trim()} (sample: ${item.sampleValue.trim()})`,
  );
  return [
    "Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",
    ...lines,
    "",
  ].join("\n");
};

export const buildPromptSdlcSeparatePrompt = (input: {
  readonly goal: string;
  readonly templatedPrompt: string;
  readonly variables: readonly PromptSdlcWizardVariable[];
  readonly evaluatedPromptReference: string;
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

  const evaluated =
    input.evaluatedPromptReference.trim().length === 0
      ? ""
      : `Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):\n${input.evaluatedPromptReference.trim()}\n`;
  const variables = formatPromptSdlcWizardVariablesBlock(input.variables);

  return [
    "Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.",
    "Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.",
    "Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",
    `Return at most ${PROMPT_SDLC_WIZARD_MAX_SPLIT_OPTIONS} options.`,
    "Mark exactly one option recommended:true (best accuracy per token).",
    "topology is chain or parallel.",
    "Each module needs id, title, prompt, order (0-based).",
    "",
    `Goal:\n${input.goal.trim()}`,
    "",
    variables,
    `Templated prompt:\n${input.templatedPrompt.trim()}`,
    "",
    evaluated,
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
