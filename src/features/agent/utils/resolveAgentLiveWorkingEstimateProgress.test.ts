import { describe, expect, it } from "vitest";

import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

describe("resolveAgentLiveWorkingEstimateProgress (AGENT-052)", () => {
  it("computes percent from worked / (estimate + buffer)", () => {
    const progress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 60_000,
    });

    // buffer = max(30s, 20% of 100s) = 30s; budget = 130s
    expect(progress.budgetMs).toBe(130_000);
    expect(progress.percent).toBe(46);
    expect(progress.isExceeded).toBe(false);
  });

  it("marks exceeded when worked time reaches the budget", () => {
    const progress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 130_000,
    });

    expect(progress.percent).toBe(100);
    expect(progress.isExceeded).toBe(true);
  });
});
