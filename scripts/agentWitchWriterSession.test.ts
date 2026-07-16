import { describe, expect, it, beforeEach } from "vitest";

import {
  clearWriterSession,
  isWriterConversationStarted,
  isWriterSessionWarmed,
  markWriterConversationStarted,
  markWriterSessionWarmed,
  resetWriterSessionsForTests,
  supportsWriterSessionContinuation,
  supportsWriterSessionWarmup,
} from "./agentWitchWriterSession";

describe("agentWitchWriterSession", () => {
  beforeEach(() => {
    resetWriterSessionsForTests();
  });

  it("tracks warmup and conversation state for cursor", () => {
    expect(supportsWriterSessionWarmup("cursor")).toBe(true);
    expect(supportsWriterSessionContinuation("cursor")).toBe(true);
    expect(isWriterSessionWarmed("cursor")).toBe(false);

    markWriterSessionWarmed("cursor");
    expect(isWriterSessionWarmed("cursor")).toBe(true);
    expect(isWriterConversationStarted("cursor")).toBe(false);

    markWriterConversationStarted("cursor");
    expect(isWriterConversationStarted("cursor")).toBe(true);

    clearWriterSession("cursor");
    expect(isWriterSessionWarmed("cursor")).toBe(false);
    expect(isWriterConversationStarted("cursor")).toBe(false);
  });

  it("does not treat claude-cli as a warmable session writer", () => {
    expect(supportsWriterSessionWarmup("claude-cli")).toBe(false);
    expect(supportsWriterSessionContinuation("claude-cli")).toBe(false);
  });
});
