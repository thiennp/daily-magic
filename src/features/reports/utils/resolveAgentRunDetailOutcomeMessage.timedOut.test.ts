import { describe, expect, it } from "vitest";

import { resolveAgentRunDetailOutcomeMessage } from "@/features/reports/utils/resolveAgentRunDetailOutcomeMessage";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

describe("resolveAgentRunDetailOutcomeMessage Timed out (S0)", () => {
  it("shows the Timed out line over the stored expiry reason", () => {
    expect(
      resolveAgentRunDetailOutcomeMessage({
        status: AgentRunStatus.EXPIRED,
        resultOutput: null,
        denialReason: "Dispatch approval expired.",
        reportSummary: null,
      }),
    ).toBe("No one approved this run in 15 minutes.");
  });
});
