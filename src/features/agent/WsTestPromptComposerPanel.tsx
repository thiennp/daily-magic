"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import DelegatedWriterAgentField from "@/features/agent/DelegatedWriterAgentField";
import WsTestComposerFooter from "@/features/agent/WsTestComposerFooter";
import WsTestComposerMacSection from "@/features/agent/WsTestComposerMacSection";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestTaskInputsSection from "@/features/agent/WsTestTaskInputsSection";
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
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onDeviceDeleted?: (deviceId: string) => void | Promise<void>;
}

export default function WsTestPromptComposerPanel({
  composer,
  writerAgent,
  onWriterAgentChange,
  isWriterAgentLocked,
  isMacDeviceLocked,
  macDispatchDeviceId,
  showMacPicker,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
  onDeviceDeleted,
}: WsTestPromptComposerPanelProps) {
  return (
    <AppPanel>
      {showMacPicker ? (
        <WsTestComposerMacSection
          isLibraryPlaybook={composer.isLibraryPlaybook}
          devices={composer.macDevices}
          displayNameById={composer.macDisplayNameById}
          selectedDeviceId={macDispatchDeviceId}
          isLoading={composer.isMacDevicesLoading}
          disabled={isMacDeviceLocked}
          onDeviceChange={composer.setSelectedDeviceId}
          onDeviceRenamed={composer.renameMacDevice}
          onDeviceDeleted={onDeviceDeleted}
        />
      ) : null}
      <div className={showMacPicker ? "mt-6" : undefined}>
        <DelegatedWriterAgentField
          writerAgent={writerAgent}
          onWriterAgentChange={onWriterAgentChange}
          disabled={isWriterAgentLocked}
        />
      </div>
      <div className="mt-6">
        <WsTestTaskInputsSection
          isWorkflowTask={composer.isWorkflowTask}
          useMobileStepper={
            composer.isLibraryPlaybook && composer.isWorkflowTask
          }
          prompt={composer.prompt}
          workflowFields={composer.workflowFields}
          workflowFieldValues={composer.workflowFieldValues}
          workflowValidationErrors={composer.workflowValidationErrors}
          onPromptChange={composer.setPrompt}
          onWorkflowFieldChange={composer.onWorkflowFieldChange}
        />
      </div>
      <WsTestComposerFooter
        composer={composer}
        macDispatchDeviceId={macDispatchDeviceId}
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        onSend={onSend}
        onClear={onClear}
        onQueue={onQueue}
      />
    </AppPanel>
  );
}
