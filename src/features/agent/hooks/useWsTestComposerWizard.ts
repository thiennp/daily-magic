"use client";

import { useState } from "react";

import { createWsTestComposerWizardCompletes } from "@/features/agent/utils/createWsTestComposerWizardCompletes";
import { createWsTestComposerWizardResets } from "@/features/agent/utils/createWsTestComposerWizardResets";
import { resolveWsTestComposerPickerCompleted } from "@/features/agent/utils/resolveWsTestComposerPickerCompleted";
import { resolveWsTestComposerProjectStepCompletion } from "@/features/agent/utils/resolveWsTestComposerProjectStepCompletion";
import { resolveWsTestComposerWriterAgentCompleted } from "@/features/agent/utils/resolveWsTestComposerWriterAgentCompleted";
import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import {
  shouldAutoCompleteWsTestComposerMacSelectionStep,
  shouldSkipWsTestComposerMacSelectionStep,
} from "@/features/agent/utils/resolveWsTestComposerMacStep";
import { resolveWsTestComposerWizardStepFlags } from "@/features/agent/utils/resolveWsTestComposerWizardStepFlags";

interface UseWsTestComposerWizardInput {
  readonly isSteppedComposer: boolean;
  readonly macStepInput: WsTestComposerMacStepInput;
  readonly hasPrefilledLibraryCapability: boolean;
  readonly hasContinueSessionPrefill: boolean;
  readonly hasCustomTaskPrefill: boolean;
  readonly hasRememberedWriterAgentSelection: boolean;
  readonly requiresProjectStep: boolean;
  readonly urlProjectId: string;
  readonly selectedProjectId: string;
}

export function useWsTestComposerWizard({
  isSteppedComposer,
  macStepInput,
  hasPrefilledLibraryCapability,
  hasContinueSessionPrefill,
  hasCustomTaskPrefill,
  hasRememberedWriterAgentSelection,
  requiresProjectStep,
  urlProjectId,
  selectedProjectId,
}: UseWsTestComposerWizardInput) {
  const [hasConfirmedMacSelection, setHasConfirmedMacSelection] =
    useState(false);
  const [hasConfirmedPickerSelection, setHasConfirmedPickerSelection] =
    useState(false);
  const [hasConfirmedProjectSelection, setHasConfirmedProjectSelection] =
    useState(false);
  const [
    hasConfirmedWriterAgentSelection,
    setHasConfirmedWriterAgentSelection,
  ] = useState(false);
  const [hasRewoundWizard, setHasRewoundWizard] = useState(false);
  const shouldSkipMacSelectionStep =
    shouldSkipWsTestComposerMacSelectionStep(macStepInput);
  const hasCompletedMacSelectionStep =
    hasConfirmedMacSelection ||
    shouldAutoCompleteWsTestComposerMacSelectionStep({
      ...macStepInput,
      hasRewoundWizard,
    });
  const hasCompletedPickerStep = resolveWsTestComposerPickerCompleted({
    hasConfirmedPickerSelection,
    isSteppedComposer,
    hasPrefilledLibraryCapability,
    hasContinueSessionPrefill,
    hasCustomTaskPrefill,
    hasRewoundWizard,
  });
  const hasCompletedProjectStep = resolveWsTestComposerProjectStepCompletion({
    hasConfirmedProjectSelection,
    requiresProjectStep,
    urlProjectId,
    selectedProjectId,
    hasRewoundWizard,
  });
  const hasCompletedWriterAgentStep = resolveWsTestComposerWriterAgentCompleted(
    {
      hasConfirmedWriterAgentSelection,
      isSteppedComposer,
      hasRememberedWriterAgentSelection,
      hasRewoundWizard,
    },
  );
  const wizardResets = createWsTestComposerWizardResets(setHasRewoundWizard, {
    setHasConfirmedMacSelection,
    setHasConfirmedPickerSelection,
    setHasConfirmedProjectSelection,
    setHasConfirmedWriterAgentSelection,
  });
  const wizardCompletes = createWsTestComposerWizardCompletes({
    setHasConfirmedMacSelection,
    setHasConfirmedPickerSelection,
    setHasConfirmedProjectSelection,
    setHasConfirmedWriterAgentSelection,
  });
  const stepFlags = resolveWsTestComposerWizardStepFlags({
    isSteppedComposer,
    macStepInput,
    hasCompletedMacSelectionStep,
    hasCompletedPickerStep,
    hasCompletedProjectStep,
    requiresProjectStep,
    hasCompletedWriterAgentStep,
  });

  return {
    ...stepFlags,
    ...wizardCompletes,
    ...wizardResets,
    shouldSkipMacSelectionStep: () => shouldSkipMacSelectionStep,
    hasCompletedMacSelectionStep,
    hasCompletedPickerStep,
    hasCompletedProjectStep,
    hasCompletedWriterAgentStep,
  };
}
