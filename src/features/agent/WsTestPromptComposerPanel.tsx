"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { useWsTestComposerPanelActions } from "@/features/agent/hooks/useWsTestComposerPanelActions";
import { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestComposerWizardSteps from "@/features/agent/WsTestComposerWizardSteps";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPromptComposerPanelProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly isWriterAgentLocked: boolean;
  readonly isMacDeviceLocked: boolean;
  readonly macDispatchDeviceId: string;
  readonly showMacPicker: boolean;
  readonly isSteppedComposer: boolean;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
  readonly onDeviceDeleted?: (deviceId: string) => void | Promise<void>;
}

export default function WsTestPromptComposerPanel(
  props: WsTestPromptComposerPanelProps,
) {
  const wizard = useWsTestComposerWizard({
    isSteppedComposer: props.isSteppedComposer,
    macStepInput: {
      showMacPicker: props.showMacPicker,
      isOwnDeviceDispatch: props.composer.isOwnDeviceDispatch,
      isMacDeviceLocked: props.isMacDeviceLocked,
      isMacDevicesLoading: props.composer.isMacDevicesLoading,
      deviceCount: props.composer.macDevices.length,
    },
    hasPrefilledLibraryCapability:
      props.composer.selectedLibraryCapabilityId.length > 0,
  });
  const {
    handleDeviceChange,
    handlePickerSelect,
    handleWriterAgentSelect,
    handleMacStepBack,
    handleWorkflowStepBack,
    handleWriterStepBack,
  } = useWsTestComposerPanelActions({
    composer: props.composer,
    wizard,
    onWriterAgentChange: props.onWriterAgentChange,
    onStartWriterAgent: props.onStartWriterAgent,
  });

  const wizardSteps = (
    <WsTestComposerWizardSteps
      composer={props.composer}
      wizard={wizard}
      writerAgent={props.writerAgent}
      onWriterAgentChange={props.onWriterAgentChange}
      isWriterAgentLocked={props.isWriterAgentLocked}
      isMacDeviceLocked={props.isMacDeviceLocked}
      macDispatchDeviceId={props.macDispatchDeviceId}
      showMacPicker={props.showMacPicker}
      isSteppedComposer={props.isSteppedComposer}
      connectionStatus={props.connectionStatus}
      isSendDisabled={props.isSendDisabled}
      onSend={props.onSend}
      onClear={props.onClear}
      onQueue={props.onQueue}
      onDeviceChange={handleDeviceChange}
      onPickerSelect={handlePickerSelect}
      onWriterAgentSelect={handleWriterAgentSelect}
      onMacStepBack={handleMacStepBack}
      onWorkflowStepBack={handleWorkflowStepBack}
      onWriterStepBack={handleWriterStepBack}
      onDeviceDeleted={props.onDeviceDeleted}
    />
  );

  if (props.isSteppedComposer) {
    return wizardSteps;
  }

  return <AppPanel>{wizardSteps}</AppPanel>;
}
