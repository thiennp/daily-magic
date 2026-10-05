import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { dispatchProjectInboxMessage } from "@/features/projects/access/inbox/utils/dispatchProjectInboxMessage";
import { mapInboxDispatchError } from "@/features/projects/access/inbox/utils/mapInboxDispatchError";
import { validateMessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

export type SendMessengerTaskResult =
  | { readonly ok: true; readonly messageId: string }
  | { readonly ok: false; readonly errorMessage: string; readonly code?: string };

/**
 * Activity task mode → real POST /api/projects/:id/inbox/dispatch
 * (summary≤200, allowlisted refs≤768B, default kind task.assign server-side).
 */
export const sendMessengerTask = async (input: {
  readonly projectId: string;
  readonly draft: MessengerTaskDraft;
}): Promise<SendMessengerTaskResult> => {
  const parsed = validateMessengerTaskDraft(input.draft);
  if (!parsed.ok) {
    const errorMessage =
      parsed.code === "assignee_required"
        ? AWC_PROJECT_MESSENGER_COPY.taskAssigneeRequired
        : parsed.code === "summary_required" ||
            parsed.code === "summary_too_large"
          ? AWC_PROJECT_MESSENGER_COPY.taskSummaryRequired
          : AWC_PROJECT_MESSENGER_COPY.taskSendFailed;
    return { ok: false, errorMessage, code: parsed.code };
  }
  const result = await dispatchProjectInboxMessage({
    projectId: input.projectId,
    toMembershipId: parsed.assigneeMembershipId,
    summary: parsed.summary,
    kind: parsed.kind,
    refs: parsed.refs,
  });
  if (result.ok) {
    return { ok: true, messageId: result.messageId };
  }
  return {
    ok: false,
    errorMessage: mapInboxDispatchError(result),
    code: result.code ?? undefined,
  };
};
