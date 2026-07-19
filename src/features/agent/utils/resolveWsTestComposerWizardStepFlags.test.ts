import { describe, expect, it } from "vitest";

import { resolveWsTestComposerWizardStepFlags } from "@/features/agent/utils/resolveWsTestComposerWizardStepFlags";

const macStepInput = {
  showMacPicker: true,
  isOwnDeviceDispatch: true,
  isMacDeviceLocked: false,
  isMacDevicesLoading: false,
  deviceCount: 1,
  hasRememberedMacSelection: true,
};

describe("resolveWsTestComposerWizardStepFlags", () => {
  it("shows the picker after Mac is complete and before workflow selection", () => {
    const flags = resolveWsTestComposerWizardStepFlags({
      isSteppedComposer: true,
      macStepInput,
      hasCompletedMacSelectionStep: true,
      hasCompletedPickerStep: false,
      hasCompletedWriterAgentStep: false,
    });

    expect(flags.showPickerStepOnly).toBe(true);
    expect(flags.showFormStep).toBe(false);
  });

  it("shows the form once Mac, picker, and writer steps are complete", () => {
    const flags = resolveWsTestComposerWizardStepFlags({
      isSteppedComposer: true,
      macStepInput,
      hasCompletedMacSelectionStep: true,
      hasCompletedPickerStep: true,
      hasCompletedWriterAgentStep: true,
    });

    expect(flags.showFormStep).toBe(true);
    expect(flags.showPickerStepOnly).toBe(false);
  });
});
