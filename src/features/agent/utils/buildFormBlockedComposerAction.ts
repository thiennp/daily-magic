import type {
  ComposerBlockedAction,
  ResolveComposerBlockedActionInput,
} from "@/features/agent/utils/composerBlockedAction.types";
import { withComposerCopyFlag } from "@/features/agent/utils/withComposerCopyFlag";

export const buildFormBlockedComposerAction = (
  stateId: "team_dispatch_incomplete" | "form_incomplete",
  input: ResolveComposerBlockedActionInput,
): ComposerBlockedAction => {
  if (stateId === "team_dispatch_incomplete") {
    return withComposerCopyFlag(
      {
        stateId,
        helperMessage:
          "Choose who receives this task and which capability to run.",
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

  return withComposerCopyFlag(
    {
      stateId,
      helperMessage: input.isWorkflowTask
        ? "Fill required questions to send, or copy the assembled prompt."
        : "Enter a task description to continue.",
      helperLinkLabel: null,
      helperLinkHref: null,
      primaryManualAction: input.canCopyPrompt ? "copy" : null,
      showQueue: false,
      showRetryDevices: false,
      showUseOnlineMac: false,
      alternateOnlineDeviceId: null,
    },
    input.canCopyPrompt,
  );
};
