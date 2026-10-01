import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_MAX_TRIALS_LIMIT,
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  proposePromptSdlcRunCostBudget,
  resolvePromptSdlcWriterRateUsdPer1k,
} from "../../../../adapters/promptSdlcAwcCore";
import { PROMPT_SDLC_COST_COPY } from "./promptSdlcCostControl.constant";
import { isPromptSdlcEstimateOverMaxSpend } from "./autoConfirmPromptSdlcCostFromMaxSpend";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcCostControlFields = (input: {
  readonly maxTrials: string;
  readonly maxSpendUsd: string;
  readonly earlyStop: boolean;
  /** Judge writer id for rate chip + run-cost PREDICTION (codex/claude/cursor…). */
  readonly writerId?: string | null;
  readonly maxRounds?: number;
}): string => {
  const trialsRaw = Number(input.maxTrials);
  const trials =
    Number.isInteger(trialsRaw) &&
    trialsRaw >= 1 &&
    trialsRaw <= PROMPT_SDLC_MAX_TRIALS_LIMIT
      ? trialsRaw
      : PROMPT_SDLC_DEFAULT_MAX_TRIALS;
  const spendValue = escapeHtml(input.maxSpendUsd);
  const earlyChecked = input.earlyStop ? " checked" : "";
  const writerId = input.writerId?.trim() || null;
  const maxRounds = input.maxRounds ?? PROMPT_SDLC_WIZARD_MAX_ROUNDS;
  const proposal = proposePromptSdlcRunCostBudget({
    maxRounds,
    maxTrials: trials,
    writerId,
  });
  const rate =
    proposal.rateUsdPer1kTokens ??
    resolvePromptSdlcWriterRateUsdPer1k(writerId);
  const spendNum =
    input.maxSpendUsd.trim().length === 0
      ? null
      : Number(input.maxSpendUsd);
  const overCeiling = isPromptSdlcEstimateOverMaxSpend({
    estimatedSpendUsd: proposal.estimatedSpendUsd,
    maxSpendUsd:
      spendNum !== null && Number.isFinite(spendNum) ? spendNum : null,
  });
  const overWarnHidden = overCeiling ? "" : " hidden";
  const writerLabel = writerId === null || writerId.length === 0 ? "default" : writerId;

  return `<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${escapeHtml(PROMPT_SDLC_COST_COPY.knobsSectionTitle)}</p>
  <p class="muted">${escapeHtml(PROMPT_SDLC_COST_COPY.knobsSectionLede)}</p>
  <div class="field">
    ${renderPromptSdlcFieldHeading(PROMPT_SDLC_COST_COPY.maxTrialsLabel, "maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${PROMPT_SDLC_MAX_TRIALS_LIMIT}" step="1" value="${trials}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${renderPromptSdlcFieldHeading(PROMPT_SDLC_COST_COPY.maxSpendUsdLabel, "maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${spendValue}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${escapeHtml(PROMPT_SDLC_COST_COPY.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${earlyChecked}>
      <span>${escapeHtml(PROMPT_SDLC_COST_COPY.earlyStopLabel)}</span>
    </label>
    <p class="muted">${escapeHtml(PROMPT_SDLC_COST_COPY.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${escapeHtml(PROMPT_SDLC_COST_COPY.estimateSectionTitle)}</p>
    <p class="muted">${escapeHtml(PROMPT_SDLC_COST_COPY.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${escapeHtml(PROMPT_SDLC_COST_COPY.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${proposal.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${escapeHtml(PROMPT_SDLC_COST_COPY.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${proposal.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${escapeHtml(PROMPT_SDLC_COST_COPY.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${escapeHtml(writerLabel)}">$${rate.toFixed(4)} / 1k · ${escapeHtml(writerLabel)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${proposal.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${proposal.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${rate}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${overWarnHidden}>${escapeHtml(PROMPT_SDLC_COST_COPY.estimateOverCeilingWarn)}</p>
  </div>
</div>`;
};
