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
  readonly hasCompletedProjectStep: boolean;
  readonly requiresProjectStep: boolean;
  readonly hasCompletedWriterAgentStep: boolean;
}): {
  readonly showMacSection: boolean;
  readonly showMacSelectionStepOnly: boolean;
  readonly showPickerStepOnly: boolean;
  readonly showProjectStepOnly: boolean;
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
  // AGENT-045: Mac → Project → Workflow → Writer → Form
  const showProjectStepOnly =
    input.isSteppedComposer &&
    input.hasCompletedMacSelectionStep &&
    input.requiresProjectStep &&
    !input.hasCompletedProjectStep;
  const showPickerStepOnly =
    input.isSteppedComposer &&
    input.hasCompletedMacSelectionStep &&
    input.hasCompletedProjectStep &&
    !input.hasCompletedPickerStep;
  const showWriterAgentStepOnly =
    input.isSteppedComposer &&
    input.hasCompletedPickerStep &&
    input.hasCompletedProjectStep &&
    !input.hasCompletedWriterAgentStep;

  return {
    showMacSection: shouldShowWsTestComposerMacSection(macStepState),
    showMacSelectionStepOnly,
    showPickerStepOnly,
    showProjectStepOnly,
    showWriterAgentStepOnly,
    showFormStep:
      !showMacSelectionStepOnly &&
      !showPickerStepOnly &&
      !showProjectStepOnly &&
      !showWriterAgentStepOnly,
  };
};
