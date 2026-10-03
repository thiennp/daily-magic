import { asRowArray, getSql } from "@/lib/db";
import { markProjectMessageDeliveryStatus } from "@/lib/projects/acl/webhooks/markProjectMessageDeliveryStatus";
import { postSignedProjectMembershipWebhook } from "@/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook";

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
 * Skips null secret_retained until re-register. Do not await from dispatch HTTP.
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
    const result = await postSignedProjectMembershipWebhook({
      webhookUrl: hook.url,
      secret: hook.secret,
      messageId: input.payload.messageId,
      body,
    });
    await markProjectMessageDeliveryStatus({
      messageId: input.payload.messageId,
      membershipId,
      status: result.ok ? "delivered" : "failed",
      lastError: result.ok ? null : result.error,
    });
  }
};

export const scheduleProjectMessageWebhookDelivery = (input: {
  readonly payload: ProjectMessageWebhookPayload;
  readonly recipientMembershipIds: readonly string[];
}): void => {
  void deliverProjectMessageWebhooks(input).catch((error: unknown) => {
    console.error("project message webhook delivery failed", {
      messageId: input.payload.messageId,
      error: error instanceof Error ? error.message : String(error),
    });
  });
};
