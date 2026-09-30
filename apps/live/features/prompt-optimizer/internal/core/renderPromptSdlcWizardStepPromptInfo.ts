import { PROMPT_SDLC_INFO_ICON_HTML } from "./promptSdlcInfoIconHtml.constant";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  isPromptSdlcWizardStepReached,
  readPromptSdlcWizardStepDispatchedPrompt,
} from "./readPromptSdlcWizardStepDispatchedPrompt";
import { resolvePromptSdlcWizardOutcomeStepState } from "./resolvePromptSdlcWizardOutcomeStepState";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardStepPromptInfo = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
  input?: { readonly forOutcomeSummary?: boolean },
): string => {
  if (input?.forOutcomeSummary === true) {
    const state = resolvePromptSdlcWizardOutcomeStepState(cycle, stepId);
    if (state === "pending") {
      return "";
    }
  } else if (!isPromptSdlcWizardStepReached(cycle, stepId)) {
    return "";
  }

  const prompt = readPromptSdlcWizardStepDispatchedPrompt(cycle, stepId);
  if (prompt === null || prompt.trim().length === 0) {
    return "";
  }

  return `<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${PROMPT_SDLC_INFO_ICON_HTML}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${escapeHtml(prompt)}</pre></template>`;
};
