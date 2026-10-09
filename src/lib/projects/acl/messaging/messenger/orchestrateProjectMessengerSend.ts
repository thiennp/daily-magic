import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { checkBotIsolation } from "@/lib/projects/acl/messaging/checkBotIsolation";
import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { decideProjectMessengerSender } from "@/lib/projects/acl/messaging/messenger/decideProjectMessengerSender";
import { loadProjectMessengerBots } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";
import { parseProjectMessengerSendBody } from "@/lib/projects/acl/messaging/messenger/parseProjectMessengerSendBody";
import { pickProjectMessengerRecipients } from "@/lib/projects/acl/messaging/messenger/pickProjectMessengerRecipients";
import {
  PROJECT_MESSENGER_KIND_NEEDS_REPLY,
  PROJECT_MESSENGER_KIND_NOTE,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerSendResult } from "@/lib/projects/acl/messaging/messenger/projectMessengerSendResult.type";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { readProjectMessageWakeStep } from "@/lib/projects/acl/messaging/readProjectMessageWakeStep";
import { startProjectMessageSilenceWatch } from "@/lib/projects/acl/messaging/startProjectMessageSilenceWatch";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

/**
 * Owner or member → bot thread / Whole project, in order:
 * 1. gate (owner, or human member via the shared post gate; viewer → viewer_read_only)
 * 2. parse composer body  3. pick ONE bot (whole thread only when the
 *    project has exactly one bot, else single_recipient_required; no fan-out)
 * 4. same caps as project_dispatch
 * 5. store ONE message + one pending delivery; wake runs inside insert
 *    (same message + wake path for owner and member)
 * 6. Needs a reply → existing silence watch on accepted wakes (5 min notice,
 *    10 min blocked_silent_10m = "No answer — blocked"); no second timer
 */
export const orchestrateProjectMessengerSend = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly threadKey: string;
  readonly body: unknown;
}): Promise<ProjectMessengerSendResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) return { ok: false, code: "not_found" };
  const isOwner = project.ownerUserId === input.actorUserId;
  const seat = isOwner
    ? null
    : await getActiveProjectMembership(input.projectId, input.actorUserId);
  const decided = decideProjectMessengerSender({ isOwner, seat });
  if (!decided.ok) return decided;
  const parsed = parseProjectMessengerSendBody(input.body);
  if (!parsed.ok) return parsed;
  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  const picked = pickProjectMessengerRecipients({
    threadKey: input.threadKey,
    bots: await loadProjectMessengerBots(input.projectId),
  });
  if (!picked.ok) return picked;
  const { sender } = decided;
  // Same lock as project_dispatch: closed / isolated assistants, no owner exemption.
  const isolation = await checkBotIsolation({
    senderMembershipId: sender.senderMembershipId,
    senderUserId: input.actorUserId,
    recipientMembershipId: picked.recipients[0].membershipId,
  });
  if (!isolation.ok) return isolation;
  const rate = await assertProjectMessageDispatchRateLimits({
    projectId: input.projectId,
    senderMembershipId: sender.senderMembershipId,
    senderUserId: input.actorUserId,
  });
  if (!rate.ok) return rate;
  const single = picked.whole ? null : picked.recipients[0];
  const kind = parsed.needsReply
    ? PROJECT_MESSENGER_KIND_NEEDS_REPLY
    : PROJECT_MESSENGER_KIND_NOTE;
  const stored = await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: sender.senderMembershipId,
    senderProjectDisplayName: sender.displayName,
    senderUserId: input.actorUserId,
    toMembershipId: single?.membershipId ?? null,
    toUserId: single?.userId ?? null,
    toTeamLabel: null,
    toProjectDisplayName: single?.displayName ?? null,
    kind,
    summary: parsed.summary,
    refsJson: "{}",
    recipients: picked.recipients.map((bot) => ({
      id: bot.membershipId,
      user_id: bot.userId,
    })),
  });
  const watched = parsed.needsReply
    ? await startProjectMessageSilenceWatch({
        messageId: stored.messageId,
        senderMembershipId: sender.senderMembershipId,
        wakeResults: readProjectMessageWakeStep(stored),
        now: new Date(),
      })
    : 0;
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "msg.dispatch",
    targetUserId: single?.userId ?? null,
    detail: {
      messageId: stored.messageId,
      kind,
      recipientCount: picked.recipients.length,
      messenger: input.threadKey,
    },
  });
  return {
    ok: true,
    messageId: stored.messageId,
    threadKey: input.threadKey,
    recipientCount: picked.recipients.length,
    watchedCount: watched,
  };
};
