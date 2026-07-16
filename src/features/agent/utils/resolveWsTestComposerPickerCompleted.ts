export const resolveWsTestComposerPickerCompleted = (input: {
  readonly hasConfirmedPickerSelection: boolean;
  readonly isSteppedComposer: boolean;
  readonly hasPrefilledLibraryCapability: boolean;
  readonly hasRewoundWizard: boolean;
}): boolean =>
  input.hasConfirmedPickerSelection ||
  !input.isSteppedComposer ||
  (input.hasPrefilledLibraryCapability && !input.hasRewoundWizard);
