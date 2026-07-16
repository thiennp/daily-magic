"use client";

import { useState } from "react";

import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import {
  shouldShowWsTestComposerMacSection,
  shouldShowWsTestComposerMacSelectionStepOnly,
  shouldSkipWsTestComposerMacSelectionStep,
} from "@/features/agent/utils/resolveWsTestComposerMacStep";

interface UseWsTestComposerWizardInput {
  readonly isSteppedComposer: boolean;
  readonly macStepInput: WsTestComposerMacStepInput;
  readonly hasPrefilledLibraryCapability: boolean;
}

export function useWsTestComposerWizard({
  isSteppedComposer,
  macStepInput,
  hasPrefilledLibraryCapability,
}: UseWsTestComposerWizardInput) {
  const [hasConfirmedMacSelection, setHasConfirmedMacSelection] =
    useState(false);
  const [hasConfirmedPickerSelection, setHasConfirmedPickerSelection] =
    useState(false);
  const [
    hasConfirmedWriterAgentSelection,
    setHasConfirmedWriterAgentSelection,
  ] = useState(false);

  const shouldSkipMacSelectionStep =
    shouldSkipWsTestComposerMacSelectionStep(macStepInput);
  const hasCompletedMacSelectionStep =
    hasConfirmedMacSelection || shouldSkipMacSelectionStep;
  const hasCompletedPickerStep =
    hasConfirmedPickerSelection ||
    !isSteppedComposer ||
    hasPrefilledLibraryCapability;
  const hasCompletedWriterAgentStep =
    hasConfirmedWriterAgentSelection || !isSteppedComposer;

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
      setHasConfirmedMacSelection(false);
      setHasConfirmedPickerSelection(false);
      setHasConfirmedWriterAgentSelection(false);
    },
    resetPickerStep: () => {
      setHasConfirmedPickerSelection(false);
      setHasConfirmedWriterAgentSelection(false);
    },
    resetWriterAgentStep: () => {
      setHasConfirmedWriterAgentSelection(false);
    },
    shouldSkipMacSelectionStep: () => shouldSkipMacSelectionStep,
    hasCompletedMacSelectionStep,
    hasCompletedPickerStep,
    hasCompletedWriterAgentStep,
  };
}
