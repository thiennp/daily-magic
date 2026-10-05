import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  MARKETPLACE_CLI_FALLBACK_LOCKED_REASON,
  WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

describe("resolveAgentRunHonestyTerminalOutcome", () => {
  it("uses locked cli-fallback copy for degraded completion", () => {
    const output = [
      "[[MARKETPLACE_PLAN_ESTIMATE]]",
      "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
      `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      "estimate complete",
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
      "partial agent output",
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.FAILED,
    });

    expect(outcome?.kind).toBe("degraded");
    expect(outcome?.chipLabel).toBe("Completed with fallback");
  });

  it("maps writer execution honesty marker to degraded with exact reason", () => {
    const output = [
      "[[AGENT_RUN_WRITER_EXECUTION]]",
      "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
      `agentRunWriterExecutionReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      "claude -p summarize",
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("degraded");
    expect(outcome?.summaryLines[0]).toContain(
      MARKETPLACE_CLI_FALLBACK_LOCKED_REASON,
    );
  });

  it("maps a missing CLI binary to Failed with the locked can’t-run sentence (AGENT-129)", () => {
    const output = [
      "[[AGENT_RUN_WRITER_EXECUTION]]",
      "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
      `agentRunWriterExecutionReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      "execvp(3) failed.: No such file or directory",
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.FAILED,
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
    expect(outcome?.summaryLines[0]).toContain(
      WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
    );
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
