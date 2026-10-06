import { describe, expect, it } from "vitest";

import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";
import { renderProjectRuleCompareSection } from "./renderProjectRuleCompareSection";
import { renderRuleCompareResult } from "./renderRuleCompareResult";
import { renderRuleUsageList } from "./renderRuleUsageList";

describe("renderProjectRuleCompareSection", () => {
  it("renders heading, samples, and Drop on active rules", () => {
    const html = renderProjectRuleCompareSection({
      projectId: "p1",
      resultHtml: renderRuleCompareResult({
        matched: [],
        tokens: { promptTokens: 1, rulesTokens: 0, addedCostUsd: 0 },
      }),
      usageHtml: renderRuleUsageList({
        projectId: "p1",
        rules: [
          {
            ruleId: "r1",
            title: "Alpha",
            source: "seed",
            active: true,
            hitCount: 0,
            lastHitAt: null,
          },
        ],
        overlaps: [],
      }),
    });
    expect(html).toContain(RULE_COMPARE_COPY.heading);
    expect(html).toContain(">Haiku</button>");
    expect(html).toContain(RULE_COMPARE_COPY.noRules);
    expect(html).toContain(RULE_COMPARE_COPY.drop);
    expect(html).toContain('action="/project/rules/drop"');
    expect(html).toContain(RULE_COMPARE_COPY.ruleUseHeading);
  });
});
