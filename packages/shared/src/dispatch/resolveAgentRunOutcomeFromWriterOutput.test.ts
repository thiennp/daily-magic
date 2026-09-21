import { describe, expect, it } from "vitest";

import { AgentRunOutcomeCode } from "./agentRunOutcome.constant";
import { resolveAgentRunOutcomeFromWriterOutput } from "./resolveAgentRunOutcomeFromWriterOutput";

describe("resolveAgentRunOutcomeFromWriterOutput", () => {
  it("detects Claude session limit with reset hint", () => {
    const outcome = resolveAgentRunOutcomeFromWriterOutput(
      "You've hit your session limit · resets 1:30am (Europe/Berlin)",
    );

    expect(outcome).toEqual({
      code: AgentRunOutcomeCode.SESSION_LIMIT,
      resetHint: "1:30am (Europe/Berlin)",
      matchedLine:
        "You've hit your session limit · resets 1:30am (Europe/Berlin)",
    });
  });

  it("detects provider quota messages", () => {
    const outcome = resolveAgentRunOutcomeFromWriterOutput(
      "Error: rate limit exceeded for this API key",
    );

    expect(outcome?.code).toBe(AgentRunOutcomeCode.PROVIDER_QUOTA);
  });

  it("returns null for ordinary failures", () => {
    expect(
      resolveAgentRunOutcomeFromWriterOutput("Build failed with exit code 1"),
    ).toBeNull();
  });
});
