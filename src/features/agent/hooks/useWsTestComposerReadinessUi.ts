"use client";

import { useMemo } from "react";

import type { MacPresenceTier } from "@/features/agent-witch/online-wake";
import {
  resolveSendReadinessBanner,
  resolveSendReadinessSendDisabledReason,
} from "@/features/agent/send-readiness/resolveSendReadinessBanner";
import type { SendReadinessBannerModel } from "@/features/agent/send-readiness/sendReadinessBanner.types";
import type { ComposerBlockedAction } from "@/features/agent/utils/composerBlockedAction.types";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

export const useWsTestComposerReadinessUi = (input: {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly isTeamDispatch: boolean;
  readonly isWorkflowTask: boolean;
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
  readonly serverInstallBundleVersion: string | null;
  readonly blockedAction: ComposerBlockedAction;
}): {
  readonly readinessBanner: SendReadinessBannerModel | null;
  readonly sendDisabledReason: string | null;
  readonly showMacReadyChip: boolean;
  readonly showLegacyHelper: boolean;
} => {
  const browserConnectionReady = input.connectionStatus === "connected";

  const readinessBanner = useMemo(
    () =>
      resolveSendReadinessBanner({
        isTeamDispatch: input.isTeamDispatch,
        browserConnectionReady,
        selectedDeviceId: input.selectedDeviceId,
        devices: input.devices,
        serverInstallBundleVersion: input.serverInstallBundleVersion,
        formPromptEmpty: input.resolvedPrompt.trim().length === 0,
        isWorkflowTask: input.isWorkflowTask,
        workflowValidationErrors: input.workflowValidationErrors,
        isLibraryPlaybook: input.isLibraryPlaybook,
      }),
    [input, browserConnectionReady],
  );

  const sendDisabledReason =
    resolveSendReadinessSendDisabledReason(readinessBanner) ??
    (input.isSendDisabled && input.blockedAction.helperMessage.length > 0
      ? input.blockedAction.helperMessage
      : null);

  const showMacReadyChip =
    !input.isTeamDispatch &&
    browserConnectionReady &&
    readinessBanner === null &&
    input.selectedDeviceCanDispatch;

  return {
    readinessBanner,
    sendDisabledReason,
    showMacReadyChip,
    showLegacyHelper: readinessBanner === null,
  };
};
