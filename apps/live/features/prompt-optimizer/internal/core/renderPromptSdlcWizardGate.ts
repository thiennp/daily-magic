import {
  buildPromptSdlcWizardSubstitutionMap,
  collectPromptSdlcWizardCumulativeTokens,
  readPromptSdlcWizardModulePassScore,
  substitutePromptSdlcTemplateValues,
} from "../../../../adapters/promptSdlcAwcCore";

import { renderPromptSdlcWizardGeneralizeGateFields } from "./renderPromptSdlcWizardGeneralizeReview";
import { renderPromptSdlcWizardModuleParameters } from "./renderPromptSdlcWizardModuleParameters";
import { renderPromptSdlcWizardRevisionRoundList } from "./renderPromptSdlcWizardRevisionRoundList";
import { renderPromptSdlcWizardGateEndForm } from "./renderPromptSdlcLocalStopForm";
import { renderPromptSdlcWizardSkillSuggestions } from "./renderPromptSdlcWizardSkillSuggestions";
import { renderPromptSdlcWizardSplitOptionDetail } from "./renderPromptSdlcWizardSplitOptionDetail";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  renderPromptSdlcCostConfirmPanel,
  shouldShowPromptSdlcCostConfirm,
} from "./renderPromptSdlcCostConfirmPanel";

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
  if (shouldShowPromptSdlcCostConfirm(cycle)) {
    return renderPromptSdlcCostConfirmPanel(cycle);
  }
  const modulePassScore = readPromptSdlcWizardModulePassScore(wizard);
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
      ? renderPromptSdlcWizardGeneralizeGateFields(wizard)
      : "";

  const skillSuggestions =
    gate === "evaluate" ? renderPromptSdlcWizardSkillSuggestions(cycle) : "";
  const revisions =
    gate === "evaluate"
      ? renderPromptSdlcWizardRevisionRoundList({
          cycle,
          interactive: true,
          selectedRound: wizard.evaluateSelectedRound,
        })
      : "";

  const topologyExplainer =
    gate === "separate"
      ? `<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module’s runner can see the previous module’s output. <strong>Parallel</strong> modules are independent.</p>`
      : "";
  const splits =
    gate === "separate"
      ? `${topologyExplainer}<ul class="sdlc-wizard-splits">${wizard.splitOptions
          .map((item) => {
            const topologyBadge =
              item.topology === "chain"
                ? ' <span class="sdlc-badge sdlc-badge-chain">Chain</span>'
                : ' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>';
            const badge = item.recommended
              ? ' <span class="sdlc-badge">Recommended</span>'
              : "";
            const checked =
              wizard.selectedSplitOptionId === item.id ||
              (wizard.selectedSplitOptionId === null && item.recommended)
                ? " checked"
                : "";
            return `<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${escapeHtml(item.id)}" required${checked}> <strong>${escapeHtml(item.title)}</strong>${topologyBadge}${badge}</label>${renderPromptSdlcWizardSplitOptionDetail(cycle, item)}</li>`;
          })
          .join("")}</ul>`
      : "";

  const moduleRun = wizard.modules[wizard.currentModuleIndex];
  const moduleBusyAtGate =
    gate === "optimize_modules" &&
    moduleRun?.status === "running" &&
    (cycle.status === "judging" || cycle.status === "improving");
  const continueDisabled = moduleBusyAtGate ? " disabled" : "";
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
        )}</p>${
          moduleRun?.statistics === null || moduleRun?.statistics === undefined
            ? ""
            : `<p class="muted">Module stats: best ${moduleRun.statistics.bestScore ?? "—"} / ≥${modulePassScore} (round ${moduleRun.statistics.bestRound ?? "—"}).</p>`
        }${renderPromptSdlcWizardRevisionRoundList({
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

  const cumulativeTokens = collectPromptSdlcWizardCumulativeTokens(wizard);
  const tokenLine =
    cumulativeTokens === null
      ? ""
      : `<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${cumulativeTokens}</p>`;

  const gateStepId =
    gate === "generalize"
      ? "wizard-1"
      : gate === "evaluate"
        ? "wizard-2"
        : gate === "separate"
          ? "wizard-3"
          : "wizard-4";
  const activeClass =
    options?.active === true ? " sdlc-wizard-gate-active" : "";
  const activeAttrs =
    options?.active === true
      ? ` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${gateStepId}"`
      : "";
  return `<section class="card sdlc-wizard-gate${activeClass}"${activeAttrs}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${stepTitle}</h2>
    <p class="sdlc-wizard-gate-lede">${gateLede}</p>
    ${tokenLine}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">
    ${variables}
    ${skillSuggestions}
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${continueDisabled}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${renderPromptSdlcWizardGateEndForm(cycle)}
  </section>`;
};
