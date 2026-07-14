"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import DelegatedWriterAgentField from "@/features/agent/DelegatedWriterAgentField";
import WsTestComposerActions from "@/features/agent/WsTestComposerActions";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestTaskInputsSection from "@/features/agent/WsTestTaskInputsSection";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPromptComposerPanelProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
}

export default function WsTestPromptComposerPanel({
  composer,
  writerAgent,
  onWriterAgentChange,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
}: WsTestPromptComposerPanelProps) {
  const canCopyPrompt =
    composer.resolvedPrompt.trim().length > 0 &&
    composer.workflowValidationErrors.length === 0;

  return (
    <AppPanel>
      <DelegatedWriterAgentField
        writerAgent={writerAgent}
        onWriterAgentChange={onWriterAgentChange}
      />
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
      <WsTestComposerActions
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        canCopyPrompt={canCopyPrompt}
        copyText={composer.resolvedPrompt}
        sendLabel={
          composer.isTeamDispatch ? "Send to teammate" : "Send to your Mac"
        }
        isWorkflowTask={composer.isWorkflowTask}
        isTeamDispatch={composer.isTeamDispatch}
        hasOnlineMac={composer.hasOnlineMac}
        selectedDeviceIsOnline={composer.selectedDeviceIsOnline}
        devices={composer.macDevices}
        selectedDeviceId={composer.selectedDeviceId}
        devicesHadLoadError={composer.devicesHadLoadError}
        selectedGroupId={composer.selectedGroupId}
        selectedTargetUserId={composer.selectedTargetUserId}
        selectedCapabilityId={composer.selectedCapabilityId}
        onSend={onSend}
        onClear={onClear}
        onQueue={onQueue}
        onRetryDevices={() => {
          void composer.refreshMacDevices();
        }}
        onUseOnlineMac={composer.setSelectedDeviceId}
      />
    </AppPanel>
  );
}
