import { describe, expect, it } from "vitest";

import { AGENT_RUN_WORKING_ESTIMATE_IS_SOFT_BUDGET } from "@/lib/dispatch/agentRunWorkingEstimateSoftBudget.constant";

describe("agentRunWorkingEstimateSoftBudget", () => {
  it("documents WORKING_ESTIMATE as soft budget not hard kill (P1.3)", () => {
    expect(AGENT_RUN_WORKING_ESTIMATE_IS_SOFT_BUDGET).toBe(true);
  });
});
