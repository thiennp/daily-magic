export const resolveWsTestComposerPickerCompleted = (input: {
  readonly hasConfirmedPickerSelection: boolean;
  readonly isSteppedComposer: boolean;
  readonly hasPrefilledLibraryCapability: boolean;
  readonly hasContinueSessionPrefill: boolean;
  readonly hasCustomTaskPrefill: boolean;
  readonly hasRewoundWizard: boolean;
}): boolean =>
  input.hasConfirmedPickerSelection ||
  !input.isSteppedComposer ||
  (input.hasPrefilledLibraryCapability && !input.hasRewoundWizard) ||
  (input.hasContinueSessionPrefill && !input.hasRewoundWizard) ||
  (input.hasCustomTaskPrefill && !input.hasRewoundWizard);
