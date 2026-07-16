"use client";

import { useState } from "react";

import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import {
  shouldShowWsTestComposerMacSection,
  shouldShowWsTestComposerMacSelectionStepOnly,
  shouldShowWsTestComposerSelectedMacBackLink,
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

  const shouldSkipMacSelectionStep =
    shouldSkipWsTestComposerMacSelectionStep(macStepInput);
  const hasCompletedMacSelectionStep =
    hasConfirmedMacSelection || shouldSkipMacSelectionStep;
  const hasCompletedPickerStep =
    hasConfirmedPickerSelection ||
    !isSteppedComposer ||
    hasPrefilledLibraryCapability;

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
  const showFormStep = !showMacSelectionStepOnly && !showPickerStepOnly;
  const showSelectedMacBackLink = shouldShowWsTestComposerSelectedMacBackLink(
    showPickerStepOnly,
    macStepInput,
  );

  return {
    showMacSection,
    showMacSelectionStepOnly,
    showPickerStepOnly,
    showFormStep,
    showSelectedMacBackLink,
    completeMacSelectionStep: () => {
      setHasConfirmedMacSelection(true);
    },
    completePickerStep: () => {
      setHasConfirmedPickerSelection(true);
    },
    resetMacSelectionStep: () => {
      setHasConfirmedMacSelection(false);
    },
    shouldSkipMacSelectionStep: () => shouldSkipMacSelectionStep,
    hasCompletedMacSelectionStep,
  };
}
