import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import {
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import {
  resolveDispatchRecipients,
  type DispatchRecipient,
} from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

export type DispatchProjectMessageResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: number;
    }
  | { readonly ok: false; readonly code: string };

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
const insertProcessingReceipts = async (input: {
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

export const dispatchProjectMessage = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<DispatchProjectMessageResult> => {
  const sender = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (sender === null) {
    return { ok: false, code: "forbidden" };
  }
  if (!sender.projectDisplayName) {
    return { ok: false, code: "naming_required" };
  }
  if (!sender.scopes.includes("msg:dispatch")) {
    return { ok: false, code: "missing_scope" };
  }
  const parsed = parseProjectDispatchPayload(input.args);
  if (!parsed.ok) {
    return { ok: false, code: parsed.code };
  }

  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();

  const rate = await assertProjectMessageDispatchRateLimits({
    projectId: input.projectId,
    senderMembershipId: sender.id,
    senderUserId: input.actorUserId,
  });
  if (!rate.ok) {
    return { ok: false, code: rate.code };
  }

  const resolved = await resolveDispatchRecipients({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    toMembershipId: parsed.toMembershipId,
    toProjectDisplayName: parsed.toProjectDisplayName,
    toTeamLabel: parsed.toTeamLabel,
  });
  if (!resolved.ok) {
    return { ok: false, code: resolved.code };
  }

  const primary = resolved.recipients[0];
  const addressedByMembershipOrName =
    parsed.toMembershipId !== null || parsed.toProjectDisplayName !== null;
  const inserted = await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: sender.id,
    senderProjectDisplayName: sender.projectDisplayName,
    senderUserId: input.actorUserId,
    toMembershipId: addressedByMembershipOrName ? primary.id : null,
    toUserId: addressedByMembershipOrName ? primary.user_id : null,
    toTeamLabel: parsed.toTeamLabel,
    toProjectDisplayName: parsed.toProjectDisplayName,
    kind: parsed.kind,
    summary: parsed.summary,
    refsJson: JSON.stringify(parsed.refs),
    recipients: resolved.recipients.filter(
      (recipient): recipient is { id: string; user_id: string } =>
        recipient.id !== null,
    ),
  });
  await insertProcessingReceipts({
    projectId: input.projectId,
    senderMembershipId: sender.id,
    senderUserId: input.actorUserId,
    senderProjectDisplayName: sender.projectDisplayName,
    recipients: resolved.recipients,
    originalMessageId: inserted.messageId,
    wakeResults: inserted.wakeResults,
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "msg.dispatch",
    detail: {
      messageId: inserted.messageId,
      kind: parsed.kind,
      recipientCount: resolved.recipients.length,
      toMembershipId: parsed.toMembershipId,
      toProjectDisplayName: parsed.toProjectDisplayName,
      toTeamLabel: parsed.toTeamLabel,
    },
  });
  return {
    ok: true,
    messageId: inserted.messageId,
    recipientCount: resolved.recipients.length,
  };
};
