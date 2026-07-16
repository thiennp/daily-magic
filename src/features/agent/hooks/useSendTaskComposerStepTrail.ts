"use client";

import { useMemo } from "react";

import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import {
  resolveSendTaskComposerStepTrailItems,
  resolveSendTaskComposerWorkflowSelectionLabel,
  type SendTaskComposerWizardStepId,
} from "@/features/agent/utils/resolveSendTaskComposerStepTrail";
import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import { shouldSkipWsTestComposerMacSelectionStep } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useSendTaskComposerStepTrail = (input: {
  readonly isSteppedComposer: boolean;
  readonly isSessionActive?: boolean;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly macDispatchDeviceId: string;
  readonly macStepInput: WsTestComposerMacStepInput;
  readonly writerAgent: HarnessWriterAgent;
  readonly onMacStepBack: () => void;
  readonly onWorkflowStepBack: () => void;
  readonly onWriterStepBack: () => void;
}): readonly SendTaskComposerStepTrailViewItem[] => {
  const currentStep = useMemo((): SendTaskComposerWizardStepId | null => {
    if (!input.isSteppedComposer) {
      return null;
    }

    if (input.isSessionActive) {
      return "session";
    }

    if (input.wizard.showPickerStepOnly) {
      return "picker";
    }

    if (input.wizard.showWriterAgentStepOnly) {
      return "writer";
    }

    if (input.wizard.showFormStep) {
      return "form";
    }

    return null;
  }, [
    input.isSessionActive,
    input.isSteppedComposer,
    input.wizard.showFormStep,
    input.wizard.showPickerStepOnly,
    input.wizard.showWriterAgentStepOnly,
  ]);

  return useMemo(() => {
    if (currentStep === null) {
      return [];
    }

    const workflowSelectionLabel =
      resolveSendTaskComposerWorkflowSelectionLabel(
        input.composer.selectedLibraryCapabilityId,
        input.composer.libraryCapabilities,
      );
    const trailItems = resolveSendTaskComposerStepTrailItems({
      currentStep,
      showMacTrail:
        currentStep === "session"
          ? !shouldSkipWsTestComposerMacSelectionStep(input.macStepInput)
          : !shouldSkipWsTestComposerMacSelectionStep(input.macStepInput) &&
            input.wizard.hasCompletedMacSelectionStep,
      macDeviceName:
        input.composer.macDisplayNameById.get(input.macDispatchDeviceId) ??
        "Your Mac",
      showWorkflowTrail:
        currentStep === "session" ? true : input.wizard.hasCompletedPickerStep,
      workflowSelectionLabel,
      showWriterTrail:
        currentStep === "session"
          ? true
          : input.wizard.hasCompletedWriterAgentStep,
      writerAgent: input.writerAgent,
    });

    return trailItems.map((item) => ({
      ...item,
      onBack:
        item.id === "mac"
          ? input.onMacStepBack
          : item.id === "workflow"
            ? input.onWorkflowStepBack
            : input.onWriterStepBack,
    }));
  }, [
    currentStep,
    input.composer.libraryCapabilities,
    input.composer.macDisplayNameById,
    input.composer.selectedLibraryCapabilityId,
    input.macDispatchDeviceId,
    input.macStepInput,
    input.onMacStepBack,
    input.onWorkflowStepBack,
    input.onWriterStepBack,
    input.writerAgent,
    input.wizard.hasCompletedMacSelectionStep,
    input.wizard.hasCompletedPickerStep,
    input.wizard.hasCompletedWriterAgentStep,
  ]);
};
