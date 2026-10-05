import { describe, expect, it } from "vitest";

import {
  ANTIGRAVITY_LOGIN_REQUIRED_LOCKED_REASON,
  WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";
import { AGENT_RUN_USER_STOPPED_EXIT_CODE } from "@/lib/dispatch/agentRunUserStoppedExitCode.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";

describe("resolveAgentRunHonestyTerminalOutcome — Antigravity shipped path", () => {
  it("maps user-stopped exit code to Stopped without Success", () => {
    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output: "Preparing Antigravity for this session…",
      runStatus: AgentRunStatus.COMPLETED,
      resultExitCode: AGENT_RUN_USER_STOPPED_EXIT_CODE,
    });

    expect(outcome?.kind).toBe("stopped");
    expect(outcome?.chipLabel).toBe("Stopped");
  });

  it("maps user stop exit code ahead of agy argv failure noise", () => {
    const output = [
      'Error: -p took "--dangerously-skip-permissions" as its prompt',
      "Stopped by user.",
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.FAILED,
      resultExitCode: AGENT_RUN_USER_STOPPED_EXIT_CODE,
    });

    expect(outcome?.kind).toBe("stopped");
    expect(outcome?.chipLabel).toBe("Stopped");
  });

  it("maps agy argv parse failure to Failed (not Writer API fallback)", () => {
    const output = [
      "Preparing Antigravity for this session…",
      'Error: -p took "--dangerously-skip-permissions" as its prompt',
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.FAILED,
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
  });

  it("ignores legacy Writer API honesty markers on Antigravity argv failures", () => {
    const output = [
      "[[AGENT_RUN_WRITER_EXECUTION]]",
      "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
      `agentRunWriterExecutionReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      'Error: -p took "--dangerously-skip-permissions" as its prompt',
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.FAILED,
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
    expect(outcome?.summaryLines[0]).not.toContain(
      WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
    );
  });

  it("maps Antigravity auth blocker output to Waiting on you", () => {
    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output: "Authentication required — sign in to continue",
      runStatus: AgentRunStatus.FAILED,
    });

    expect(outcome?.kind).toBe("waiting_you");
    expect(outcome?.summaryLines[0]).toContain(
      ANTIGRAVITY_LOGIN_REQUIRED_LOCKED_REASON,
    );
  });
});
