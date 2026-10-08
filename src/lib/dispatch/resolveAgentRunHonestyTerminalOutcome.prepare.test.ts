import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { CLAUDE_LOGIN_EXPIRED_LOCKED_REASON } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { resolveAgentRunHonestyOutcomeFromRecord } from "@/lib/dispatch/resolveAgentRunHonestyOutcomeFromRecord";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";

describe("prepare failures name the picked writer (5ca01f06)", () => {
  it("Testi 6f6a236f: a Codex ensure-writer timeout never says Claude", () => {
    const output =
      "Failed to prepare codex: ensure-writer.sh timed out after 120s";

    const floater = resolveAgentRunHonestyTerminalOutcome({
      output,
      runStatus: AgentRunStatus.COMPLETED,
    });
    expect(floater?.kind).toBe("waiting_you");
    expect(floater?.summaryLines[0]).toContain("Codex isn't ready");
    expect(floater?.summaryLines[0]).not.toContain(
      CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
    );

    const report = resolveAgentRunHonestyOutcomeFromRecord({
      status: AgentRunStatus.FAILED,
      resultOutput: output,
    });
    expect(report.summaryLines[0]).toContain("Codex isn't ready");
  });
});
