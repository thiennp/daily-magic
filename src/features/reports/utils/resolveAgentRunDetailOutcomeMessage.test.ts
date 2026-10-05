import { describe, expect, it } from "vitest";

import { resolveAgentRunDetailOutcomeMessage } from "@/features/reports/utils/resolveAgentRunDetailOutcomeMessage";
import { CLAUDE_LOGIN_EXPIRED_LOCKED_REASON } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

describe("resolveAgentRunDetailOutcomeMessage (REPORTS-008)", () => {
  it("prefers denial reason over generic failed copy", () => {
    expect(
      resolveAgentRunDetailOutcomeMessage({
        status: AgentRunStatus.DENIED,
        resultOutput: null,
        denialReason: "Executor declined.",
        reportSummary: null,
      }),
    ).toBe("Executor declined.");
  });

  it("shows friendly failed message when there is no result output", () => {
    expect(
      resolveAgentRunDetailOutcomeMessage({
        status: AgentRunStatus.FAILED,
        resultOutput: null,
        denialReason: null,
        reportSummary: null,
      }),
    ).toContain("failed on your Mac");
  });

  it("shows locked honesty summary when result output exists (ensure-writer timeout)", () => {
    const output =
      "Failed to prepare claude-cli: ensure-writer.sh timed out after 120s";

    expect(
      resolveAgentRunDetailOutcomeMessage({
        status: AgentRunStatus.FAILED,
        resultOutput: output,
        denialReason: null,
        reportSummary: null,
      }),
    ).toContain(CLAUDE_LOGIN_EXPIRED_LOCKED_REASON);
  });

  it("uses report summary for failed runs when present", () => {
    expect(
      resolveAgentRunDetailOutcomeMessage({
        status: AgentRunStatus.FAILED,
        resultOutput: null,
        denialReason: null,
        reportSummary: "Writer exited before finishing.",
      }),
    ).toBe("Writer exited before finishing.");
  });
});
