import type PromptSdlcWizardVariable from "./types/PromptSdlcWizardVariable.type";

const PLACEHOLDER = /\{\{([a-zA-Z0-9_-]+)\}\}/g;

export const substitutePromptSdlcTemplate = (
  templatedPrompt: string,
  variables: readonly PromptSdlcWizardVariable[],
): string => {
  const byName = new Map(
    variables.map((item) => [item.name, item.sampleValue]),
  );
  return templatedPrompt.replace(PLACEHOLDER, (match, name: string) => {
    const value = byName.get(name);
    return value === undefined ? match : value;
  });
};
