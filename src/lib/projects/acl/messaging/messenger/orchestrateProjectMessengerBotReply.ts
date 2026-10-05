import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import {
  dispatchProjectMessage,
  type DispatchProjectMessageResult,
} from "@/lib/projects/acl/messaging/dispatchProjectMessage";
import { composeProjectMessengerReplySummary } from "@/lib/projects/acl/messaging/messenger/composeProjectMessengerReplySummary";
import { loadProjectMessengerParentRow } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerParentRow";
import { parseProjectMessengerReplyArgs } from "@/lib/projects/acl/messaging/messenger/parseProjectMessengerReplyArgs";
import { pickProjectMessengerReplyAddress } from "@/lib/projects/acl/messaging/messenger/pickProjectMessengerReplyAddress";

export type ProjectMessengerBotReplyResult =
  | DispatchProjectMessageResult
  | { readonly ok: false; readonly code: "invalid_arguments" | "invalid_kind" };

/**
 * Bot → its thread (chat bubble), in order:
 * 1. parse  2. caller must hold an active bot seat (humans use the composer)
 * 3. parent (optional) → reply address (member sender, else Owner)
 * 4. project_dispatch with the parent id in the summary (existing convention);
 *    dispatch keeps nickname/scope/caps, and its owner/peer activity step
 *    moves the parent's delivery state (Got it / Working / Done / Blocked).
 * A late reply after "No answer — blocked" is just a new bubble.
 * No idempotency key: same as project_dispatch today.
 */
export const orchestrateProjectMessengerBotReply = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<ProjectMessengerBotReplyResult> => {
  const parsed = parseProjectMessengerReplyArgs(input.args);
  if (!parsed.ok) return parsed;
  const seat = await getActiveProjectMembership(
    parsed.projectId,
    input.actorUserId,
  );
  if (seat === null || seat.memberKind === "human") {
    return { ok: false, code: "forbidden" };
  }
  const parent =
    parsed.inReplyTo === null
      ? null
      : await loadProjectMessengerParentRow({
          projectId: parsed.projectId,
          messageId: parsed.inReplyTo,
        });
  return dispatchProjectMessage({
    projectId: parsed.projectId,
    actorUserId: input.actorUserId,
    args: {
      ...pickProjectMessengerReplyAddress(parent),
      kind: parsed.kind,
      summary: composeProjectMessengerReplySummary(parsed),
    },
  });
};
