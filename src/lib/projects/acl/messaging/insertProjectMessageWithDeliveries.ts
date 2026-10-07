import { randomUUID } from "node:crypto";

import { getSql } from "@/lib/db";
import { buildProjectComputerHistoryMessage } from "@/lib/projects/acl/messaging/buildProjectComputerHistoryMessage";
import { filterProjectWakeRecipientIds } from "@/lib/projects/acl/messaging/loadProjectPollDeliveryMembershipIds";
import { insertProjectMessageRow } from "@/lib/projects/acl/messaging/insertProjectMessageRow";
import { notifyProjectComputerOfMessage } from "@/lib/projects/acl/messaging/notifyProjectComputerOfMessage";
import { parseProjectMessageRefsJson } from "@/lib/projects/acl/messaging/parseProjectMessageRefsJson";
import { pruneAfterProjectMessageInsert } from "@/lib/projects/acl/messaging/pruneAfterProjectMessageInsert";
import { wakeProjectMessageGrokRoutines } from "@/lib/projects/acl/messaging/wakeProjectMessageGrokRoutines";
import { scheduleProjectMessageWebhookDelivery } from "@/lib/projects/acl/webhooks/scheduleProjectMessageWebhookDelivery";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

export type InsertProjectMessageWithDeliveriesResult = {
  readonly messageId: string;
  readonly wakeResults: readonly ProjectGrokRoutineWakeResult[];
};

type Recipient = { readonly id: string; readonly user_id: string };

export const insertProjectMessageWithDeliveries = async (input: {
  readonly projectId: string;
  readonly senderMembershipId: string | null;
  readonly senderProjectDisplayName?: string | null;
  readonly senderUserId: string;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  readonly toProjectDisplayName: string | null;
  readonly kind: string;
  readonly summary: string;
  readonly refsJson: string;
  readonly recipients: readonly Recipient[];
}): Promise<InsertProjectMessageWithDeliveriesResult> => {
  const sql = getSql();
  const messageId = randomUUID();
  const createdAt = new Date().toISOString();
  const { chatKey } = await insertProjectMessageRow({
    messageId,
    projectId: input.projectId,
    senderMembershipId: input.senderMembershipId,
    senderUserId: input.senderUserId,
    toMembershipId: input.toMembershipId,
    toUserId: input.toUserId,
    toTeamLabel: input.toTeamLabel,
    toProjectDisplayName: input.toProjectDisplayName,
    kind: input.kind,
    summary: input.summary,
    refsJson: input.refsJson,
  });
  for (const recipient of input.recipients) {
    await sql`
      INSERT INTO project_message_deliveries (
        id, message_id, membership_id, attempt, status
      )
      VALUES (
        ${randomUUID()},
        ${messageId},
        ${recipient.id},
        0,
        'pending'
      )
      ON CONFLICT DO NOTHING
    `;
  }
  const refs = parseProjectMessageRefsJson(input.refsJson);
  const recipientMembershipIds = await filterProjectWakeRecipientIds({
    projectId: input.projectId,
    membershipIds: input.recipients.map((recipient) => recipient.id),
  });
  scheduleProjectMessageWebhookDelivery({
    payload: {
      projectId: input.projectId,
      messageId,
      kind: input.kind,
      summary: input.summary,
      refs,
      fromMembershipId: input.senderMembershipId,
      createdAt,
    },
    recipientMembershipIds,
  });
  const wakeResults = await wakeProjectMessageGrokRoutines({
    projectId: input.projectId,
    messageId,
    summary: input.summary,
    senderMembershipId: input.senderMembershipId,
    senderProjectDisplayName: input.senderProjectDisplayName,
    recipientMembershipIds,
  });
  await notifyProjectComputerOfMessage({
    projectId: input.projectId,
    message: buildProjectComputerHistoryMessage({
      ...input,
      messageId,
      createdAt,
      refs,
    }),
  });
  await pruneAfterProjectMessageInsert({
    projectId: input.projectId,
    chatKey,
  });
  return { messageId, wakeResults };
};
