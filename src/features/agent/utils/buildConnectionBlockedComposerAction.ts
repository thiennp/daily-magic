import type {
  ComposerBlockedAction,
  ComposerManualActionId,
  ResolveComposerBlockedActionInput,
} from "@/features/agent/utils/composerBlockedAction.types";
import { withComposerCopyFlag } from "@/features/agent/utils/withComposerCopyFlag";

export const buildConnectionBlockedComposerAction = (
  stateId: "ws_connecting" | "ws_disconnected" | "devices_api_error",
  input: ResolveComposerBlockedActionInput,
): ComposerBlockedAction => {
  if (stateId === "ws_connecting") {
    return withComposerCopyFlag(
      {
        stateId,
        helperMessage:
          "Connecting this page to Agent Witch in your browser. Send will unlock when the dashboard connection is ready (this is not your Mac’s presence status).",
        helperLinkLabel: null,
        helperLinkHref: null,
        primaryManualAction: null,
        showQueue: false,
        showRetryDevices: false,
        showUseOnlineMac: false,
        alternateOnlineDeviceId: null,
      },
      input.canCopyPrompt,
    );
  }

  if (stateId === "devices_api_error") {
    return withComposerCopyFlag(
      {
        stateId,
        helperMessage:
          "Could not refresh your Mac list. The last known devices are still shown.",
        helperLinkLabel: null,
        helperLinkHref: null,
        primaryManualAction: "retry_devices",
        showQueue: false,
        showRetryDevices: true,
        showUseOnlineMac: false,
        alternateOnlineDeviceId: null,
      },
      input.canCopyPrompt,
    );
  }

  const primaryManualAction: ComposerManualActionId | null = input.canCopyPrompt
    ? "queue"
    : null;

  return withComposerCopyFlag(
    {
      stateId,
      helperMessage:
        "needs this page connected to the server. Reconnect or refresh, then try again.",
      helperLinkLabel: null,
      helperLinkHref: null,
      primaryManualAction,
      showQueue: input.canCopyPrompt,
      showRetryDevices: false,
      showUseOnlineMac: false,
      alternateOnlineDeviceId: null,
    },
    input.canCopyPrompt,
  );
};
