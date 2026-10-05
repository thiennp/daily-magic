import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
  WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { resolveAgentRunHonestyOutcomeFromRecord } from "@/lib/dispatch/resolveAgentRunHonestyOutcomeFromRecord";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";
import { buildWriterMissingCliFallbackFixtureOutput } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome.test.fixture";

describe("resolveAgentRunHonestyTerminalOutcome auth addendum", () => {
  it("maps OAuth 401 with writer-missing markers to Waiting on you", () => {
    const output = buildWriterMissingCliFallbackFixtureOutput([
      "Failed to authenticate. API Error: 401 OAuth access token has expired. Re-authenticate to continue.",
    ]);

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("waiting_you");
    expect(outcome?.chipLabel).toBe("Waiting on you");
    expect(outcome?.summaryLines[0]).toContain(
      CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
    );
  });

  it("maps spawn ENOENT without writer honesty marker to Failed with locked can’t-run", () => {
    const output = "spawn /home/box/.local/bin/claude-qa-missing ENOENT";

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
    expect(outcome?.summaryLines[0]).toContain(
      WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
    );
  });

  it("maps writer missing without CLI work to Failed with locked reason", () => {
    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output: buildWriterMissingCliFallbackFixtureOutput([]),
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
    expect(outcome?.summaryLines[0]).toContain(
      WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
    );
  });

  it("maps Not logged in /login prompt to Waiting on you (Testi 2f12ab78)", () => {
    const output = [
      "[[AGENT_RUN_WRITER_EXECUTION]]",
      "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
      `agentRunWriterExecutionReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      "Not logged in · Please run /login",
      '{"is_error":true,"terminal_reason":"api_error","usage":{"output_tokens":0}}',
    ].join("\n");

    const outcome = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.COMPLETED,
    });

    expect(outcome?.kind).toBe("waiting_you");
    expect(outcome?.chipLabel).toBe("Waiting on you");
    expect(outcome?.summaryLines[0]).toContain(
      CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
    );
  });

  it("matches Reports badge resolver path for OAuth blocker output", () => {
    const output = buildWriterMissingCliFallbackFixtureOutput([
      "Failed to authenticate. API Error: 401 OAuth access token has expired. Re-authenticate to continue.",
    ]);

    const outcome = resolveAgentRunHonestyOutcomeFromRecord({
      status: AgentRunStatus.COMPLETED,
      resultOutput: output,
    });

    expect(outcome.chipLabel).toBe("Waiting on you");
    expect(outcome.summaryLines[0]).toContain(
      CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
    );
  });
});
