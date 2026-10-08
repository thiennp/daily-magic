import type { WsTestComposerWizardResetHandlers } from "@/features/agent/types/WsTestComposerWizardResetHandlers.type";

export const createWsTestComposerWizardResets = (
  setHasRewoundWizard: (value: boolean) => void,
  setters: {
    readonly setHasConfirmedMacSelection: (value: boolean) => void;
    readonly setHasConfirmedPickerSelection: (value: boolean) => void;
    readonly setHasConfirmedProjectSelection: (value: boolean) => void;
    readonly setHasConfirmedWriterAgentSelection: (value: boolean) => void;
  },
): WsTestComposerWizardResetHandlers => ({
  resetMacSelectionStep: () => {
    setHasRewoundWizard(true);
    setters.setHasConfirmedMacSelection(false);
    setters.setHasConfirmedPickerSelection(false);
    setters.setHasConfirmedProjectSelection(false);
    setters.setHasConfirmedWriterAgentSelection(false);
  },
  resetPickerStep: () => {
    setHasRewoundWizard(true);
    setters.setHasConfirmedPickerSelection(false);
    setters.setHasConfirmedProjectSelection(false);
    setters.setHasConfirmedWriterAgentSelection(false);
  },
  resetProjectStep: () => {
    setHasRewoundWizard(true);
    setters.setHasConfirmedProjectSelection(false);
    setters.setHasConfirmedWriterAgentSelection(false);
  },
  // 2331ef53: the LLM CLI pencil rewound the prefilled project and workflow
  // too (their auto-complete ignores a rewound wizard); keep them confirmed.
  resetWriterAgentStep: () => {
    setHasRewoundWizard(true);
    setters.setHasConfirmedMacSelection(true);
    setters.setHasConfirmedProjectSelection(true);
    setters.setHasConfirmedPickerSelection(true);
    setters.setHasConfirmedWriterAgentSelection(false);
  },
});
