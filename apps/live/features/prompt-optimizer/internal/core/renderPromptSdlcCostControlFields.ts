import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_MAX_TRIALS_LIMIT,
} from "./promptSdlcCostControl.constant";
import { PROMPT_SDLC_COST_COPY } from "./promptSdlcCostControl.constant";
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
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${earlyChecked}>
      <span>${escapeHtml(PROMPT_SDLC_COST_COPY.earlyStopLabel)}</span>
    </label>
    <p class="muted">${escapeHtml(PROMPT_SDLC_COST_COPY.earlyStopHint)}</p>
  </div>
</div>`;
};
