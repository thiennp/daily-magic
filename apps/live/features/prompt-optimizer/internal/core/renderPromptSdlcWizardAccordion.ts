import { PROMPT_SDLC_WIZARD_GATE_PHASES } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcWizardActiveStepIndex } from "./readPromptSdlcWizardActiveStepIndex";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";
import { renderPromptSdlcWizardStepInProgress } from "./renderPromptSdlcWizardStepInProgress";
import { renderPromptSdlcWizardAccordionStepRetry } from "./renderPromptSdlcWizardAccordionStepRetry";
import { renderPromptSdlcWizardStepModalBody } from "./renderPromptSdlcWizardStepModalBody";

const STEP_TITLES: Record<
  (typeof PROMPT_SDLC_WIZARD_GATE_PHASES)[number],
  string
> = {
  generalize: "Step 1 — Generalize",
  evaluate: "Step 2 — Evaluate",
  separate: "Step 3 — Separate",
  optimize_modules: "Step 4 — Optimize modules",
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderCompletedStep = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
  title: string,
): string => {
  const retry = renderPromptSdlcWizardAccordionStepRetry(cycle, stepId);
  return `<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${escapeHtml(title)}</summary>
  <div class="sdlc-wizard-accordion-body">${retry}${renderPromptSdlcWizardStepModalBody(cycle, stepId)}</div>
</details>`;
};

export const renderPromptSdlcWizardAccordion = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const activeIndex = readPromptSdlcWizardActiveStepIndex(cycle);
  if (activeIndex === null) {
    return "";
  }

  const completed = PROMPT_SDLC_WIZARD_GATE_PHASES.slice(0, activeIndex).map(
    (gate, index) =>
      renderCompletedStep(cycle, `wizard-${index + 1}`, STEP_TITLES[gate]),
  );

  const activeGate =
    wizard.gate !== null
      ? renderPromptSdlcWizardGate(cycle, { active: true })
      : renderPromptSdlcWizardStepInProgress(cycle);

  const allDone =
    activeIndex >= PROMPT_SDLC_WIZARD_GATE_PHASES.length ? "" : activeGate;

  return `<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${completed.join("")}${allDone}</div>`;
};
