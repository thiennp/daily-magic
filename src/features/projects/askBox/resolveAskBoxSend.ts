import {
  ASK_BOX_ALL_KEY,
  askBoxTargetLabel,
  type AskBoxSendTarget,
} from "@/features/projects/askBox/askBoxSendTarget";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";
import { PROJECT_CHAT_DOCK_COPY } from "@/features/projects/chatDock/projectChatDockCopy.constant";
import type { MessengerTaskRefsDraft } from "@/features/projects/messenger/AwcMessengerTaskRefsPanel";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

export type AskBoxDraft = {
  readonly text: string;
  readonly to: string;
  readonly needsReply: boolean;
  readonly assignAsTask: boolean;
  readonly kind: string;
  readonly refs: MessengerTaskRefsDraft;
};

export type AskBoxSendPlan =
  | { readonly kind: "none" }
  | { readonly kind: "error"; readonly message: string }
  | {
      readonly kind: "message";
      readonly threadKey: string;
      readonly text: string;
      readonly needsReply: boolean;
      readonly successMessage: string;
    }
  | {
      readonly kind: "task";
      readonly threadKey: string;
      readonly draft: MessengerTaskDraft;
      readonly successMessage: string;
    };

/** Ask box → messenger message (any thread) or inbox dispatch task (one recipient). */
export const resolveAskBoxSend = (
  draft: AskBoxDraft,
  targets: readonly AskBoxSendTarget[],
): AskBoxSendPlan => {
  const copy = PROJECT_ASK_BOX_COPY;
  const text = draft.text.trim();
  if (text.length === 0) return { kind: "none" };
  const label = askBoxTargetLabel(targets, draft.to);
  if (!draft.assignAsTask) {
    return {
      kind: "message",
      threadKey: draft.to,
      text,
      needsReply: draft.needsReply,
      successMessage: draft.needsReply ? copy.sentTo(label) : copy.sentQuiet(label),
    };
  }
  if (targets.length === 0) return { kind: "error", message: copy.inviteFirst };
  if (draft.to === ASK_BOX_ALL_KEY) {
    return {
      kind: "error",
      message: PROJECT_CHAT_DOCK_COPY["dock.task.oneRecipient"],
    };
  }
  return {
    kind: "task",
    threadKey: draft.to,
    draft: {
      assigneeMembershipId: draft.to,
      summary: text,
      kind: draft.kind,
      refs: draft.refs,
    },
    successMessage: copy.assignedTo(label),
  };
};
