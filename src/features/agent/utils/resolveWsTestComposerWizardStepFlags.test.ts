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
  it("AGENT-045: shows project after Mac before workflow selection", () => {
    const flags = resolveWsTestComposerWizardStepFlags({
      isSteppedComposer: true,
      macStepInput,
      hasCompletedMacSelectionStep: true,
      hasCompletedPickerStep: false,
      hasCompletedProjectStep: false,
      requiresProjectStep: true,
      hasCompletedWriterAgentStep: false,
    });

    expect(flags.showProjectStepOnly).toBe(true);
    expect(flags.showPickerStepOnly).toBe(false);
    expect(flags.showFormStep).toBe(false);
  });

  it("AGENT-045: shows the picker after Mac and project are complete", () => {
    const flags = resolveWsTestComposerWizardStepFlags({
      isSteppedComposer: true,
      macStepInput,
      hasCompletedMacSelectionStep: true,
      hasCompletedPickerStep: false,
      hasCompletedProjectStep: true,
      requiresProjectStep: true,
      hasCompletedWriterAgentStep: false,
    });

    expect(flags.showPickerStepOnly).toBe(true);
    expect(flags.showProjectStepOnly).toBe(false);
    expect(flags.showFormStep).toBe(false);
  });

  it("shows the form once Mac, project, picker, and writer steps are complete", () => {
    const flags = resolveWsTestComposerWizardStepFlags({
      isSteppedComposer: true,
      macStepInput,
      hasCompletedMacSelectionStep: true,
      hasCompletedPickerStep: true,
      hasCompletedProjectStep: true,
      requiresProjectStep: true,
      hasCompletedWriterAgentStep: true,
    });

    expect(flags.showFormStep).toBe(true);
    expect(flags.showPickerStepOnly).toBe(false);
    expect(flags.showProjectStepOnly).toBe(false);
  });
});
