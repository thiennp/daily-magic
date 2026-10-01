import { listPromptTemplatePlaceholders } from "./listPromptTemplatePlaceholders";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

/**
 * Step 1 gate can auto-continue when there is nothing for the user to confirm:
 * no variable rows and no `{{placeholders}}` in the templated prompt.
 */
export const shouldSkipPromptSdlcWizardGeneralizeReview = (
  wizard: PromptSdlcWizardState,
): boolean => {
  if (wizard.variables.length > 0) {
    return false;
  }
  if (listPromptTemplatePlaceholders(wizard.templatedPrompt).length > 0) {
    return false;
  }
  return wizard.templatedPrompt.trim().length > 0;
};
