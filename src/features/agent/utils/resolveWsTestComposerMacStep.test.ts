import { describe, expect, it } from "vitest";

import {
  shouldShowWsTestComposerMacSection,
  shouldShowWsTestComposerMacSelectionStepOnly,
  shouldSkipWsTestComposerMacSelectionStep,
} from "@/features/agent/utils/resolveWsTestComposerMacStep";

const baseInput = {
  showMacPicker: true,
  isOwnDeviceDispatch: false,
  isMacDeviceLocked: false,
  isMacDevicesLoading: false,
  deviceCount: 2,
};

describe("shouldSkipWsTestComposerMacSelectionStep", () => {
  it("skips when mac picker is hidden", () => {
    expect(
      shouldSkipWsTestComposerMacSelectionStep({
        ...baseInput,
        showMacPicker: false,
      }),
    ).toBe(true);
  });

  it("skips when dispatching to own pinned device", () => {
    expect(
      shouldSkipWsTestComposerMacSelectionStep({
        ...baseInput,
        isOwnDeviceDispatch: true,
      }),
    ).toBe(true);
  });

  it("skips when only one mac is available", () => {
    expect(
      shouldSkipWsTestComposerMacSelectionStep({
        ...baseInput,
        deviceCount: 1,
      }),
    ).toBe(true);
  });

  it("requires selection when multiple macs are available", () => {
    expect(shouldSkipWsTestComposerMacSelectionStep(baseInput)).toBe(false);
  });
});

describe("shouldShowWsTestComposerMacSelectionStepOnly", () => {
  it("shows mac-only step until the user selects a mac", () => {
    expect(
      shouldShowWsTestComposerMacSelectionStepOnly({
        ...baseInput,
        hasCompletedMacSelectionStep: false,
      }),
    ).toBe(true);

    expect(
      shouldShowWsTestComposerMacSelectionStepOnly({
        ...baseInput,
        hasCompletedMacSelectionStep: true,
      }),
    ).toBe(false);
  });
});

describe("shouldShowWsTestComposerMacSection", () => {
  it("hides the mac section after multi-mac selection", () => {
    expect(
      shouldShowWsTestComposerMacSection({
        ...baseInput,
        hasCompletedMacSelectionStep: true,
      }),
    ).toBe(false);
  });

  it("keeps a locked mac visible on the compose step", () => {
    expect(
      shouldShowWsTestComposerMacSection({
        ...baseInput,
        isMacDeviceLocked: true,
        hasCompletedMacSelectionStep: true,
      }),
    ).toBe(true);
  });
});
