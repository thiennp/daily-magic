import { substitutePromptSdlcTemplate } from "../../../../adapters/promptSdlcAwcCore";

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
              wizard.selectedSplitOptionId === item.id ? " checked" : "";
            return `<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${escapeHtml(item.id)}" required${checked}> <strong>${escapeHtml(item.title)}</strong>${badge}<br><span class="muted">${escapeHtml(item.summary)} (${escapeHtml(item.topology)})</span></label>${renderPromptSdlcWizardSplitOptionChunks(item)}</li>`;
          })
          .join("")}</ul>`
      : "";

  const moduleTitle =
    wizard.modules[wizard.currentModuleIndex]?.title ?? "Module";
  const moduleNote =
    gate === "optimize_modules"
      ? `<p>Module ${wizard.currentModuleIndex + 1} of ${wizard.modules.length}: ${escapeHtml(moduleTitle)}</p><p class="muted">Sample run uses: ${escapeHtml(substitutePromptSdlcTemplate(wizard.templatedPrompt, wizard.variables))}</p>${renderPromptSdlcWizardRevisionRoundList(
          {
            cycle,
            interactive: false,
            caption: `Scored rounds for “${moduleTitle}” (runner + judge).`,
          },
        )}`
      : "";

  const gateLede =
    gate === "generalize"
      ? "Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback."
      : gate === "evaluate"
        ? "Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again."
        : gate === "separate"
          ? "Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options."
          : "Review progress on this module. Continue when ready, or rerun with feedback.";

  return `<section class="card sdlc-wizard-gate">
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${stepTitle}</h2>
    <p class="sdlc-wizard-gate-lede">${gateLede}</p>
    ${variables}
    ${revisions}
    ${splits}
    ${moduleNote}
    <form method="POST" action="/prompt-sdlc" class="sdlc-wizard-feedback">
      <input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">
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
