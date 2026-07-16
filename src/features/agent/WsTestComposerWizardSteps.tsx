"use client";

import { useSendTaskComposerStepTrail } from "@/features/agent/hooks/useSendTaskComposerStepTrail";
import WsTestComposerMacSection from "@/features/agent/WsTestComposerMacSection";
import WsTestComposerWizardLaterSteps from "@/features/agent/WsTestComposerWizardLaterSteps";
import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestComposerWizardStepsProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
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
  readonly onDeviceChange: (deviceId: string) => void;
  readonly onPickerSelect: (item: SendTaskComposerPickerItem) => void;
  readonly onWriterAgentSelect: (writerAgent: HarnessWriterAgent) => void;
  readonly onMacStepBack: () => void;
  readonly onWorkflowStepBack: () => void;
  readonly onWriterStepBack: () => void;
  readonly onDeviceDeleted?: (deviceId: string) => void | Promise<void>;
}

export default function WsTestComposerWizardSteps({
  composer,
  wizard,
  writerAgent,
  onWriterAgentChange,
  isWriterAgentLocked,
  isMacDeviceLocked,
  macDispatchDeviceId,
  showMacPicker,
  isSteppedComposer,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
  onDeviceChange,
  onPickerSelect,
  onWriterAgentSelect,
  onMacStepBack,
  onWorkflowStepBack,
  onWriterStepBack,
  onDeviceDeleted,
}: WsTestComposerWizardStepsProps) {
  const stepTrail = useSendTaskComposerStepTrail({
    isSteppedComposer,
    wizard,
    composer,
    macDispatchDeviceId,
    macStepInput: {
      showMacPicker,
      isOwnDeviceDispatch: composer.isOwnDeviceDispatch,
      isMacDeviceLocked,
      isMacDevicesLoading: composer.isMacDevicesLoading,
      deviceCount: composer.macDevices.length,
    },
    writerAgent,
    onMacStepBack,
    onWorkflowStepBack,
    onWriterStepBack,
  });

  return (
    <>
      {wizard.showMacSection ? (
        <WsTestComposerMacSection
          isLibraryPlaybook={composer.isLibraryPlaybook}
          devices={composer.macDevices}
          displayNameById={composer.macDisplayNameById}
          selectedDeviceId={macDispatchDeviceId}
          isLoading={composer.isMacDevicesLoading}
          disabled={isMacDeviceLocked || composer.isOwnDeviceDispatch}
          onDeviceChange={onDeviceChange}
          onDeviceRenamed={composer.renameMacDevice}
          onDeviceDeleted={onDeviceDeleted}
        />
      ) : null}
      <WsTestComposerWizardLaterSteps
        composer={composer}
        wizard={wizard}
        writerAgent={writerAgent}
        onWriterAgentChange={onWriterAgentChange}
        isWriterAgentLocked={isWriterAgentLocked}
        isSteppedComposer={isSteppedComposer}
        macDispatchDeviceId={macDispatchDeviceId}
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        onSend={onSend}
        onClear={onClear}
        onQueue={onQueue}
        onPickerSelect={onPickerSelect}
        onWriterAgentSelect={onWriterAgentSelect}
        stepTrail={stepTrail}
      />
    </>
  );
}
