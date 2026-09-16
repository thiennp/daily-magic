"use client";

import WsTestComposerActions from "@/features/agent/WsTestComposerActions";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

interface WsTestComposerFooterProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly macDispatchDeviceId: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly sendLabel?: string;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
}

export default function WsTestComposerFooter({
  composer,
  macDispatchDeviceId,
  connectionStatus,
  isSendDisabled,
  sendLabel,
  onSend,
  onClear,
  onQueue,
}: WsTestComposerFooterProps) {
  const canCopyPrompt =
    composer.resolvedPrompt.trim().length > 0 &&
    composer.workflowValidationErrors.length === 0;
  const focusPrompt = (): void => {
    const promptField = document.querySelector<HTMLTextAreaElement>(
      "[data-send-task-prompt]",
    );
    promptField?.focus();
  };
  return (
    <WsTestComposerActions
      connectionStatus={connectionStatus}
      isSendDisabled={isSendDisabled}
      canCopyPrompt={canCopyPrompt}
      copyText={composer.resolvedPrompt}
      sendLabel={
        sendLabel ??
        (composer.isTeamDispatch ? "Send to teammate" : "Send to your Mac")
      }
      isWorkflowTask={composer.isWorkflowTask}
      isTeamDispatch={composer.isTeamDispatch}
      isLibraryPlaybook={composer.isLibraryPlaybook}
      resolvedPrompt={composer.resolvedPrompt}
      workflowValidationErrors={composer.workflowValidationErrors}
      hasDispatchReadyMac={composer.hasDispatchReadyMac}
      selectedDeviceCanDispatch={composer.selectedDeviceCanDispatch}
      devices={composer.macDevices}
      selectedDeviceId={macDispatchDeviceId}
      devicesHadLoadError={composer.devicesHadLoadError}
      serverInstallBundleVersion={composer.serverInstallBundleVersion}
      onFocusPrompt={focusPrompt}
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
