import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  canRetryPromptSdlcWizardAccordionStep,
  PROMPT_SDLC_WIZARD_RETRY_STEP_CONFIRM,
} from "./retryPromptSdlcWizardAccordionStep";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardAccordionStepRetry = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): string => {
  if (!canRetryPromptSdlcWizardAccordionStep(cycle, stepId)) {
    return "";
  }
  return `<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${escapeHtml(PROMPT_SDLC_WIZARD_RETRY_STEP_CONFIRM)}"><input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}"><input type="hidden" name="wizardStepId" value="${escapeHtml(stepId)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`;
};
