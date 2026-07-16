import { describe, expect, it } from "vitest";

import {
  shouldAutoCompleteWsTestComposerMacSelectionStep,
  shouldShowWsTestComposerMacSelectionStepOnly,
  shouldSkipWsTestComposerMacSelectionStep,
} from "@/features/agent/utils/resolveWsTestComposerMacStep";
import { wsTestComposerMacStepBaseInput as baseInput } from "@/features/agent/utils/resolveWsTestComposerMacStep.testHelper";

describe("shouldSkipWsTestComposerMacSelectionStep loading", () => {
  it("waits for mac devices to load before skipping for a single mac", () => {
    expect(
      shouldSkipWsTestComposerMacSelectionStep({
        ...baseInput,
        isMacDevicesLoading: true,
        deviceCount: 0,
      }),
    ).toBe(false);
  });
});

describe("shouldAutoCompleteWsTestComposerMacSelectionStep", () => {
  it("does not auto-complete while mac devices are loading", () => {
    expect(
      shouldAutoCompleteWsTestComposerMacSelectionStep({
        ...baseInput,
        isMacDevicesLoading: true,
        deviceCount: 0,
      }),
    ).toBe(false);
  });

  it("auto-completes when exactly one paired mac is loaded", () => {
    expect(
      shouldAutoCompleteWsTestComposerMacSelectionStep({
        ...baseInput,
        deviceCount: 1,
      }),
    ).toBe(true);
  });

  it("does not auto-complete when multiple macs are available", () => {
    expect(shouldAutoCompleteWsTestComposerMacSelectionStep(baseInput)).toBe(
      false,
    );
  });
});

describe("shouldShowWsTestComposerMacSelectionStepOnly loading", () => {
  it("shows mac-only step while devices are loading", () => {
    expect(
      shouldShowWsTestComposerMacSelectionStepOnly({
        ...baseInput,
        isMacDevicesLoading: true,
        deviceCount: 0,
        hasCompletedMacSelectionStep: false,
      }),
    ).toBe(true);
  });
});
