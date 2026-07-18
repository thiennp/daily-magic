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
        helperLinkLabel: "Connect or manage Macs",
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

  return withComposerCopyFlag(
    {
      stateId,
      helperMessage: hasAlternate
        ? "The selected Mac is not connected. Switch to a connected Mac or wait for it to reconnect."
        : "The selected Mac is not connected. Wait for it to reconnect.",
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
