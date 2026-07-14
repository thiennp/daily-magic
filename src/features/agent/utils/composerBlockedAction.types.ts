import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

export type ComposerBlockedStateId =
  | "none"
  | "ws_connecting"
  | "ws_disconnected"
  | "devices_api_error"
  | "no_macs_online"
  | "selected_mac_offline"
  | "team_dispatch_incomplete"
  | "form_incomplete";

export type ComposerManualActionId =
  "queue" | "copy" | "manage_macs" | "use_online_mac" | "retry_devices";

export interface ComposerBlockedAction {
  readonly stateId: ComposerBlockedStateId;
  readonly helperMessage: string;
  readonly helperLinkLabel: string | null;
  readonly helperLinkHref: string | null;
  readonly primaryManualAction: ComposerManualActionId | null;
  readonly showQueue: boolean;
  readonly showCopy: boolean;
  readonly showRetryDevices: boolean;
  readonly showUseOnlineMac: boolean;
  readonly alternateOnlineDeviceId: string | null;
}

export interface ResolveComposerBlockedActionInput {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isTeamDispatch: boolean;
  readonly isWorkflowTask: boolean;
  readonly canCopyPrompt: boolean;
  readonly hasOnlineMac: boolean;
  readonly selectedDeviceIsOnline: boolean;
  readonly devices: readonly {
    readonly id: string;
    readonly isOnline: boolean;
  }[];
  readonly selectedDeviceId: string;
  readonly devicesHadLoadError: boolean;
  readonly isSendDisabled: boolean;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly selectedCapabilityId: string;
  readonly manageMacsHref: string;
}
