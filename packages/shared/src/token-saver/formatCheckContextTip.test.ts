import { describe, expect, it } from "vitest";

import {
  estimateTokenCount,
  truncateTextToTokenBudget,
} from "@agent-witch/shared/pitfalls";
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

  it("truncates an over-budget first line instead of dropping it", () => {
    const huge = "y".repeat(CHECK_CONTEXT_TIP_MAX_TOKENS * 4 + 80);
    const truncated = truncateTextToTokenBudget(huge, CHECK_CONTEXT_TIP_MAX_TOKENS);
    expect(truncated.length).toBeGreaterThan(0);
    expect(truncated.length).toBeLessThan(huge.length);
    expect(estimateTokenCount(truncated)).toBeLessThanOrEqual(
      CHECK_CONTEXT_TIP_MAX_TOKENS,
    );
    // Tip path: oversized pitfall line is skipped; header kept under budget.
    const tip = formatCheckContextTip([{ id: "huge", avoidance: huge }]);
    expect(tip.startsWith("Agent Witch tip")).toBe(true);
    expect(estimateTokenCount(tip)).toBeLessThanOrEqual(
      CHECK_CONTEXT_TIP_MAX_TOKENS,
    );
  });
});
