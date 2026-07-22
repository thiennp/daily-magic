"use client";

import { useMemo } from "react";

import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import { attachSendTaskComposerStepTrailBackHandlers } from "@/features/agent/utils/attachSendTaskComposerStepTrailBackHandlers";
import { resolveSendTaskComposerCurrentWizardStep } from "@/features/agent/utils/resolveSendTaskComposerCurrentWizardStep";
import {
  resolveSendTaskComposerStepTrailItems,
  resolveSendTaskComposerWorkflowSelectionLabel,
} from "@/features/agent/utils/resolveSendTaskComposerStepTrail";
import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import { shouldSkipWsTestComposerMacSelectionStep } from "@/features/agent/utils/resolveWsTestComposerMacStep";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useSendTaskComposerStepTrail = (input: {
  readonly isSteppedComposer: boolean;
  readonly isSessionActive?: boolean;
  readonly isContinueSession?: boolean;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly macDispatchDeviceId: string;
  readonly macStepInput: WsTestComposerMacStepInput;
  readonly writerAgent: HarnessWriterAgent;
  readonly onMacStepBack: () => void;
  readonly onWorkflowStepBack: () => void;
  readonly onProjectStepBack: () => void;
  readonly onWriterStepBack: () => void;
}): readonly SendTaskComposerStepTrailViewItem[] => {
  const currentStep = useMemo(
    () =>
      resolveSendTaskComposerCurrentWizardStep({
        isSteppedComposer: input.isSteppedComposer,
        isSessionActive: input.isSessionActive,
        showPickerStepOnly: input.wizard.showPickerStepOnly,
        showProjectStepOnly: input.wizard.showProjectStepOnly,
        showWriterAgentStepOnly: input.wizard.showWriterAgentStepOnly,
        showFormStep: input.wizard.showFormStep,
      }),
    [
      input.isSessionActive,
      input.isSteppedComposer,
      input.wizard.showFormStep,
      input.wizard.showPickerStepOnly,
      input.wizard.showProjectStepOnly,
      input.wizard.showWriterAgentStepOnly,
    ],
  );

  return useMemo(() => {
    if (currentStep === null) {
      return [];
    }

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
      workflowSelectionLabel: resolveSendTaskComposerWorkflowSelectionLabel(
        input.composer.selectedLibraryCapabilityId,
        input.composer.libraryCapabilities,
        input.isContinueSession === true,
      ),
      showProjectTrail:
        input.composer.selectedProject !== null ||
        input.wizard.hasCompletedProjectStep,
      projectSelectionLabel: input.composer.selectedProject?.name ?? "Default",
      showWriterTrail:
        currentStep === "session"
          ? true
          : input.wizard.hasCompletedWriterAgentStep,
      writerAgent: input.writerAgent,
    });

    return attachSendTaskComposerStepTrailBackHandlers(trailItems, input);
  }, [currentStep, input]);
};
