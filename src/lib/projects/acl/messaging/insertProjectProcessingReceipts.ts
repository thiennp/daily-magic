import { asRowArray, getSql } from "@/lib/db";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import {
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

const processingReceiptSummary = (originalMessageId: string): string =>
  `processing ${originalMessageId}`.slice(0, PROJECT_MESSAGE_SUMMARY_MAX_CHARS);

const acceptedWakeRecipients = (input: {
  readonly senderMembershipId: string;
  readonly recipients: readonly DispatchRecipient[];
  readonly wakeResults: readonly ProjectGrokRoutineWakeResult[];
}): readonly DispatchRecipient[] => {
  const recipientById = new Map(
    input.recipients.flatMap((recipient) =>
      recipient.id === null ? [] : [[recipient.id, recipient] as const],
    ),
  );
  return input.wakeResults.flatMap((wake) => {
    if (wake.result !== "http_200") {
      return [];
    }
    if (wake.membershipId === input.senderMembershipId) {
      return [];
    }
    const recipient = recipientById.get(wake.membershipId);
    if (recipient === undefined || recipient.id === null) {
      return [];
    }
    return [recipient];
  });
};

/** One receipt per accepted peer wake. Direct insert, so a receipt cannot spawn another. */
export const insertProjectProcessingReceipts = async (input: {
  readonly projectId: string;
  readonly senderMembershipId: string;
  readonly senderUserId: string;
  readonly senderProjectDisplayName: string;
  readonly recipients: readonly DispatchRecipient[];
  readonly originalMessageId: string;
  readonly wakeResults: readonly ProjectGrokRoutineWakeResult[];
}): Promise<void> => {
  const accepted = acceptedWakeRecipients({
    senderMembershipId: input.senderMembershipId,
    recipients: input.recipients,
    wakeResults: input.wakeResults,
  });
  if (accepted.length === 0) {
    return;
  }
  const membershipIds = accepted.flatMap((recipient) =>
    recipient.id === null ? [] : [recipient.id],
  );
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, project_display_name
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND id = ANY(${membershipIds}::text[])
    `,
  );
  const displayNameById = new Map(
    rows.map((row) => [
      String(row.id),
      typeof row.project_display_name === "string"
        ? row.project_display_name
        : null,
    ]),
  );
  for (const recipient of accepted) {
    if (recipient.id === null) {
      continue;
    }
    const senderProjectDisplayName = displayNameById.has(recipient.id)
      ? displayNameById.get(recipient.id) ?? null
      : null;
    await insertProjectMessageWithDeliveries({
      projectId: input.projectId,
      senderMembershipId: recipient.id,
      senderUserId: recipient.user_id,
      senderProjectDisplayName,
      toMembershipId: input.senderMembershipId,
      toUserId: input.senderUserId,
      toTeamLabel: null,
      toProjectDisplayName: input.senderProjectDisplayName,
      kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
      summary: processingReceiptSummary(input.originalMessageId),
      refsJson: "{}",
      recipients: [
        { id: input.senderMembershipId, user_id: input.senderUserId },
      ],
    });
  }
};
