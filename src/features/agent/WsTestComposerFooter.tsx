"use client";

import WsTestComposerActions from "@/features/agent/WsTestComposerActions";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

interface WsTestComposerFooterProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly macDispatchDeviceId: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
}

export default function WsTestComposerFooter({
  composer,
  macDispatchDeviceId,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
}: WsTestComposerFooterProps) {
  const canCopyPrompt =
    composer.resolvedPrompt.trim().length > 0 &&
    composer.workflowValidationErrors.length === 0;
  return (
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
      hasDispatchReadyMac={composer.hasDispatchReadyMac}
      selectedDeviceCanDispatch={composer.selectedDeviceCanDispatch}
      devices={composer.macDevices}
      selectedDeviceId={macDispatchDeviceId}
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
  );
}
