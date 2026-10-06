import {
  isMacPresenceTierHardOffline,
  resolveMacPresenceTier,
} from "@/features/agent-witch/online-wake";
import type {
  ComposerBlockedAction,
  ComposerManualActionId,
  ResolveComposerBlockedActionInput,
} from "@/features/agent/utils/composerBlockedAction.types";
import { withComposerCopyFlag } from "@/features/agent/utils/withComposerCopyFlag";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";

export const buildMacBlockedComposerAction = (
  stateId: "no_macs_online" | "selected_mac_offline",
  input: ResolveComposerBlockedActionInput,
  alternateOnlineDeviceId: string | null,
): ComposerBlockedAction => {
  if (stateId === "no_macs_online") {
    const primaryManualAction: ComposerManualActionId = input.canCopyPrompt
      ? "queue"
      : "manage_macs";

    return withComposerCopyFlag(
      {
        stateId,
        helperMessage: MAC_OFFLINE_FOR_ACCOUNT_ERROR,
        helperLinkLabel: "Connect or manage computers",
        helperLinkHref: input.manageMacsHref,
        primaryManualAction,
        showQueue: input.canCopyPrompt,
        showRetryDevices: false,
        showUseOnlineMac: false,
        alternateOnlineDeviceId: null,
      },
      input.canCopyPrompt,
    );
  }

  const hasAlternate = alternateOnlineDeviceId !== null;
  const selectedDevice = input.devices.find(
    (device) => device.id === input.selectedDeviceId,
  );
  const selectedTier =
    selectedDevice !== undefined
      ? resolveMacPresenceTier(selectedDevice)
      : "offline";
  const selectedOnOtherInstance = selectedTier === "live_other_instance";
  const selectedHardOffline = isMacPresenceTierHardOffline(selectedTier);
  const helperMessage = selectedOnOtherInstance
    ? "This computer is reconnecting on another server (common right after deploy). Wait a few seconds, then try New task again."
    : selectedHardOffline
      ? hasAlternate
        ? "The selected computer is offline. Switch to a connected computer or start Agent Witch on this computer."
        : "The selected computer is offline. Start Agent Witch on your computer to run a New task."
      : selectedTier === "recent"
        ? hasAlternate
          ? "The selected computer was seen recently and may reconnect on the next check-in. Switch to a connected computer or wait."
          : "The selected computer was seen recently and may reconnect on the next check-in."
        : hasAlternate
          ? "The selected computer is not connected. Switch to a connected computer or wait for it to reconnect."
          : "The selected computer is not connected. Wait for it to reconnect.";

  return withComposerCopyFlag(
    {
      stateId,
      helperMessage,
      helperLinkLabel: null,
      helperLinkHref: null,
      primaryManualAction: hasAlternate ? "use_online_mac" : null,
      showQueue: false,
      showRetryDevices: false,
      showUseOnlineMac: hasAlternate,
      alternateOnlineDeviceId,
    },
    input.canCopyPrompt,
  );
};
