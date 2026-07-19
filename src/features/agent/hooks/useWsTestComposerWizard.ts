"use client";

import { useState } from "react";

import { resolveWsTestComposerPickerCompleted } from "@/features/agent/utils/resolveWsTestComposerPickerCompleted";
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
}

export function useWsTestComposerWizard({
  isSteppedComposer,
  macStepInput,
  hasPrefilledLibraryCapability,
  hasContinueSessionPrefill,
  hasCustomTaskPrefill,
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
    hasContinueSessionPrefill,
    hasCustomTaskPrefill,
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
  const stepFlags = resolveWsTestComposerWizardStepFlags({
    isSteppedComposer,
    macStepInput,
    hasCompletedMacSelectionStep,
    hasCompletedPickerStep,
    hasCompletedWriterAgentStep,
  });

  return {
    ...stepFlags,
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
