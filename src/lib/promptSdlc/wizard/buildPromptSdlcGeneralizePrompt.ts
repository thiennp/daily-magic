import { formatPromptSdlcWizardAvoidBlock } from "./formatPromptSdlcWizardAvoidBlock";

export const buildPromptSdlcGeneralizePrompt = (input: {
  readonly goal: string;
  readonly sourcePrompt: string;
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
    "Generalize the prompt below for reuse as a skill or template.",
    "Pull concrete values (names, paths, IDs, component names) into variables.",
    "Use placeholders {{variableName}} in the templated prompt (camelCase names).",
    "Keep the same intent as the goal.",
    "",
    `Goal:\n${input.goal.trim()}`,
    "",
    `Source prompt:\n${input.sourcePrompt.trim()}`,
    "",
    extra,
    last,
    avoid,
    "",
    "Reply with JSON only, no markdown fences:",
    '{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}',
  ]
    .filter((line) => line.length > 0)
    .join("\n");
};
