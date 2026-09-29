import type PromptSdlcWizardVariable from "./types/PromptSdlcWizardVariable.type";

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const PLACEHOLDER_SEGMENT = /^\{\{[a-zA-Z0-9_-]+\}\}$/;

const restorePlainSegment = (
  plain: string,
  variables: readonly PromptSdlcWizardVariable[],
): string => {
  const { masked, tokens } = variables.reduce<{
    readonly masked: string;
    readonly tokens: readonly string[];
  }>(
    (state, variable) => {
      const sample = variable.sampleValue.trim();
      if (sample.length === 0) {
        return state;
      }
      const pattern = new RegExp(escapeRegExp(sample), "g");
      const nextTokens = [...state.tokens];
      const maskedSegment = state.masked.replace(pattern, () => {
        const token = `\x00PO${nextTokens.length}\x00`;
        nextTokens.push(`{{${variable.name}}}`);
        return token;
      });
      return { masked: maskedSegment, tokens: nextTokens };
    },
    { masked: plain, tokens: [] },
  );
  return tokens.reduce(
    (result, placeholder, index) =>
      result.replace(`\x00PO${index}\x00`, placeholder),
    masked,
  );
};

/**
 * Replaces literal sample values with `{{name}}` so split modules stay generalized.
 * Skips existing placeholders and masks new ones so shorter samples cannot corrupt names.
 */
export const restorePromptSdlcWizardPlaceholdersInText = (
  text: string,
  variables: readonly PromptSdlcWizardVariable[],
): string => {
  const sorted = [...variables].sort(
    (left, right) => right.sampleValue.length - left.sampleValue.length,
  );
  const segments = text.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g);
  return segments
    .map((segment) =>
      PLACEHOLDER_SEGMENT.test(segment)
        ? segment
        : restorePlainSegment(segment, sorted),
    )
    .join("");
};
