import { describe, expect, it } from "vitest";

import {
  ANTIGRAVITY_CLI_CANT_RUN_LOCKED_REASON,
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
      writerAgent: "antigravity",
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
    expect(outcome?.summaryLines[0]).not.toContain(
      WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
    );
  });

  it("maps agy ENOENT to Antigravity install Failed copy from writerAgent, not Claude", () => {
    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output: "spawn /home/box/.local/bin/agy ENOENT",
      runStatus: AgentRunStatus.COMPLETED,
      writerAgent: "antigravity",
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.summaryLines[0]).toContain(
      ANTIGRAVITY_CLI_CANT_RUN_LOCKED_REASON,
    );
    expect(outcome?.summaryLines[0]).not.toContain(
      WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
    );
  });

  it("maps jetski permission auto-deny to Failed even when run status is completed", () => {
    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output:
        'jetski: no output produced — a tool required the "command" permission that headless mode cannot prompt for, so it was auto-denied.',
      runStatus: AgentRunStatus.COMPLETED,
      resultExitCode: 0,
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
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
