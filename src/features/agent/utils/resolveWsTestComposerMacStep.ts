export type WsTestComposerMacStepInput = {
  readonly showMacPicker: boolean;
  readonly isOwnDeviceDispatch: boolean;
  readonly isMacDeviceLocked: boolean;
  readonly isMacDevicesLoading: boolean;
  readonly deviceCount: number;
  readonly hasRememberedMacSelection?: boolean;
  readonly hasRewoundWizard?: boolean;
};

export const shouldSkipWsTestComposerMacSelectionStep = (
  input: WsTestComposerMacStepInput,
): boolean =>
  !input.showMacPicker ||
  input.isOwnDeviceDispatch ||
  input.isMacDeviceLocked ||
  (!input.isMacDevicesLoading && input.deviceCount <= 1);

/**
 * Auto-complete after devices load for single-Mac / locked / own-device, or when
 * last session’s Mac is still paired (unless the user rewound via the trail).
 */
export const shouldAutoCompleteWsTestComposerMacSelectionStep = (
  input: WsTestComposerMacStepInput,
): boolean => {
  if (input.isMacDevicesLoading || input.deviceCount === 0) {
    return false;
  }

  if (shouldSkipWsTestComposerMacSelectionStep(input)) {
    return true;
  }

  return (
    input.hasRememberedMacSelection === true && input.hasRewoundWizard !== true
  );
};

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

export const shouldShowWsTestComposerSelectedMacBackLink = (
  showPickerStepOnly: boolean,
  macStepInput: WsTestComposerMacStepInput,
): boolean =>
  showPickerStepOnly && !shouldSkipWsTestComposerMacSelectionStep(macStepInput);

/** Session lock / single-device skip must not hide Mac change during an active run. */
export const shouldShowMacTrailDuringActiveSession = (
  input: Pick<
    WsTestComposerMacStepInput,
    "showMacPicker" | "isOwnDeviceDispatch"
  >,
): boolean => input.showMacPicker && !input.isOwnDeviceDispatch;
