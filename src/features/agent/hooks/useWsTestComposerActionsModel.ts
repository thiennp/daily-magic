"use client";

import { useMemo } from "react";

import { useWsTestComposerReadinessUi } from "@/features/agent/hooks/useWsTestComposerReadinessUi";
import type { MacPresenceTier } from "@/features/agent-witch/online-wake";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { resolveComposerBlockedAction } from "@/features/agent/utils/resolveComposerBlockedAction";

export const useWsTestComposerActionsModel = (props: {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly canCopyPrompt: boolean;
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
}) => {
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

  const readinessUi = useWsTestComposerReadinessUi({
    connectionStatus: props.connectionStatus,
    isSendDisabled: props.isSendDisabled,
    isTeamDispatch: props.isTeamDispatch,
    isWorkflowTask: props.isWorkflowTask,
    isLibraryPlaybook: props.isLibraryPlaybook,
    resolvedPrompt: props.resolvedPrompt,
    workflowValidationErrors: props.workflowValidationErrors,
    hasDispatchReadyMac: props.hasDispatchReadyMac,
    selectedDeviceCanDispatch: props.selectedDeviceCanDispatch,
    devices: props.devices,
    selectedDeviceId: props.selectedDeviceId,
    serverInstallBundleVersion: props.serverInstallBundleVersion,
    blockedAction,
  });

  return { blockedAction, readinessUi };
};
