import type { SendTaskComposerWizardStepId } from "@/features/agent/utils/resolveSendTaskComposerStepTrail";

export const resolveSendTaskComposerCurrentWizardStep = (input: {
  readonly isSteppedComposer: boolean;
  readonly isSessionActive?: boolean;
  readonly showPickerStepOnly: boolean;
  readonly showProjectStepOnly: boolean;
  readonly showWriterAgentStepOnly: boolean;
  readonly showFormStep: boolean;
}): SendTaskComposerWizardStepId | null => {
  if (!input.isSteppedComposer) {
    return null;
  }

  if (input.isSessionActive) {
    return "session";
  }

  if (input.showPickerStepOnly) {
    return "picker";
  }

  if (input.showProjectStepOnly) {
    return "project";
  }

  if (input.showWriterAgentStepOnly) {
    return "writer";
  }

  if (input.showFormStep) {
    return "form";
  }

  return null;
};
