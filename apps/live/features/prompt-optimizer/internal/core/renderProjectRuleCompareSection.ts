import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";
import { RULE_COMPARE_SAMPLE_PRESETS } from "./ruleCompareSamplePresets.constant";
import { renderPromptSdlcLocalGoalPresets } from "./renderPromptSdlcLocalGoalPresets";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export type RuleCompareSectionInput = {
  readonly projectId: string;
  readonly promptValue?: string;
  readonly resultHtml?: string;
  readonly usageHtml?: string;
  readonly promptError?: string | null;
};

/** Compare rules form + optional result / Rule use blocks for Playbooks. */
export const renderProjectRuleCompareSection = (
  input: RuleCompareSectionInput,
): string => {
  const promptValue = input.promptValue ?? "";
  const chips = renderPromptSdlcLocalGoalPresets({
    presets: RULE_COMPARE_SAMPLE_PRESETS,
    groupLabel: RULE_COMPARE_COPY.groupLabel,
    leadLabel: RULE_COMPARE_COPY.lead,
    submitName: "rulePrompt",
  });
  const promptError =
    input.promptError !== undefined && input.promptError !== null
      ? `<p class="alert-error">${escapeHtml(input.promptError)}</p>`
      : "";
  const result =
    input.resultHtml !== undefined && input.resultHtml.length > 0
      ? `<div class="stack">${input.resultHtml}</div>`
      : "";
  const usage =
    input.usageHtml !== undefined && input.usageHtml.length > 0
      ? `<section class="stack">
          <h3>${escapeHtml(RULE_COMPARE_COPY.ruleUseHeading)}</h3>
          <p class="lede">${escapeHtml(RULE_COMPARE_COPY.ruleUseIntro)}</p>
          ${input.usageHtml}
        </section>`
      : "";
  return `<section class="stack" aria-label="${escapeHtml(RULE_COMPARE_COPY.heading)}">
      <h2>${escapeHtml(RULE_COMPARE_COPY.heading)}</h2>
      <p class="lede">${escapeHtml(RULE_COMPARE_COPY.intro)}</p>
      <form method="GET" action="/project" class="stack">
        <input type="hidden" name="id" value="${escapeHtml(input.projectId)}" />
        <input type="hidden" name="tab" value="harness" />
        ${chips}
        <label class="field-label" for="rule-compare-prompt">${escapeHtml(RULE_COMPARE_COPY.customLabel)}</label>
        <p class="muted">${escapeHtml(RULE_COMPARE_COPY.customHint)}</p>
        <textarea class="input" id="rule-compare-prompt" name="rulePrompt" rows="3">${escapeHtml(promptValue)}</textarea>
        ${promptError}
        <div class="actions">
          <button class="btn btn-primary" type="submit">${escapeHtml(RULE_COMPARE_COPY.button)}</button>
        </div>
      </form>
      ${result}
      ${usage}
    </section>`;
};
