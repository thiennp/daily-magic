import { describe, expect, it } from "vitest";

import { resolveWsTestComposerPickerCompleted } from "@/features/agent/utils/resolveWsTestComposerPickerCompleted";

describe("resolveWsTestComposerPickerCompleted", () => {
  it("auto-completes picker on first pass when a library capability is prefilled", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        hasConfirmedPickerSelection: false,
        isSteppedComposer: true,
        hasPrefilledLibraryCapability: true,
        hasRewoundWizard: false,
      }),
    ).toBe(true);
  });

  it("requires explicit picker confirmation after the user rewinds via step trail", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        hasConfirmedPickerSelection: false,
        isSteppedComposer: true,
        hasPrefilledLibraryCapability: true,
        hasRewoundWizard: true,
      }),
    ).toBe(false);
  });

  it("treats picker as complete once the user confirms a selection after rewind", () => {
    expect(
      resolveWsTestComposerPickerCompleted({
        hasConfirmedPickerSelection: true,
        isSteppedComposer: true,
        hasPrefilledLibraryCapability: true,
        hasRewoundWizard: true,
      }),
    ).toBe(true);
  });
});
