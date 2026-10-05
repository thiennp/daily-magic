import { describe, expect, it } from "vitest";

import { CLAUDE_LOGIN_EXPIRED_LOCKED_REASON } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { AGENT_RUN_USER_STOPPED_EXIT_CODE } from "@/lib/dispatch/agentRunUserStoppedExitCode.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

describe("resolveAgentRunHonestyTerminalOutcome — user stop precedence", () => {
  it("maps stop-after-cli-work with writer honesty marker to Stopped (not Success or fallback)", () => {
    const output = [
      "[[AGENT_RUN_WRITER_EXECUTION]]",
      "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
      `agentRunWriterExecutionReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      "partial output",
      "Stopped by user.",
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("stopped");
    expect(outcome?.chipLabel).toBe("Stopped");
  });

  it("maps user stop exit code ahead of Claude OAuth noise in output", () => {
    const output = [
      "Failed to authenticate. API Error: 401 OAuth access token has expired.",
      "Stopped by user.",
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.FAILED,
      resultExitCode: AGENT_RUN_USER_STOPPED_EXIT_CODE,
    });

    expect(outcome?.kind).toBe("stopped");
    expect(outcome?.chipLabel).toBe("Stopped");
    expect(outcome?.summaryLines[0]).not.toContain(
      CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
    );
  });
});
