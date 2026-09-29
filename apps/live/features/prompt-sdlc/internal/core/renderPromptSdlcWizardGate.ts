import { substitutePromptSdlcTemplate } from "../../../../adapters/promptSdlcAwcCore";

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
      ? `<ul class="sdlc-wizard-revisions">${cycle.revisions
          .map((item) => {
            const score = item.judgement?.score;
            const label =
              score === null || score === undefined
                ? `Round ${item.roundNumber}`
                : `Round ${item.roundNumber} — ${score}`;
            return `<li><label><input type="radio" name="wizardRevisionRound" value="${item.roundNumber}"${wizard.evaluateSelectedRound === item.roundNumber ? " checked" : ""}> ${escapeHtml(label)}</label></li>`;
          })
          .join("")}</ul>`
      : "";

  const splits =
    gate === "separate"
      ? `<ul class="sdlc-wizard-splits">${wizard.splitOptions
          .map((item) => {
            const badge = item.recommended
              ? ' <span class="sdlc-badge">Recommended</span>'
              : "";
            return `<li><label><input type="radio" name="wizardSplitOptionId" value="${escapeHtml(item.id)}" required> <strong>${escapeHtml(item.title)}</strong>${badge}<br><span class="muted">${escapeHtml(item.summary)} (${escapeHtml(item.topology)})</span></label></li>`;
          })
          .join("")}</ul>`
      : "";

  const moduleNote =
    gate === "optimize_modules"
      ? `<p>Module ${wizard.currentModuleIndex + 1} of ${wizard.modules.length}: ${escapeHtml(wizard.modules[wizard.currentModuleIndex]?.title ?? "")}</p><p class="muted">Sample run uses: ${escapeHtml(substitutePromptSdlcTemplate(wizard.templatedPrompt, wizard.variables))}</p>`
      : "";

  return `<section class="card sdlc-wizard-gate">
    <p class="eyebrow">Prompt SDLC wizard</p>
    <h2>${stepTitle}</h2>
    ${variables}
    ${revisions}
    ${splits}
    ${moduleNote}
    <form method="POST" action="/prompt-sdlc" class="sdlc-wizard-feedback">
      <input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">
      <div class="field">
        <label for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2"></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue">Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
  </section>`;
};
