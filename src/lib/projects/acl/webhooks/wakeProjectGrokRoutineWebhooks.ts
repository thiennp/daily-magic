import { asRowArray, getSql } from "@/lib/db";
import { persistProjectGrokRoutineWakeAttempt } from "@/lib/projects/acl/webhooks/persistProjectGrokRoutineWakeAttempt";
import { postProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/postProjectGrokRoutineWebhook";

const isPostableGrokRoutineWebhook = (
  row: Record<string, unknown>,
): boolean => {
  const url = typeof row.webhook_url === "string" ? row.webhook_url : "";
  const bearer =
    typeof row.bearer_retained === "string" ? row.bearer_retained : "";
  return url.length > 0 && bearer.length > 0;
};

/** Memberships whose stored Grok webhook can be POSTed. Does not read HMAC rows. */
export const loadPostableGrokRoutineWebhookMembershipIds = async (input: {
  readonly projectId: string;
  readonly membershipIds: readonly string[];
}): Promise<ReadonlySet<string>> => {
  if (input.membershipIds.length === 0) {
    return new Set();
  }
  const membershipIds = [...input.membershipIds];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT membership_id, webhook_url, bearer_retained
      FROM project_membership_grok_routine_webhooks
      WHERE project_id = ${input.projectId}
        AND membership_id = ANY(${membershipIds}::text[])
    `,
  );
  return new Set(
    rows.flatMap((row) =>
      isPostableGrokRoutineWebhook(row) ? [String(row.membership_id)] : [],
    ),
  );
};

export const PROJECT_GROK_ROUTINE_WAKE_EVENT = "project_message.stored";

const wakeResultForRecipient = async (
  row: Record<string, unknown> | undefined,
  body: string,
): Promise<string> => {
  if (row === undefined || !isPostableGrokRoutineWebhook(row)) {
    return "not_postable";
  }
  const posted = await postProjectGrokRoutineWebhook({
    webhookUrl: String(row.webhook_url),
    bearer: String(row.bearer_retained),
    body,
  });
  return posted.result;
};

/**
 * POST each addressed recipient and persist the short result.
 * Callers must await this. A missed POST must not fail dispatch.
 */
export const wakeProjectGrokRoutineWebhooks = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly recipientMembershipIds: readonly string[];
}): Promise<void> => {
  if (input.recipientMembershipIds.length === 0) {
    return;
  }
  const membershipIds = [...new Set(input.recipientMembershipIds)];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT membership_id, webhook_url, bearer_retained
      FROM project_membership_grok_routine_webhooks
      WHERE project_id = ${input.projectId}
        AND membership_id = ANY(${membershipIds}::text[])
    `,
  );
  const byMembership = new Map(
    rows.map((row) => [String(row.membership_id), row]),
  );
  const body = JSON.stringify({
    projectId: input.projectId,
    messageId: input.messageId,
    event: PROJECT_GROK_ROUTINE_WAKE_EVENT,
  });
  for (const membershipId of membershipIds) {
    const result = await wakeResultForRecipient(
      byMembership.get(membershipId),
      body,
    );
    await persistProjectGrokRoutineWakeAttempt({
      messageId: input.messageId,
      membershipId,
      result,
    });
  }
};
