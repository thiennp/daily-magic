export const resolveWsTestComposerWriterAgentCompleted = (input: {
  readonly hasConfirmedWriterAgentSelection: boolean;
  readonly isSteppedComposer: boolean;
  readonly hasRememberedWriterAgentSelection: boolean;
  readonly hasRewoundWizard: boolean;
}): boolean =>
  input.hasConfirmedWriterAgentSelection ||
  !input.isSteppedComposer ||
  (input.hasRememberedWriterAgentSelection && !input.hasRewoundWizard);
