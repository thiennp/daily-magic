import { describe, expect, it } from "vitest";

import { computeRuleCompareTokens } from "./computeRuleCompareTokens";

describe("computeRuleCompareTokens", () => {
  it("counts prompt tokens and zero rule tokens when nothing matches", () => {
    const stats = computeRuleCompareTokens({
      prompt: "hello world",
      matched: [],
    });
    expect(stats.promptTokens).toBeGreaterThan(0);
    expect(stats.rulesTokens).toBe(0);
    expect(stats.addedCostUsd).toBe(0);
  });

  it("adds tip tokens and a small USD estimate for matches", () => {
    const stats = computeRuleCompareTokens({
      prompt: "ship ff push",
      matched: [
        { id: "main-moved", title: "Main moved", avoidance: "rebase onto tip" },
      ],
    });
    expect(stats.rulesTokens).toBeGreaterThan(0);
    expect(stats.addedCostUsd).toBeGreaterThan(0);
  });
});
