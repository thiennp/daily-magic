import { describe, expect, it } from "vitest";

import { resolveWsTestComposerPickerCompleted } from "@/features/agent/utils/resolveWsTestComposerPickerCompleted";

const base = {
  hasConfirmedPickerSelection: false,
  isSteppedComposer: true,
  hasPrefilledLibraryCapability: false,
  hasContinueSessionPrefill: false,
  hasCustomTaskPrefill: false,
  hasRewoundWizard: false,
} as const;

describe("resolveWsTestComposerPickerCompleted", () => {
  it("auto-completes picker on first pass when a library capability is prefilled", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        ...base,
        hasPrefilledLibraryCapability: true,
      }),
    ).toBe(true);
  });

  it("AGENT-029: auto-completes picker when continuing a history session", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        ...base,
        hasContinueSessionPrefill: true,
      }),
    ).toBe(true);
  });

  it("AGENT-029: auto-completes picker for a custom task prefill", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        ...base,
        hasCustomTaskPrefill: true,
      }),
    ).toBe(true);
  });

  it("requires explicit picker confirmation after the user rewinds via step trail", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        ...base,
        hasPrefilledLibraryCapability: true,
        hasContinueSessionPrefill: true,
        hasCustomTaskPrefill: true,
        hasRewoundWizard: true,
      }),
    ).toBe(false);
  });

  it("treats picker as complete once the user confirms a selection after rewind", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        ...base,
        hasConfirmedPickerSelection: true,
        hasPrefilledLibraryCapability: true,
        hasRewoundWizard: true,
      }),
    ).toBe(true);
  });
});
