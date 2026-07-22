import { shouldAutoCompleteWsTestComposerProjectStep } from "@/features/agent/utils/resolveWsTestComposerProjectStep";

export const resolveWsTestComposerProjectStepCompletion = (input: {
  readonly hasConfirmedProjectSelection: boolean;
  readonly requiresProjectStep: boolean;
  readonly urlProjectId: string;
  readonly selectedProjectId: string;
  readonly hasRewoundWizard: boolean;
}): boolean =>
  input.hasConfirmedProjectSelection ||
  !input.requiresProjectStep ||
  shouldAutoCompleteWsTestComposerProjectStep({
    selectedProjectId: input.selectedProjectId,
    hasRewoundWizard: input.hasRewoundWizard,
  });
