import { describe, expect, it } from "vitest";

import {
  CHECK_CONTEXT_TIP_MAX_TOKENS,
  estimateTipTokenCount,
} from "./checkContextStatus.constant";
import { formatCheckContextTip } from "./formatCheckContextTip";

describe("formatCheckContextTip", () => {
  it("formats a hit tip under the token cap", () => {
    const tip = formatCheckContextTip([
      { id: "arch-max-lines", avoidance: "Run the architecture check first." },
      { id: "main-moved-rebase", avoidance: "Fetch and rebase onto a new tip." },
    ]);
    expect(tip).toContain("check_context");
    expect(tip).toContain("arch-max-lines |");
    expect(estimateTipTokenCount(tip)).toBeLessThanOrEqual(
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
    expect(estimateTipTokenCount(tip)).toBeLessThanOrEqual(
      CHECK_CONTEXT_TIP_MAX_TOKENS,
    );
  });
});
