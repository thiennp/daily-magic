import { randomUUID } from "node:crypto";

import { getSql } from "@/lib/db";
import { parseProjectMessageRefsJson } from "@/lib/projects/acl/messaging/parseProjectMessageRefsJson";
import { scheduleProjectMessageWebhookDelivery } from "@/lib/projects/acl/webhooks/deliverProjectMessageWebhooks";
import {
  wakeProjectGrokRoutineWebhooks,
  type ProjectGrokRoutineWakeResult,
} from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

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
  const refs = parseProjectMessageRefsJson(input.refsJson);
  const recipientMembershipIds = input.recipients.map(
    (recipient) => recipient.id,
  );
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
  let wakeResults: readonly ProjectGrokRoutineWakeResult[] = [];
  try {
    wakeResults = await wakeProjectGrokRoutineWebhooks({
      projectId: input.projectId,
      messageId,
      summary: input.summary,
      fromMembershipId: input.senderMembershipId,
      fromProjectDisplayName:
        input.senderMembershipId === null
          ? "Owner"
          : (input.senderProjectDisplayName ?? null),
      recipientMembershipIds,
    });
  } catch (error: unknown) {
    console.error("project grok routine webhook wake failed", {
      messageId,
      error: error instanceof Error ? error.message : "wake_failed",
    });
  }
  return { messageId, wakeResults };
};
