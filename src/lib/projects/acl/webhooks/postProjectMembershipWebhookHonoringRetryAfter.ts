import {
  postSignedProjectMembershipWebhook,
  type SignedProjectWebhookPostResult,
} from "@/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook";
import { projectWakeRetryAfterRegistry } from "@/lib/projects/acl/webhooks/projectWakeRetryAfterRegistry";
import { PROJECT_WEBHOOK_ERROR_RATE_LIMITED } from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";

/**
 * Signed HMAC push that honors a prior 429 (DF-026): while the membership's
 * Retry-After is active, no POST (error rate_limited_retry_after). A new 429
 * records its Retry-After. Never retries; the row stays in the inbox.
 */
export const postProjectMembershipWebhookHonoringRetryAfter = async (input: {
  readonly membershipId: string;
  readonly webhookUrl: string;
  readonly secret: string;
  readonly messageId: string;
  readonly body: string;
}): Promise<SignedProjectWebhookPostResult> => {
  if (
    projectWakeRetryAfterRegistry.isDeferred({
      channel: "hmac",
      membershipId: input.membershipId,
      nowMs: Date.now(),
    })
  ) {
    return { ok: false, error: PROJECT_WEBHOOK_ERROR_RATE_LIMITED };
  }
  const result = await postSignedProjectMembershipWebhook({
    webhookUrl: input.webhookUrl,
    secret: input.secret,
    messageId: input.messageId,
    body: input.body,
  });
  if (!result.ok && result.retryAfterSeconds !== undefined) {
    projectWakeRetryAfterRegistry.record({
      channel: "hmac",
      membershipId: input.membershipId,
      retryAfterSeconds: result.retryAfterSeconds,
      nowMs: Date.now(),
    });
  }
  return result;
};
