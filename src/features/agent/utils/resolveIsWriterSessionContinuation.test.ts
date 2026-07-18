import { describe, expect, it } from "vitest";

import { resolveIsWriterSessionContinuation } from "@/features/agent/utils/resolveIsWriterSessionContinuation";

describe("resolveIsWriterSessionContinuation", () => {
  it("AGENT-026 continues when continueSession query is set", () => {
    expect(
      resolveIsWriterSessionContinuation({
        continueFromQuery: true,
        sessionWriterAgent: null,
        hasSentUserPrompt: false,
        threadAlreadyStarted: false,
      }),
    ).toBe(true);
  });

  it("AGENT-026 continues a restored finished thread", () => {
    expect(
      resolveIsWriterSessionContinuation({
        continueFromQuery: false,
        sessionWriterAgent: "claude-cli",
        hasSentUserPrompt: false,
        threadAlreadyStarted: true,
      }),
    ).toBe(true);
  });

  it("starts fresh when no session and no continue flag", () => {
    expect(
      resolveIsWriterSessionContinuation({
        continueFromQuery: false,
        sessionWriterAgent: null,
        hasSentUserPrompt: false,
        threadAlreadyStarted: false,
      }),
    ).toBe(false);
  });
});
