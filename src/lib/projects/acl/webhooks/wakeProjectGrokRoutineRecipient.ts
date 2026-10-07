import { postProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/postProjectGrokRoutineWebhook";
import { projectWakeRetryAfterRegistry } from "@/lib/projects/acl/webhooks/projectWakeRetryAfterRegistry";

export const isPostableGrokRoutineWebhook = (
  row: Record<string, unknown> | undefined,
): row is Record<string, unknown> => {
  if (row === undefined) {
    return false;
  }
  const url = typeof row.webhook_url === "string" ? row.webhook_url : "";
  const bearer =
    typeof row.bearer_retained === "string" ? row.bearer_retained : "";
  return url.length > 0 && bearer.length > 0;
};

/**
 * One recipient's wake: not_postable, the gate's skip result (no POST), or one
 * POST. A 429 is remembered with its Retry-After and never retried here.
 */
export const wakeProjectGrokRoutineRecipient = async (input: {
  readonly membershipId: string;
  readonly row: Record<string, unknown> | undefined;
  readonly gatedResult: string | undefined;
  readonly body: string;
}): Promise<string> => {
  if (!isPostableGrokRoutineWebhook(input.row)) {
    return "not_postable";
  }
  if (input.gatedResult !== undefined) {
    return input.gatedResult;
  }
  const posted = await postProjectGrokRoutineWebhook({
    webhookUrl: String(input.row.webhook_url),
    bearer: String(input.row.bearer_retained),
    body: input.body,
  });
  if (posted.retryAfterSeconds !== undefined) {
    projectWakeRetryAfterRegistry.record({
      channel: "grok",
      membershipId: input.membershipId,
      retryAfterSeconds: posted.retryAfterSeconds,
      nowMs: Date.now(),
    });
  }
  return posted.result;
};
