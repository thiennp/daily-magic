import { randomUUID } from "node:crypto";

import { getSql } from "@/lib/db";
import { scheduleProjectMessageWebhookDelivery } from "@/lib/projects/acl/webhooks/deliverProjectMessageWebhooks";

type Recipient = { readonly id: string; readonly user_id: string };

export const insertProjectMessageWithDeliveries = async (input: {
  readonly projectId: string;
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  readonly toProjectDisplayName: string | null;
  readonly kind: string;
  readonly summary: string;
  readonly refsJson: string;
  readonly recipients: readonly Recipient[];
}): Promise<string> => {
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
  // Accept = row stored. Webhook push is best-effort and must not block the sender.
  let refs: Record<string, string> = {};
  try {
    const parsed: unknown = JSON.parse(input.refsJson);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      refs = parsed as Record<string, string>;
    }
  } catch {
    refs = {};
  }
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
    recipientMembershipIds: input.recipients.map((recipient) => recipient.id),
  });
  return messageId;
};
