import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { MARKETPLACE_CLI_FALLBACK_LOCKED_REASON } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

describe("resolveAgentRunHonestyTerminalOutcome", () => {
  it("uses locked cli-fallback copy for degraded completion", () => {
    const output = [
      "[[MARKETPLACE_PLAN_ESTIMATE]]",
      "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
      `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("degraded");
    expect(outcome?.chipLabel).toBe("Completed with fallback");
    expect(outcome?.summaryLines[0]).toContain(
      MARKETPLACE_CLI_FALLBACK_LOCKED_REASON,
    );
  });

  it("maps cli-fallback before generic failed when run status is failed", () => {
    const output = [
      "[[MARKETPLACE_PLAN_ESTIMATE]]",
      "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
      `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.FAILED,
    });

    expect(outcome?.kind).toBe("degraded");
    expect(outcome?.chipLabel).toBe("Completed with fallback");
  });

  it("does not map empty completed output to Success", () => {
    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output: "",
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
  });
});
