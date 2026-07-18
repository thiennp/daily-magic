"use client";

import { useState } from "react";

import { resolveWsTestComposerPickerCompleted } from "@/features/agent/utils/resolveWsTestComposerPickerCompleted";
import { resolveWsTestComposerWriterAgentCompleted } from "@/features/agent/utils/resolveWsTestComposerWriterAgentCompleted";
import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import {
  shouldAutoCompleteWsTestComposerMacSelectionStep,
  shouldShowWsTestComposerMacSection,
  shouldShowWsTestComposerMacSelectionStepOnly,
  shouldSkipWsTestComposerMacSelectionStep,
} from "@/features/agent/utils/resolveWsTestComposerMacStep";

interface UseWsTestComposerWizardInput {
  readonly isSteppedComposer: boolean;
  readonly macStepInput: WsTestComposerMacStepInput;
  readonly hasPrefilledLibraryCapability: boolean;
  readonly hasRememberedWriterAgentSelection: boolean;
}

export function useWsTestComposerWizard({
  isSteppedComposer,
  macStepInput,
  hasPrefilledLibraryCapability,
  hasRememberedWriterAgentSelection,
}: UseWsTestComposerWizardInput) {
  const [hasConfirmedMacSelection, setHasConfirmedMacSelection] =
    useState(false);
  const [hasConfirmedPickerSelection, setHasConfirmedPickerSelection] =
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

  const macStepState = {
    ...macStepInput,
    hasCompletedMacSelectionStep,
  };
  const showMacSection = shouldShowWsTestComposerMacSection(macStepState);
  const showMacSelectionStepOnly =
    isSteppedComposer &&
    shouldShowWsTestComposerMacSelectionStepOnly(macStepState);
  const showPickerStepOnly =
    isSteppedComposer &&
    hasCompletedMacSelectionStep &&
    !hasCompletedPickerStep;
  const showWriterAgentStepOnly =
    isSteppedComposer && hasCompletedPickerStep && !hasCompletedWriterAgentStep;
  const showFormStep =
    !showMacSelectionStepOnly &&
    !showPickerStepOnly &&
    !showWriterAgentStepOnly;

  return {
    showMacSection,
    showMacSelectionStepOnly,
    showPickerStepOnly,
    showWriterAgentStepOnly,
    showFormStep,
    completeMacSelectionStep: () => {
      setHasConfirmedMacSelection(true);
    },
    completePickerStep: () => {
      setHasConfirmedPickerSelection(true);
    },
    completeWriterAgentStep: () => {
      setHasConfirmedWriterAgentSelection(true);
    },
    resetMacSelectionStep: () => {
      setHasRewoundWizard(true);
      setHasConfirmedMacSelection(false);
      setHasConfirmedPickerSelection(false);
      setHasConfirmedWriterAgentSelection(false);
    },
    resetPickerStep: () => {
      setHasRewoundWizard(true);
      setHasConfirmedPickerSelection(false);
      setHasConfirmedWriterAgentSelection(false);
    },
    resetWriterAgentStep: () => {
      setHasRewoundWizard(true);
      setHasConfirmedWriterAgentSelection(false);
    },
    shouldSkipMacSelectionStep: () => shouldSkipMacSelectionStep,
    hasCompletedMacSelectionStep,
    hasCompletedPickerStep,
    hasCompletedWriterAgentStep,
  };
}
