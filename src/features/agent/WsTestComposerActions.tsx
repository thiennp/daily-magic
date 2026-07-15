"use client";

import { useMemo } from "react";

import ComposerBlockedActionButtons from "@/features/agent/ComposerBlockedActionButtons";
import WsTestComposerHelperText from "@/features/agent/WsTestComposerHelperText";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { resolveComposerBlockedAction } from "@/features/agent/utils/resolveComposerBlockedAction";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface WsTestComposerActionsProps {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly canCopyPrompt: boolean;
  readonly copyText: string;
  readonly sendLabel: string;
  readonly isWorkflowTask: boolean;
  readonly isTeamDispatch: boolean;
  readonly hasDispatchReadyMac: boolean;
  readonly selectedDeviceCanDispatch: boolean;
  readonly devices: readonly {
    readonly id: string;
    readonly isConnected: boolean;
    readonly isOnline: boolean;
  }[];
  readonly selectedDeviceId: string;
  readonly devicesHadLoadError: boolean;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly selectedCapabilityId: string;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onRetryDevices: () => void;
  readonly onUseOnlineMac: (deviceId: string) => void;
}

export default function WsTestComposerActions(
  props: WsTestComposerActionsProps,
) {
  const { copied, copy } = useCopyToClipboard();

  const blockedAction = useMemo(
    () =>
      resolveComposerBlockedAction({
        connectionStatus: props.connectionStatus,
        isTeamDispatch: props.isTeamDispatch,
        isWorkflowTask: props.isWorkflowTask,
        canCopyPrompt: props.canCopyPrompt,
        hasDispatchReadyMac: props.hasDispatchReadyMac,
        selectedDeviceCanDispatch: props.selectedDeviceCanDispatch,
        devices: props.devices,
        selectedDeviceId: props.selectedDeviceId,
        devicesHadLoadError: props.devicesHadLoadError,
        isSendDisabled: props.isSendDisabled,
        selectedGroupId: props.selectedGroupId,
        selectedTargetUserId: props.selectedTargetUserId,
        selectedCapabilityId: props.selectedCapabilityId,
        manageMacsHref: "/#your-setup",
      }),
    [props],
  );

  return (
    <>
      <ComposerBlockedActionButtons
        blockedAction={blockedAction}
        isSendDisabled={props.isSendDisabled}
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
      <WsTestComposerHelperText blockedAction={blockedAction} />
    </>
  );
}
