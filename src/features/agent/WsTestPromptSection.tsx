"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import SendTaskLibraryPicker from "@/features/agent/SendTaskLibraryPicker";
import TeamDispatchFields from "@/features/dispatch/TeamDispatchFields";
import WsTestPromptComposerPanel from "@/features/agent/WsTestPromptComposerPanel";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { revokePairedDevice } from "@/features/agent-witch/utils/pairedDevicesApi";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPromptSectionProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly isWriterAgentLocked: boolean;
  readonly isMacDeviceLocked: boolean;
  readonly macDispatchDeviceId: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly isSteppedComposer: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
}

export default function WsTestPromptSection({
  composer,
  writerAgent,
  onWriterAgentChange,
  isWriterAgentLocked,
  isMacDeviceLocked,
  macDispatchDeviceId,
  connectionStatus,
  isSendDisabled,
  isSteppedComposer,
  onSend,
  onClear,
  onQueue,
  onStartWriterAgent,
}: WsTestPromptSectionProps) {
  return (
    <>
      {!isSteppedComposer ? (
        <AppPanel>
          <SendTaskLibraryPicker
            capabilities={composer.libraryCapabilities}
            selectedCapabilityId={composer.selectedLibraryCapabilityId}
            isLoading={composer.isPrefillLoading}
            onSelect={composer.setSelectedLibraryCapabilityId}
          />
        </AppPanel>
      ) : null}

      {!composer.isLibraryPlaybook && !composer.isOwnDeviceDispatch ? (
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

      <WsTestPromptComposerPanel
        composer={composer}
        writerAgent={writerAgent}
        onWriterAgentChange={onWriterAgentChange}
        isWriterAgentLocked={isWriterAgentLocked}
        isMacDeviceLocked={isMacDeviceLocked}
        macDispatchDeviceId={macDispatchDeviceId}
        showMacPicker={!composer.isTeamDispatch}
        isSteppedComposer={isSteppedComposer}
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        onSend={onSend}
        onClear={onClear}
        onQueue={onQueue}
        onStartWriterAgent={onStartWriterAgent}
        onDeviceDeleted={async (deviceId) => {
          await revokePairedDevice(deviceId);
        }}
      />
    </>
  );
}
