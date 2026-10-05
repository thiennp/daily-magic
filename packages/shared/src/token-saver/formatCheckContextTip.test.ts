import { describe, expect, it } from "vitest";

import { estimateTokenCount } from "@agent-witch/shared/pitfalls";
import { CHECK_CONTEXT_TIP_MAX_TOKENS } from "./checkContextStatus.constant";
import { formatCheckContextTip } from "./formatCheckContextTip";

describe("formatCheckContextTip", () => {
  it("formats a hit tip under the token cap with shared bot lines", () => {
    const tip = formatCheckContextTip([
      { id: "arch-max-lines", avoidance: "Run the architecture check first." },
      { id: "main-moved-rebase", avoidance: "Fetch and rebase onto a new tip." },
    ]);
    expect(tip).toContain("check_context");
    expect(tip).toContain("arch-max-lines|");
    expect(estimateTokenCount(tip)).toBeLessThanOrEqual(
      CHECK_CONTEXT_TIP_MAX_TOKENS,
    );
  });

  it("caps long lists so the tip stays within budget", () => {
    const many = Array.from({ length: 20 }, (_, index) => ({
      id: `pitfall-${index}`,
      avoidance: "Do the safe step before you continue with this long task.",
    }));
    const tip = formatCheckContextTip(many);
    expect(tip.split("\n").length).toBeLessThanOrEqual(5);
    expect(estimateTokenCount(tip)).toBeLessThanOrEqual(
      CHECK_CONTEXT_TIP_MAX_TOKENS,
    );
  });

  it("truncates the first pitfall line to remaining budget instead of dropping it", () => {
    const huge = "y".repeat(CHECK_CONTEXT_TIP_MAX_TOKENS * 4 + 80);
    const tip = formatCheckContextTip([{ id: "huge", avoidance: huge }]);
    const tipLines = tip.split("\n");
    expect(tipLines[0]).toContain("check_context");
    expect(tipLines.length).toBeGreaterThanOrEqual(2);
    expect(tipLines[1]).toMatch(/^huge\|/);
    expect(tipLines[1]!.length).toBeLessThan(`huge|${huge}`.length);
    expect(tip).toContain("huge|");
    expect(estimateTokenCount(tip)).toBeLessThanOrEqual(
      CHECK_CONTEXT_TIP_MAX_TOKENS,
    );
  });

  it("skips an over-budget later line so a shorter following line can still fit", () => {
    const overBudgetAvoidance = "z".repeat(CHECK_CONTEXT_TIP_MAX_TOKENS * 4);
    const tip = formatCheckContextTip([
      { id: "short-a", avoidance: "Keep this small." },
      { id: "too-big", avoidance: overBudgetAvoidance },
      { id: "short-b", avoidance: "Fits after skip." },
    ]);
    expect(tip).toContain("short-a|");
    expect(tip).not.toContain("too-big|");
    expect(tip).toContain("short-b|");
    expect(estimateTokenCount(tip)).toBeLessThanOrEqual(
      CHECK_CONTEXT_TIP_MAX_TOKENS,
    );
  });
});
