import { asRowArray, getSql } from "@/lib/db";
import { postProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/postProjectGrokRoutineWebhook";

export const PROJECT_GROK_ROUTINE_WAKE_EVENT = "project_message.stored";

/**
 * Wake registered recipients only. Does not change delivery status or ack.
 * Fire-and-forget: callers must not fail dispatch on a miss.
 */
export const wakeProjectGrokRoutineWebhooks = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly recipientMembershipIds: readonly string[];
}): Promise<void> => {
  if (input.recipientMembershipIds.length === 0) {
    return;
  }
  const membershipIds = [...input.recipientMembershipIds];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT membership_id, webhook_url, bearer_retained
      FROM project_membership_grok_routine_webhooks
      WHERE project_id = ${input.projectId}
        AND membership_id = ANY(${membershipIds}::text[])
    `,
  );
  const body = JSON.stringify({
    projectId: input.projectId,
    messageId: input.messageId,
    event: PROJECT_GROK_ROUTINE_WAKE_EVENT,
  });
  for (const row of rows) {
    const url = typeof row.webhook_url === "string" ? row.webhook_url : "";
    const bearer =
      typeof row.bearer_retained === "string" ? row.bearer_retained : "";
    if (url.length === 0 || bearer.length === 0) {
      continue;
    }
    await postProjectGrokRoutineWebhook({ webhookUrl: url, bearer, body });
  }
};

export const scheduleProjectGrokRoutineWebhookWake = (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly recipientMembershipIds: readonly string[];
}): void => {
  void wakeProjectGrokRoutineWebhooks(input).catch((error: unknown) => {
    console.error("project grok routine webhook wake failed", {
      messageId: input.messageId,
      error: error instanceof Error ? error.message : "wake_failed",
    });
  });
};
