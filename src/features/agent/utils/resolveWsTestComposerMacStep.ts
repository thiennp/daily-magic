export type WsTestComposerMacStepInput = {
  readonly showMacPicker: boolean;
  readonly isOwnDeviceDispatch: boolean;
  readonly isMacDeviceLocked: boolean;
  readonly isMacDevicesLoading: boolean;
  readonly deviceCount: number;
};

export const shouldSkipWsTestComposerMacSelectionStep = (
  input: WsTestComposerMacStepInput,
): boolean =>
  !input.showMacPicker ||
  input.isOwnDeviceDispatch ||
  input.isMacDeviceLocked ||
  input.isMacDevicesLoading ||
  input.deviceCount <= 1;

export const shouldShowWsTestComposerMacSelectionStepOnly = (
  input: WsTestComposerMacStepInput & {
    readonly hasCompletedMacSelectionStep: boolean;
  },
): boolean =>
  !shouldSkipWsTestComposerMacSelectionStep(input) &&
  !input.hasCompletedMacSelectionStep;

export const shouldShowWsTestComposerMacSection = (
  input: WsTestComposerMacStepInput & {
    readonly hasCompletedMacSelectionStep: boolean;
  },
): boolean =>
  input.showMacPicker &&
  (shouldShowWsTestComposerMacSelectionStepOnly(input) ||
    input.isOwnDeviceDispatch ||
    input.isMacDeviceLocked);
