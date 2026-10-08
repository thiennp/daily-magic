import { describe, expect, it, vi } from "vitest";

import { resolveWriterPromptDispatchContinuation } from "@/features/agent/utils/resolveWriterPromptDispatchContinuation";

describe("resolveWriterPromptDispatchContinuation (FAIL1 a76d46ac)", () => {
  it("fresh Start after a failed run never continues or seeds the old run", () => {
    const isSessionContinuation = vi.fn(() => true);

    expect(
      resolveWriterPromptDispatchContinuation({
        freshStart: true,
        continueFromQuery: false,
        isSessionContinuation,
        urlSourceRunId: "b8cde711-failed-run",
        liveRunId: "b8cde711-failed-run",
      }),
    ).toEqual({
      isFreshStart: true,
      sessionContinuation: false,
      sourceRunId: undefined,
    });
    expect(isSessionContinuation).not.toHaveBeenCalled();
  });

  it("explicit job-history Continue keeps continuation and the source run", () => {
    expect(
      resolveWriterPromptDispatchContinuation({
        freshStart: true,
        continueFromQuery: true,
        isSessionContinuation: () => true,
        urlSourceRunId: "run-1",
        liveRunId: null,
      }),
    ).toEqual({
      isFreshStart: false,
      sessionContinuation: true,
      sourceRunId: "run-1",
    });
  });

  it("follow-up in the live thread continues the same run", () => {
    expect(
      resolveWriterPromptDispatchContinuation({
        freshStart: false,
        continueFromQuery: false,
        isSessionContinuation: () => true,
        urlSourceRunId: "run-1",
        liveRunId: "run-1",
      }),
    ).toEqual({
      isFreshStart: false,
      sessionContinuation: true,
      sourceRunId: "run-1",
    });
  });

  it("follow-up does not seed from a stale URL run the panel no longer shows", () => {
    expect(
      resolveWriterPromptDispatchContinuation({
        freshStart: false,
        continueFromQuery: false,
        isSessionContinuation: () => true,
        urlSourceRunId: "old-run",
        liveRunId: "new-run",
      }).sourceRunId,
    ).toBeUndefined();
  });
});
