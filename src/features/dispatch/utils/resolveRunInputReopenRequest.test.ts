import { describe, expect, it } from "vitest";

import { resolveRunInputReopenRequest } from "@/features/dispatch/utils/resolveRunInputReopenRequest";

describe("resolveRunInputReopenRequest (afae8216)", () => {
  it("prefers the request this tab received", () => {
    const stored = { agentRunId: "run-1", question: "Q?", partialOutput: "x" };
    expect(
      resolveRunInputReopenRequest({
        runId: "run-1",
        stored,
        reportSummary: "Waiting for your answer: other",
      }),
    ).toBe(stored);
  });

  it("falls back to the waiting summary", () => {
    expect(
      resolveRunInputReopenRequest({
        runId: "run-1",
        stored: undefined,
        reportSummary: "Waiting for your answer: Which branch?",
      }),
    ).toEqual({
      agentRunId: "run-1",
      question: "Which branch?",
      partialOutput: "",
    });
  });

  it("returns null when the run is not waiting", () => {
    expect(
      resolveRunInputReopenRequest({
        runId: "run-1",
        stored: null,
        reportSummary: "Working on it",
      }),
    ).toBeNull();
  });
});
