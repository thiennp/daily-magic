"use client";

import SendTaskComposerPickerStep from "@/features/agent/SendTaskComposerPickerStep";
import WsTestComposerFormStep from "@/features/agent/WsTestComposerFormStep";
import WsTestComposerMacSection from "@/features/agent/WsTestComposerMacSection";
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
  readonly isSteppedComposer: boolean;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onDeviceChange: (deviceId: string) => void;
  readonly onPickerSelect: (item: SendTaskComposerPickerItem) => void;
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
  isSteppedComposer,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
  onDeviceChange,
  onPickerSelect,
  onDeviceDeleted,
}: WsTestComposerWizardStepsProps) {
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
      {wizard.showPickerStepOnly ? (
        <div className={wizard.showMacSection ? "mt-6" : undefined}>
          <SendTaskComposerPickerStep
            capabilities={composer.libraryCapabilities}
            isLoading={composer.isPrefillLoading}
            onSelect={onPickerSelect}
          />
        </div>
      ) : null}
      {wizard.showFormStep ? (
        <div
          className={
            isSteppedComposer || wizard.showMacSection ? "mt-6" : undefined
          }
        >
          <WsTestComposerFormStep
            composer={composer}
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
            showTopSpacing={wizard.showMacSection}
          />
        </div>
      ) : null}
    </>
  );
}
