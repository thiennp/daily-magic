"use client";

import { useSendTaskComposerStepTrail } from "@/features/agent/hooks/useSendTaskComposerStepTrail";
import { useWsTestComposerPanelActions } from "@/features/agent/hooks/useWsTestComposerPanelActions";
import { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useWsTestPanelSteppedComposer = (input: {
  readonly isSteppedComposer: boolean;
  readonly isSessionActive: boolean;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly hasRememberedWriterAgentSelection: boolean;
  readonly activeDeviceId: string;
  readonly showMacPicker: boolean;
  readonly isMacDeviceLocked: boolean;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
  readonly onFinishSession: () => void;
}): {
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly panelActions: ReturnType<typeof useWsTestComposerPanelActions>;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
} => {
  const wizard = useWsTestComposerWizard({
    isSteppedComposer: input.isSteppedComposer,
    macStepInput: {
      showMacPicker: input.showMacPicker,
      isOwnDeviceDispatch: input.composer.isOwnDeviceDispatch,
      isMacDeviceLocked: input.isMacDeviceLocked,
      isMacDevicesLoading: input.composer.isMacDevicesLoading,
      deviceCount: input.composer.macDevices.length,
      hasRememberedMacSelection: input.composer.hasRememberedMacSelection,
    },
    hasPrefilledLibraryCapability:
      input.composer.selectedLibraryCapabilityId.length > 0,
    hasRememberedWriterAgentSelection: input.hasRememberedWriterAgentSelection,
  });
  const panelActions = useWsTestComposerPanelActions({
    composer: input.composer,
    wizard,
    onWriterAgentChange: input.onWriterAgentChange,
    onStartWriterAgent: input.onStartWriterAgent,
  });
  const finishSessionAnd = (back: () => void) => () => {
    if (input.isSessionActive) {
      input.onFinishSession();
    }

    back();
  };
  const stepTrail = useSendTaskComposerStepTrail({
    isSteppedComposer: input.isSteppedComposer,
    isSessionActive: input.isSessionActive,
    wizard,
    composer: input.composer,
    macDispatchDeviceId: input.activeDeviceId,
    macStepInput: {
      showMacPicker: input.showMacPicker,
      isOwnDeviceDispatch: input.composer.isOwnDeviceDispatch,
      isMacDeviceLocked: input.isMacDeviceLocked,
      isMacDevicesLoading: input.composer.isMacDevicesLoading,
      deviceCount: input.composer.macDevices.length,
      hasRememberedMacSelection: input.composer.hasRememberedMacSelection,
    },
    writerAgent: input.writerAgent,
    onMacStepBack: finishSessionAnd(panelActions.handleMacStepBack),
    onWorkflowStepBack: finishSessionAnd(panelActions.handleWorkflowStepBack),
    onWriterStepBack: finishSessionAnd(panelActions.handleWriterStepBack),
  });

  return { wizard, panelActions, stepTrail };
};
