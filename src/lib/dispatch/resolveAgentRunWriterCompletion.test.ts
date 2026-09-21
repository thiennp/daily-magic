import { describe, expect, it } from "vitest";

import { AgentRunOutcomeCode } from "@agent-witch/shared/dispatch";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { resolveAgentRunWriterCompletion } from "@/lib/dispatch/resolveAgentRunWriterCompletion";

describe("resolveAgentRunWriterCompletion", () => {
  it("maps session limit output to a typed failed outcome", () => {
    const completion = resolveAgentRunWriterCompletion({
      exitCode: 0,
      output: "You've hit your session limit · resets 1:30am (Europe/Berlin)",
    });

    expect(completion.status).toBe(AgentRunStatus.FAILED);
    expect(completion.resultOutcomeCode).toBe(
      AgentRunOutcomeCode.SESSION_LIMIT,
    );
    expect(completion.denialReason).toBe(
      "This run stopped at the session limit. That is a hard stop — not a missed estimate.",
    );
  });

  it("keeps ordinary success", () => {
    const completion = resolveAgentRunWriterCompletion({
      exitCode: 0,
      output: "Done.",
    });

    expect(completion).toEqual({
      status: AgentRunStatus.COMPLETED,
      resultExitCode: 0,
      resultOutcomeCode: null,
      denialReason: null,
    });
  });
});
