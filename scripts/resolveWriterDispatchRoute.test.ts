import { describe, expect, it } from "vitest";

import {
  resolveWriterDispatchRoute,
  resolveWriterSessionTurn,
} from "./resolveWriterDispatchRoute";

describe("resolveWriterSessionTurn", () => {
  it("returns continue when warm session continuation is active", () => {
    expect(
      resolveWriterSessionTurn({
        sessionContinuation: true,
        supportsWriterSessionContinuation: true,
        isWriterConversationStarted: true,
      }),
    ).toBe("continue");
  });

  it("returns first when conversation is not started", () => {
    expect(
      resolveWriterSessionTurn({
        sessionContinuation: true,
        supportsWriterSessionContinuation: true,
        isWriterConversationStarted: false,
      }),
    ).toBe("first");
  });
});

describe("resolveWriterDispatchRoute", () => {
  it("skips memory and RAG on hot cli_continue path", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: true,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: true,
      hasSourceRunId: true,
      hasCanonicalTurns: true,
      userPromptCharacterCount: 120,
    });

    expect(plan.sessionTurn).toBe("continue");
    expect(plan.continuationStrategy).toBe("cli_continue");
    expect(plan.contextBudget).toBe("minimal");
    expect(plan.injectMemory).toBe(false);
    expect(plan.ragLimit).toBe(0);
  });

  it("prefers source_run_seed over transcript when sourceRunId is set", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: true,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: true,
      hasCanonicalTurns: true,
      userPromptCharacterCount: 200,
    });

    expect(plan.continuationStrategy).toBe("source_run_seed");
    expect(plan.ragLimit).toBe(3);
    expect(plan.ragMinScore).toBe(0.35);
    expect(plan.memoryEntryLimit).toBe(3);
  });

  it("uses transcript_seed when cold but canonical turns exist", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: true,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: false,
      hasCanonicalTurns: true,
      userPromptCharacterCount: 200,
    });

    expect(plan.continuationStrategy).toBe("transcript_seed");
  });

  it("tightens RAG on very short fresh prompts", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: false,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: false,
      hasCanonicalTurns: false,
      userPromptCharacterCount: 12,
    });

    expect(plan.continuationStrategy).toBe("none");
    expect(plan.ragLimit).toBe(2);
    expect(plan.ragMinScore).toBe(0.4);
  });

  it("uses full context budget for long prompts", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: false,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: false,
      hasCanonicalTurns: false,
      userPromptCharacterCount: 4_000,
    });

    expect(plan.contextBudget).toBe("full");
    expect(plan.memoryEntryLimit).toBe(8);
    expect(plan.ragMinScore).toBe(0.25);
  });
});
