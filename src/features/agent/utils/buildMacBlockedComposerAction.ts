import type {
  ComposerBlockedAction,
  ComposerManualActionId,
  ResolveComposerBlockedActionInput,
} from "@/features/agent/utils/composerBlockedAction.types";
import { withComposerCopyFlag } from "@/features/agent/utils/withComposerCopyFlag";

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
        helperMessage:
          "No Mac is online. Open Agent Witch on a connected Mac — it checks in about every 30 seconds.",
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
        ? "The selected Mac is offline. Switch to an online Mac or wait for it to reconnect."
        : "The selected Mac is offline. Wait for it to reconnect.",
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
