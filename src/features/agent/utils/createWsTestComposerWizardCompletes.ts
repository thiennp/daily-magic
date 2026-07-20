export const createWsTestComposerWizardCompletes = (setters: {
  readonly setHasConfirmedMacSelection: (value: boolean) => void;
  readonly setHasConfirmedPickerSelection: (value: boolean) => void;
  readonly setHasConfirmedProjectSelection: (value: boolean) => void;
  readonly setHasConfirmedWriterAgentSelection: (value: boolean) => void;
}) => ({
  completeMacSelectionStep: () => {
    setters.setHasConfirmedMacSelection(true);
  },
  completePickerStep: () => {
    setters.setHasConfirmedPickerSelection(true);
  },
  completeProjectStep: () => {
    setters.setHasConfirmedProjectSelection(true);
  },
  completeWriterAgentStep: () => {
    setters.setHasConfirmedWriterAgentSelection(true);
  },
});
