"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import TeamDispatchFields from "@/features/dispatch/TeamDispatchFields";
import DelegatedWriterAgentField from "@/features/agent/DelegatedWriterAgentField";
import WsTestComposerActions from "@/features/agent/WsTestComposerActions";
import WsTestMacDispatchSection from "@/features/agent/WsTestMacDispatchSection";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestTaskInputsSection from "@/features/agent/WsTestTaskInputsSection";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPromptSectionProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly canQueue: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
}

export default function WsTestPromptSection({
  composer,
  writerAgent,
  onWriterAgentChange,
  connectionStatus,
  isSendDisabled,
  canQueue,
  onSend,
  onClear,
  onQueue,
}: WsTestPromptSectionProps) {
  const canCopyPrompt =
    composer.resolvedPrompt.trim().length > 0 &&
    composer.workflowValidationErrors.length === 0;
  const showMacPicker = !composer.isTeamDispatch;

  return (
    <>
      {!composer.isLibraryPlaybook ? (
        <AppPanel>
          <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
            Who receives this task
          </h2>
          <div className="mt-4">
            <TeamDispatchFields
              selectedGroupId={composer.selectedGroupId}
              selectedTargetUserId={composer.selectedTargetUserId}
              selectedCapabilityId={composer.selectedCapabilityId}
              onGroupChange={composer.setSelectedGroupId}
              onTargetChange={composer.setSelectedTargetUserId}
              onCapabilityChange={composer.setSelectedCapabilityId}
            />
          </div>
        </AppPanel>
      ) : null}

      {showMacPicker ? (
        <WsTestMacDispatchSection
          isLibraryPlaybook={composer.isLibraryPlaybook}
          macDevices={composer.macDevices}
          macDisplayNameById={composer.macDisplayNameById}
          selectedDeviceId={composer.selectedDeviceId}
          isMacDevicesLoading={composer.isMacDevicesLoading}
          onDeviceChange={composer.setSelectedDeviceId}
          onDeviceRenamed={composer.renameMacDevice}
        />
      ) : null}

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
          canQueue={canQueue}
          copyText={composer.resolvedPrompt}
          sendLabel={
            composer.isTeamDispatch ? "Send to teammate" : "Send to your Mac"
          }
          isWorkflowTask={composer.isWorkflowTask}
          isTeamDispatch={composer.isTeamDispatch}
          hasOnlineMac={composer.hasOnlineMac}
          selectedDeviceIsOnline={composer.selectedDeviceIsOnline}
          onSend={onSend}
          onClear={onClear}
          onQueue={onQueue}
        />
      </AppPanel>
    </>
  );
}
