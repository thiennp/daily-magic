import type PromptSdlcWizardVariable from "./types/PromptSdlcWizardVariable.type";

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Replaces literal sample values with `{{name}}` so split modules stay generalized.
 */
export const restorePromptSdlcWizardPlaceholdersInText = (
  text: string,
  variables: readonly PromptSdlcWizardVariable[],
): string => {
  const sorted = [...variables].sort(
    (left, right) => right.sampleValue.length - left.sampleValue.length,
  );
  return sorted.reduce((result, variable) => {
    const sample = variable.sampleValue.trim();
    if (sample.length === 0) {
      return result;
    }
    const pattern = new RegExp(escapeRegExp(sample), "g");
    return result.replace(pattern, `{{${variable.name}}}`);
  }, text);
};
