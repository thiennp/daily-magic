import type {
  ComposerBlockedAction,
  ResolveComposerBlockedActionInput,
} from "@/features/agent/utils/composerBlockedAction.types";
import { buildComposerBlockedAction } from "@/features/agent/utils/buildComposerBlockedAction";
import { resolveComposerBlockedStateId } from "@/features/agent/utils/resolveComposerBlockedStateId";

const noBlockedAction = (canCopyPrompt: boolean): ComposerBlockedAction => ({
  stateId: "none",
  helperMessage: "",
  helperLinkLabel: null,
  helperLinkHref: null,
  primaryManualAction: null,
  showQueue: false,
  showCopy: canCopyPrompt,
  showRetryDevices: false,
  showUseOnlineMac: false,
  alternateOnlineDeviceId: null,
});

export const resolveComposerBlockedAction = (
  input: ResolveComposerBlockedActionInput,
): ComposerBlockedAction => {
  if (!input.isSendDisabled) {
    return noBlockedAction(input.canCopyPrompt);
  }

  return buildComposerBlockedAction(
    resolveComposerBlockedStateId(input),
    input,
  );
};
