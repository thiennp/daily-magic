import { describe, expect, it } from "vitest";

import {
  resolveWriterDispatchRoute,
  resolveWriterSessionTurn,
} from "./resolveWriterDispatchRoute";

describe("resolveWriterSessionTurn", () => {
  it("returns continue for same-thread follow-up without sourceRunId", () => {
    expect(
      resolveWriterSessionTurn({
        sessionContinuation: true,
        supportsWriterSessionContinuation: true,
        isWriterConversationStarted: true,
        hasSourceRunId: false,
      }),
    ).toBe("continue");
  });

  it("returns first for a new task seeded from sourceRunId (no CLI --continue)", () => {
    expect(
      resolveWriterSessionTurn({
        sessionContinuation: true,
        supportsWriterSessionContinuation: true,
        isWriterConversationStarted: true,
        hasSourceRunId: true,
      }),
    ).toBe("first");
  });

  it("returns first when conversation is not started", () => {
    expect(
      resolveWriterSessionTurn({
        sessionContinuation: true,
        supportsWriterSessionContinuation: true,
        isWriterConversationStarted: false,
        hasSourceRunId: false,
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
      hasSourceRunId: false,
      hasCanonicalTurns: true,
      userPromptCharacterCount: 120,
      taskClass: "code",
    });

    expect(plan.sessionTurn).toBe("continue");
    expect(plan.continuationStrategy).toBe("cli_continue");
    expect(plan.contextBudget).toBe("minimal");
    expect(plan.knowledgePlan.mode).toBe("skip");
  });

  it("prefers source_run_seed over transcript when sourceRunId is set", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: true,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: true,
      hasCanonicalTurns: true,
      userPromptCharacterCount: 200,
      taskClass: "code",
    });

    expect(plan.sessionTurn).toBe("first");
    expect(plan.continuationStrategy).toBe("source_run_seed");
    expect(plan.knowledgePlan).toMatchObject({
      mode: "hybrid",
      tokenBudget: 800,
      maxCards: 6,
    });
  });

  it("uses transcript_seed when cold but canonical turns exist", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: true,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: false,
      hasCanonicalTurns: true,
      userPromptCharacterCount: 200,
      taskClass: "code",
    });

    expect(plan.continuationStrategy).toBe("transcript_seed");
  });

  it("gives short fresh code prompts the standard 300-token plan", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: false,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: false,
      hasCanonicalTurns: false,
      userPromptCharacterCount: 12,
      taskClass: "code",
    });

    expect(plan.continuationStrategy).toBe("none");
    expect(plan.knowledgePlan).toMatchObject({
      mode: "hybrid",
      tokenBudget: 300,
      maxCards: 3,
    });
  });

  it("uses full context budget for long prompts", () => {
    const plan = resolveWriterDispatchRoute({
      sessionContinuation: false,
      supportsWriterSessionContinuation: true,
      isWriterConversationStarted: false,
      hasSourceRunId: false,
      hasCanonicalTurns: false,
      userPromptCharacterCount: 4_000,
      taskClass: "code",
    });

    expect(plan.contextBudget).toBe("full");
    expect(plan.knowledgePlan.tokenBudget).toBe(800);
  });
});
