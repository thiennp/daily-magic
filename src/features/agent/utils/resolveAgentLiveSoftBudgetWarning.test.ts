import { describe, expect, it } from "vitest";

import { resolveAgentLiveSoftBudgetWarning } from "@/features/agent/utils/resolveAgentLiveSoftBudgetWarning";
import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

describe("resolveAgentLiveSoftBudgetWarning", () => {
  it("warns when approaching the soft estimate", () => {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 110_000,
    });

    expect(
      resolveAgentLiveSoftBudgetWarning({
        isWorking: true,
        estimateProgress,
      }),
    ).toContain("Approaching");
  });

  it("warns when past the soft estimate but still running", () => {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 150_000,
    });

    expect(
      resolveAgentLiveSoftBudgetWarning({
        isWorking: true,
        estimateProgress,
      }),
    ).toContain("session limits");
  });
});
