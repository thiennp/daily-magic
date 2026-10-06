import {
  describeRuleUsageFlags,
  formatRuleUsageFlagLabel,
} from "./describeRuleUsageFlags";
import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";
import type {
  RuleCompareOverlap,
  RuleCompareUsageRow,
} from "./ruleCompare.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const usedLabel = (hitCount: number): string =>
  hitCount === 1
    ? RULE_COMPARE_COPY.usedOnce
    : RULE_COMPARE_COPY.usedN(hitCount);

/** Rule use rows with Drop / Restore. No confirm — Undo covers Drop. */
export const renderRuleUsageList = (input: {
  readonly projectId: string;
  readonly rules: readonly RuleCompareUsageRow[];
  readonly overlaps: readonly RuleCompareOverlap[];
  readonly nowMs?: number;
  readonly flashHtml?: string;
  /** Kept across Drop/Undo so Compare results stay on redirect. */
  readonly prompt?: string;
}): string => {
  const flash = input.flashHtml ?? "";
  if (input.rules.length === 0) {
    return `${flash}<p class="empty">${escapeHtml(RULE_COMPARE_COPY.emptyRules)}</p>`;
  }
  const byId = new Map(input.rules.map((rule) => [rule.ruleId, rule]));
  const rows = input.rules
    .map((rule) => {
      const flags = describeRuleUsageFlags({
        rule,
        rulesById: byId,
        overlaps: input.overlaps,
        nowMs: input.nowMs,
      });
      const flagHtml = flags
        .map(
          (flag) =>
            `<span class="muted">${escapeHtml(formatRuleUsageFlagLabel(flag))}</span>`,
        )
        .join(" · ");
      const action = rule.active
        ? `<form method="POST" action="/project/rules/drop" class="inline-form">
            <input type="hidden" name="projectId" value="${escapeHtml(input.projectId)}" />
            <input type="hidden" name="ruleId" value="${escapeHtml(rule.ruleId)}" />
            ${input.prompt !== undefined && input.prompt.length > 0 ? `<input type="hidden" name="rulePrompt" value="${escapeHtml(input.prompt)}" />` : ""}
            <button class="btn btn-secondary btn-compact" type="submit">${escapeHtml(RULE_COMPARE_COPY.drop)}</button>
          </form>`
        : `<form method="POST" action="/project/rules/restore" class="inline-form">
            <input type="hidden" name="projectId" value="${escapeHtml(input.projectId)}" />
            <input type="hidden" name="ruleId" value="${escapeHtml(rule.ruleId)}" />
            ${input.prompt !== undefined && input.prompt.length > 0 ? `<input type="hidden" name="rulePrompt" value="${escapeHtml(input.prompt)}" />` : ""}
            <button class="btn btn-secondary btn-compact" type="submit">${escapeHtml(RULE_COMPARE_COPY.restore)}</button>
          </form>`;
      // TODO(rule-compare): Drop used to need a confirm dialog here; Undo covers it.
      return `<li class="stack">
          <p><strong>${escapeHtml(rule.title)}</strong> <span class="muted">${escapeHtml(usedLabel(rule.hitCount))}</span></p>
          ${flagHtml ? `<p>${flagHtml}</p>` : ""}
          ${action}
        </li>`;
    })
    .join("");
  return `${flash}<ul class="stack">${rows}</ul>`;
};
