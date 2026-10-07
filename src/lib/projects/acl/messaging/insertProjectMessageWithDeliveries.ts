import { randomUUID } from "node:crypto";

import { getSql } from "@/lib/db";
import { buildProjectComputerHistoryMessage } from "@/lib/projects/acl/messaging/buildProjectComputerHistoryMessage";
import { filterProjectWakeRecipientIds } from "@/lib/projects/acl/messaging/loadProjectPollDeliveryMembershipIds";
import { notifyProjectComputerOfMessage } from "@/lib/projects/acl/messaging/notifyProjectComputerOfMessage";
import { parseProjectMessageRefsJson } from "@/lib/projects/acl/messaging/parseProjectMessageRefsJson";
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
  await sql`
    INSERT INTO project_messages (
      id, project_id, sender_membership_id, sender_user_id,
      to_membership_id, to_user_id, to_team_label, to_project_display_name,
      kind, summary, refs
    )
    VALUES (
      ${messageId},
      ${input.projectId},
      ${input.senderMembershipId},
      ${input.senderUserId},
      ${input.toMembershipId},
      ${input.toUserId},
      ${input.toTeamLabel},
      ${input.toProjectDisplayName},
      ${input.kind},
      ${input.summary},
      ${input.refsJson}::jsonb
    )
  `;
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
  // Accept = row stored. HMAC push stays best-effort. Grok wake is recorded first.
  // delivery_mode=poll recipients keep their pending row but get no wake.
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
    kind: input.kind,
    summary: input.summary,
    senderMembershipId: input.senderMembershipId,
    senderProjectDisplayName: input.senderProjectDisplayName,
    recipientMembershipIds,
  });
  // History on: also tell the owner's project computer (no-op when off).
  await notifyProjectComputerOfMessage({
    projectId: input.projectId,
    message: buildProjectComputerHistoryMessage({
      ...input,
      messageId,
      createdAt,
      refs,
    }),
  });
  return { messageId, wakeResults };
};
