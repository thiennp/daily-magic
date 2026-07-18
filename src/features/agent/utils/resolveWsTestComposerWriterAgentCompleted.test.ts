import { describe, expect, it } from "vitest";

import { resolveWsTestComposerWriterAgentCompleted } from "@/features/agent/utils/resolveWsTestComposerWriterAgentCompleted";

describe("resolveWsTestComposerWriterAgentCompleted (AGENT-027)", () => {
  it("auto-completes when a prior CLI choice is remembered", () => {
    expect(
      resolveWsTestComposerWriterAgentCompleted({
        hasConfirmedWriterAgentSelection: false,
        isSteppedComposer: true,
        hasRememberedWriterAgentSelection: true,
        hasRewoundWizard: false,
      }),
    ).toBe(true);
  });

  it("requires explicit confirmation after the user rewinds via step trail", () => {
    expect(
      resolveWsTestComposerWriterAgentCompleted({
        hasConfirmedWriterAgentSelection: false,
        isSteppedComposer: true,
        hasRememberedWriterAgentSelection: true,
        hasRewoundWizard: true,
      }),
    ).toBe(false);
  });

  it("treats writer as complete once the user confirms after rewind", () => {
    expect(
      resolveWsTestComposerWriterAgentCompleted({
        hasConfirmedWriterAgentSelection: true,
        isSteppedComposer: true,
        hasRememberedWriterAgentSelection: true,
        hasRewoundWizard: true,
      }),
    ).toBe(true);
  });

  it("does not auto-complete on first visit without a stored CLI", () => {
    expect(
      resolveWsTestComposerWriterAgentCompleted({
        hasConfirmedWriterAgentSelection: false,
        isSteppedComposer: true,
        hasRememberedWriterAgentSelection: false,
        hasRewoundWizard: false,
      }),
    ).toBe(false);
  });
});
