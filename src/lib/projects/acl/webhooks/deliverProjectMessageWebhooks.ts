import { asRowArray, getSql } from "@/lib/db";
import { markProjectMessageDeliveryStatus } from "@/lib/projects/acl/webhooks/markProjectMessageDeliveryStatus";
import { maybeInsertProjectHmacProcessingReceipt } from "@/lib/projects/acl/webhooks/maybeInsertProjectHmacProcessingReceipt";
import { postProjectMembershipWebhookHonoringRetryAfter } from "@/lib/projects/acl/webhooks/postProjectMembershipWebhookHonoringRetryAfter";
import { PROJECT_WEBHOOK_ERROR_RATE_LIMITED } from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";
import { loadPostableGrokRoutineWebhookMembershipIds } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

export type ProjectMessageWebhookPayload = {
  readonly projectId: string;
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: Readonly<Record<string, string>>;
  readonly fromMembershipId: string | null;
  readonly createdAt: string;
};

/**
 * Push to enabled membership webhooks that retained a signing secret.
 * A missing HMAC URL is no_webhook only when no postable Grok webhook is stored.
 * That Grok wake is separate and must stay pending. Do not await from dispatch HTTP.
 * On HMAC 2xx, insert the same thin task.processing receipt the Grok path sends on http_200.
 * DF-026: after a 429 no POST until Retry-After passes (delivery skipped with
 * rate_limited_retry_after; the row stays in the inbox). Never retried here.
 */
export const deliverProjectMessageWebhooks = async (input: {
  readonly payload: ProjectMessageWebhookPayload;
  readonly recipientMembershipIds: readonly string[];
}): Promise<void> => {
  if (input.recipientMembershipIds.length === 0) {
    return;
  }
  const membershipIds = [...input.recipientMembershipIds];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT membership_id, webhook_url, secret_retained
      FROM project_membership_webhooks
      WHERE project_id = ${input.payload.projectId}
        AND enabled = TRUE
        AND membership_id = ANY(${membershipIds}::text[])
    `,
  );
  const body = JSON.stringify(input.payload);
  const grokMembershipIds = await loadPostableGrokRoutineWebhookMembershipIds({
    projectId: input.payload.projectId,
    membershipIds,
  });
  const byMembership = new Map(
    rows.map((row) => [
      String(row.membership_id),
      {
        url: String(row.webhook_url),
        secret:
          typeof row.secret_retained === "string" &&
          row.secret_retained.length > 0
            ? row.secret_retained
            : null,
      },
    ]),
  );
  for (const membershipId of membershipIds) {
    const hook = byMembership.get(membershipId);
    if (hook === undefined) {
      if (grokMembershipIds.has(membershipId)) {
        continue;
      }
      await markProjectMessageDeliveryStatus({
        messageId: input.payload.messageId,
        membershipId,
        status: "skipped",
        lastError: "no_webhook",
      });
      continue;
    }
    if (hook.secret === null) {
      await markProjectMessageDeliveryStatus({
        messageId: input.payload.messageId,
        membershipId,
        status: "skipped",
        lastError: "secret_not_retained",
      });
      continue;
    }
    const result = await postProjectMembershipWebhookHonoringRetryAfter({
      membershipId,
      webhookUrl: hook.url,
      secret: hook.secret,
      messageId: input.payload.messageId,
      body,
    });
    const deferred =
      !result.ok && result.error === PROJECT_WEBHOOK_ERROR_RATE_LIMITED;
    await markProjectMessageDeliveryStatus({
      messageId: input.payload.messageId,
      membershipId,
      status: result.ok ? "delivered" : deferred ? "skipped" : "failed",
      lastError: result.ok ? null : result.error,
    });
    await maybeInsertProjectHmacProcessingReceipt({
      payload: input.payload,
      peerMembershipId: membershipId,
      deliveryOk: result.ok,
    });
  }
};
