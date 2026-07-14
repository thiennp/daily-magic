import type {
  ComposerBlockedAction,
  ComposerBlockedStateId,
  ResolveComposerBlockedActionInput,
} from "@/features/agent/utils/composerBlockedAction.types";
import { buildConnectionBlockedComposerAction } from "@/features/agent/utils/buildConnectionBlockedComposerAction";
import { buildFormBlockedComposerAction } from "@/features/agent/utils/buildFormBlockedComposerAction";
import { buildMacBlockedComposerAction } from "@/features/agent/utils/buildMacBlockedComposerAction";
import { pickAlternateOnlineDeviceId } from "@/features/agent/utils/resolveComposerBlockedStateId";

export const buildComposerBlockedAction = (
  stateId: ComposerBlockedStateId,
  input: ResolveComposerBlockedActionInput,
): ComposerBlockedAction => {
  if (stateId === "none") {
    return {
      stateId: "none",
      helperMessage: "",
      helperLinkLabel: null,
      helperLinkHref: null,
      primaryManualAction: null,
      showQueue: false,
      showCopy: input.canCopyPrompt,
      showRetryDevices: false,
      showUseOnlineMac: false,
      alternateOnlineDeviceId: null,
    };
  }

  if (
    stateId === "ws_connecting" ||
    stateId === "ws_disconnected" ||
    stateId === "devices_api_error"
  ) {
    return buildConnectionBlockedComposerAction(stateId, input);
  }

  if (stateId === "no_macs_online" || stateId === "selected_mac_offline") {
    return buildMacBlockedComposerAction(
      stateId,
      input,
      pickAlternateOnlineDeviceId(input.devices, input.selectedDeviceId),
    );
  }

  return buildFormBlockedComposerAction(stateId, input);
};
