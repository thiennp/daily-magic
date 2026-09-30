import {
  buildPromptSdlcWizardSubstitutionMap,
  substitutePromptSdlcTemplateValues,
} from "../../../../adapters/promptSdlcAwcCore";

import { renderPromptSdlcWizardModuleParameters } from "./renderPromptSdlcWizardModuleParameters";
import { renderPromptSdlcWizardRevisionRoundList } from "./renderPromptSdlcWizardRevisionRoundList";
import { renderPromptSdlcWizardSplitOptionChunks } from "./renderPromptSdlcWizardSplitChunks";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardGate = (
  cycle: PromptSdlcLocalCycle,
  options?: { readonly active?: boolean },
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.gate === null) {
    return "";
  }

  const gate = wizard.gate;
  const stepTitle =
    gate === "generalize"
      ? "Step 1 — Generalize"
      : gate === "evaluate"
        ? "Step 2 — Evaluate"
        : gate === "separate"
          ? "Step 3 — Separate"
          : "Step 4 — Optimize modules";

  const variables =
    gate === "generalize"
      ? `<ul class="sdlc-wizard-vars">${wizard.variables
          .map(
            (item) =>
              `<li><strong>{{${escapeHtml(item.name)}}}</strong> — ${escapeHtml(item.description)} (sample: ${escapeHtml(item.sampleValue)})</li>`,
          )
          .join(
            "",
          )}</ul><pre class="sdlc-pre">${escapeHtml(wizard.templatedPrompt)}</pre>`
      : "";

  const revisions =
    gate === "evaluate"
      ? renderPromptSdlcWizardRevisionRoundList({
          cycle,
          interactive: true,
          selectedRound: wizard.evaluateSelectedRound,
        })
      : "";

  const splits =
    gate === "separate"
      ? `<ul class="sdlc-wizard-splits">${wizard.splitOptions
          .map((item) => {
            const badge = item.recommended
              ? ' <span class="sdlc-badge">Recommended</span>'
              : "";
            const checked =
              wizard.selectedSplitOptionId === item.id ||
              (wizard.selectedSplitOptionId === null && item.recommended)
                ? " checked"
                : "";
            return `<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${escapeHtml(item.id)}" required${checked}> <strong>${escapeHtml(item.title)}</strong>${badge}<br><span class="muted">${escapeHtml(item.summary)} (${escapeHtml(item.topology)})</span></label>${renderPromptSdlcWizardSplitOptionChunks(item)}</li>`;
          })
          .join("")}</ul>`
      : "";

  const moduleRun = wizard.modules[wizard.currentModuleIndex];
  const moduleTitle = moduleRun?.title ?? "Module";
  const modulePrompt = moduleRun?.prompt ?? "";
  const moduleNeedsRun = moduleRun?.status === "pending";
  const moduleNote =
    gate === "optimize_modules"
      ? `<p>Module ${wizard.currentModuleIndex + 1} of ${wizard.modules.length}: ${escapeHtml(moduleTitle)}</p>${
          moduleNeedsRun
            ? renderPromptSdlcWizardModuleParameters({
                cycle,
                modulePrompt,
              })
            : ""
        }<p class="muted">Test run prompt preview: ${escapeHtml(
          substitutePromptSdlcTemplateValues(
            modulePrompt,
            buildPromptSdlcWizardSubstitutionMap(wizard),
          ),
        )}</p>${renderPromptSdlcWizardRevisionRoundList({
          cycle,
          interactive: false,
          caption: moduleNeedsRun
            ? "After you continue, the runner and judge score this module."
            : `Scored rounds for “${moduleTitle}” (runner + judge).`,
        })}`
      : "";

  const gateLede =
    gate === "generalize"
      ? "Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback."
      : gate === "evaluate"
        ? "Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again."
        : gate === "separate"
          ? "Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options."
          : moduleNeedsRun
            ? "Set parameters for this module’s test run, then continue. Rerun with feedback to adjust the module prompt."
            : "Review progress on this module. Continue when ready, or rerun with feedback.";

  const activeClass =
    options?.active === true ? " sdlc-wizard-gate-active" : "";
  const activeId =
    options?.active === true ? ' id="prompt-optimizer-wizard-active-step"' : "";
  return `<section class="card sdlc-wizard-gate${activeClass}"${activeId}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${stepTitle}</h2>
    <p class="sdlc-wizard-gate-lede">${gateLede}</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">
    ${variables}
    ${revisions}
    ${splits}
    ${moduleNote}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue">Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
  </section>`;
};
