import { pickAlternateDispatchReadyDeviceId } from "@/features/agent-witch/online-wake";
import type {
  ComposerBlockedStateId,
  ResolveComposerBlockedActionInput,
} from "@/features/agent/utils/composerBlockedAction.types";

export const resolveComposerBlockedStateId = (
  input: ResolveComposerBlockedActionInput,
): ComposerBlockedStateId => {
  if (input.connectionStatus === "connecting") {
    return "ws_connecting";
  }

  if (input.devicesHadLoadError) {
    return "devices_api_error";
  }

  if (input.connectionStatus !== "connected") {
    return "ws_disconnected";
  }

  if (!input.isTeamDispatch && !input.hasDispatchReadyMac) {
    return "no_macs_online";
  }

  if (
    !input.isTeamDispatch &&
    input.hasDispatchReadyMac &&
    !input.selectedDeviceCanDispatch
  ) {
    return "selected_mac_offline";
  }

  if (
    (input.selectedGroupId.length > 0 &&
      input.selectedTargetUserId.length === 0) ||
    (input.isTeamDispatch && input.selectedCapabilityId.length === 0)
  ) {
    return "team_dispatch_incomplete";
  }

  return "form_incomplete";
};

export const pickAlternateOnlineDeviceId = (
  devices: ResolveComposerBlockedActionInput["devices"],
  selectedDeviceId: string,
): string | null =>
  pickAlternateDispatchReadyDeviceId(devices, selectedDeviceId);
