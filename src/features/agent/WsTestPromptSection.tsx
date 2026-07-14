"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import TeamDispatchFields from "@/features/dispatch/TeamDispatchFields";
import WsTestMacDispatchSection from "@/features/agent/WsTestMacDispatchSection";
import WsTestPromptComposerPanel from "@/features/agent/WsTestPromptComposerPanel";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPromptSectionProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
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
  onSend,
  onClear,
  onQueue,
}: WsTestPromptSectionProps) {
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

      <WsTestPromptComposerPanel
        composer={composer}
        writerAgent={writerAgent}
        onWriterAgentChange={onWriterAgentChange}
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        onSend={onSend}
        onClear={onClear}
        onQueue={onQueue}
      />
    </>
  );
}
