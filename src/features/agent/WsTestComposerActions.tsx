"use client";

import ComposerBlockedActionButtons from "@/features/agent/ComposerBlockedActionButtons";
import WsTestComposerHelperText from "@/features/agent/WsTestComposerHelperText";
import { useWsTestComposerActionsModel } from "@/features/agent/hooks/useWsTestComposerActionsModel";
import type { MacPresenceTier } from "@/features/agent-witch/online-wake";
import SendReadinessBanner from "@/features/agent/send-readiness/SendReadinessBanner";
import SendReadinessMacReadyChip from "@/features/agent/send-readiness/SendReadinessMacReadyChip";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface WsTestComposerActionsProps {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly canCopyPrompt: boolean;
  readonly copyText: string;
  readonly sendLabel: string;
  readonly isWorkflowTask: boolean;
  readonly isTeamDispatch: boolean;
  readonly isLibraryPlaybook: boolean;
  readonly resolvedPrompt: string;
  readonly workflowValidationErrors: readonly string[];
  readonly hasDispatchReadyMac: boolean;
  readonly selectedDeviceCanDispatch: boolean;
  readonly devices: readonly {
    readonly id: string;
    readonly isConnected: boolean;
    readonly isOnline: boolean;
    readonly presenceTier?: MacPresenceTier;
    readonly isDispatchReady?: boolean;
    readonly installBundleVersion?: string | null;
  }[];
  readonly selectedDeviceId: string;
  readonly devicesHadLoadError: boolean;
  readonly serverInstallBundleVersion: string | null;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly selectedCapabilityId: string;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onRetryDevices: () => void;
  readonly onUseOnlineMac: (deviceId: string) => void;
  readonly onFocusPrompt: () => void;
}

export default function WsTestComposerActions(
  props: WsTestComposerActionsProps,
) {
  const { copied, copy } = useCopyToClipboard();
  const { blockedAction, readinessUi } = useWsTestComposerActionsModel(props);

  return (
    <>
      {readinessUi.readinessBanner !== null ? (
        <SendReadinessBanner
          banner={readinessUi.readinessBanner}
          onRetry={props.onRetryDevices}
          onFocusPrompt={props.onFocusPrompt}
        />
      ) : readinessUi.showMacReadyChip ? (
        <SendReadinessMacReadyChip />
      ) : null}
      <ComposerBlockedActionButtons
        blockedAction={blockedAction}
        isSendDisabled={props.isSendDisabled}
        sendDisabledReason={readinessUi.sendDisabledReason}
        sendLabel={props.sendLabel}
        copied={copied}
        onSend={props.onSend}
        onClear={props.onClear}
        onCopy={() => {
          void copy(props.copyText);
        }}
        onQueue={props.onQueue}
        onUseOnlineMac={() => {
          if (blockedAction.alternateOnlineDeviceId) {
            props.onUseOnlineMac(blockedAction.alternateOnlineDeviceId);
          }
        }}
        onRetryDevices={props.onRetryDevices}
      />
      {readinessUi.showLegacyHelper ? (
        <WsTestComposerHelperText blockedAction={blockedAction} />
      ) : null}
    </>
  );
}
