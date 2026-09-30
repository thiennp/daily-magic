import type { PromptSdlcWizardSplitOption } from "./types/PromptSdlcWizardSplitOption.type";

/**
 * Step 3 gate can auto-continue when the writer returned a single module (no split choice).
 */
export const shouldSkipPromptSdlcWizardSeparateReview = (
  options: readonly PromptSdlcWizardSplitOption[],
): boolean => options.length === 1 && options[0].modules.length === 1;
