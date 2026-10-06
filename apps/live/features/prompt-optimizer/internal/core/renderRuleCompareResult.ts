import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";
import type {
  RuleCompareMatchedRule,
  RuleCompareTokenStats,
} from "./ruleCompare.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Matched-rules + token/cost lines after Compare. */
export const renderRuleCompareResult = (input: {
  readonly matched: readonly RuleCompareMatchedRule[];
  readonly tokens: RuleCompareTokenStats;
}): string => {
  if (input.matched.length === 0) {
    return `<p class="empty">${escapeHtml(RULE_COMPARE_COPY.noRules)}</p>`;
  }
  const heading =
    input.matched.length === 1
      ? RULE_COMPARE_COPY.oneRule
      : RULE_COMPARE_COPY.nRules(input.matched.length);
  const list = `<ul class="stack">${input.matched
    .map(
      (rule) =>
        `<li><strong>${escapeHtml(rule.title)}</strong> <span class="muted mono">${escapeHtml(rule.id)}</span></li>`,
    )
    .join("")}</ul>`;
  const usd = `$${input.tokens.addedCostUsd.toFixed(4)}`;
  return `<div class="stack">
      <p>${escapeHtml(heading)}</p>
      ${list}
      <p class="muted">${escapeHtml(RULE_COMPARE_COPY.tokenLine(input.tokens.promptTokens, input.tokens.rulesTokens))}</p>
      <p class="muted">${escapeHtml(RULE_COMPARE_COPY.costLine(usd))}</p>
    </div>`;
};
