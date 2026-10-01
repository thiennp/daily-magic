import {
  PROMPT_SDLC_BUDGET_CONFIRM_REQUIRED,
  PROMPT_SDLC_SOFT_WARN_BUDGET,
} from "../../../../adapters/promptSdlcAwcCore";
import { estimatePromptSdlcSpendUsd } from "../../../../adapters/promptSdlcAwcCore";
import { isPromptSdlcCostBudgetConfirmed } from "../../../../adapters/promptSdlcAwcCore";
import { PROMPT_SDLC_COST_COPY } from "./promptSdlcCostControl.constant";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * Pre-Step4 confirm panel.
 * Shows judge proposal targetTokenBudget + estimatedSpendUsd (proposedTokenBudget alias).
 * Posts wizard-continue with confirmedTokenBudget / confirmedMaxSpendUsd → hard ceiling.
 */
export const renderPromptSdlcCostConfirmPanel = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const controls = cycle.costControls;
  if (controls === undefined || isPromptSdlcCostBudgetConfirmed(controls)) {
    return "";
  }
  const targetTokens = controls.targetTokenBudget ?? 0;
  const rate =
    controls.rateUsdPer1kTokens ??
    (targetTokens > 0 && controls.estimatedSpendUsd !== null
      ? (controls.estimatedSpendUsd * 1000) / targetTokens
      : 0.01);
  const estimated =
    controls.estimatedSpendUsd ??
    estimatePromptSdlcSpendUsd({
      tokens: targetTokens,
      rateUsdPer1kTokens: rate,
    });
  const confirmedTokens = controls.confirmedTokenBudget ?? targetTokens;
  const confirmedSpend =
    controls.confirmedMaxSpendUsd ?? controls.maxSpendUsd ?? estimated;
  const stubNote =
    controls.proposalStub === true
      ? `<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${escapeHtml(PROMPT_SDLC_COST_COPY.stubProposalNote)}</p>`
      : "";
  const softWarn =
    controls.softWarnFired === true
      ? `<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${escapeHtml(controls.softWarnMessage ?? PROMPT_SDLC_SOFT_WARN_BUDGET)}</p>`
      : "";
  const moduleCount = cycle.wizard?.modules.length ?? 0;
  const moduleLine =
    moduleCount > 0
      ? `<p class="muted">Step 4 will optimize ${moduleCount} module${moduleCount === 1 ? "" : "s"} (maxTrials ${controls.maxTrials}).</p>`
      : "";

  return `<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${escapeHtml(PROMPT_SDLC_COST_COPY.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${escapeHtml(PROMPT_SDLC_COST_COPY.confirmLede)}</p>
  ${moduleLine}
  ${stubNote}
  ${softWarn}
  <p class="muted sdlc-cost-confirm-required" hidden>${escapeHtml(PROMPT_SDLC_BUDGET_CONFIRM_REQUIRED)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">
    <input type="hidden" name="targetTokenBudget" value="${targetTokens}">
    <input type="hidden" name="proposedTokenBudget" value="${targetTokens}">
    <input type="hidden" name="estimatedSpendUsd" value="${estimated}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${rate}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${escapeHtml(PROMPT_SDLC_COST_COPY.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${targetTokens.toLocaleString("en-US")}</dd></div>
      <div><dt>${escapeHtml(PROMPT_SDLC_COST_COPY.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${estimated.toFixed(4)}</dd></div>
      <div><dt>${escapeHtml(PROMPT_SDLC_COST_COPY.rateLabel)}</dt><dd>$${rate.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${renderPromptSdlcFieldHeading(PROMPT_SDLC_COST_COPY.confirmedTokenLabel, "confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${confirmedTokens}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${renderPromptSdlcFieldHeading(PROMPT_SDLC_COST_COPY.confirmedSpendLabel, "confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${confirmedSpend}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${escapeHtml(PROMPT_SDLC_COST_COPY.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${escapeHtml(PROMPT_SDLC_COST_COPY.confirmEditLabel)}</button>
    </div>
  </form>
</section>`;
};

export const shouldShowPromptSdlcCostConfirm = (
  cycle: PromptSdlcLocalCycle,
): boolean => {
  const wizard = cycle.wizard;
  const controls = cycle.costControls;
  return (
    wizard !== undefined &&
    wizard.gate === "optimize_modules" &&
    controls !== undefined &&
    !isPromptSdlcCostBudgetConfirmed(controls)
  );
};
