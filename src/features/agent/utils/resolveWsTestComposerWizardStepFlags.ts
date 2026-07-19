import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import {
  shouldShowWsTestComposerMacSection,
  shouldShowWsTestComposerMacSelectionStepOnly,
} from "@/features/agent/utils/resolveWsTestComposerMacStep";

export const resolveWsTestComposerWizardStepFlags = (input: {
  readonly isSteppedComposer: boolean;
  readonly macStepInput: WsTestComposerMacStepInput;
  readonly hasCompletedMacSelectionStep: boolean;
  readonly hasCompletedPickerStep: boolean;
  readonly hasCompletedWriterAgentStep: boolean;
}): {
  readonly showMacSection: boolean;
  readonly showMacSelectionStepOnly: boolean;
  readonly showPickerStepOnly: boolean;
  readonly showWriterAgentStepOnly: boolean;
  readonly showFormStep: boolean;
} => {
  const macStepState = {
    ...input.macStepInput,
    hasCompletedMacSelectionStep: input.hasCompletedMacSelectionStep,
  };
  const showMacSelectionStepOnly =
    input.isSteppedComposer &&
    shouldShowWsTestComposerMacSelectionStepOnly(macStepState);
  const showPickerStepOnly =
    input.isSteppedComposer &&
    input.hasCompletedMacSelectionStep &&
    !input.hasCompletedPickerStep;
  const showWriterAgentStepOnly =
    input.isSteppedComposer &&
    input.hasCompletedPickerStep &&
    !input.hasCompletedWriterAgentStep;

  return {
    showMacSection: shouldShowWsTestComposerMacSection(macStepState),
    showMacSelectionStepOnly,
    showPickerStepOnly,
    showWriterAgentStepOnly,
    showFormStep:
      !showMacSelectionStepOnly &&
      !showPickerStepOnly &&
      !showWriterAgentStepOnly,
  };
};
