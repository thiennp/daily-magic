import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";
import { signProjectWebhookBody } from "@/lib/projects/acl/webhooks/projectWebhookSecret";
import { readProjectWakeRetryAfterSeconds } from "@/lib/projects/acl/webhooks/readProjectWakeRetryAfterSeconds";

const WEBHOOK_TIMEOUT_MS = 5_000;

export type SignedProjectWebhookPostResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly error: string;
      /** Set on http_429 only. The caller defers later pushes; no retry. */
      readonly retryAfterSeconds?: number;
    };

/** One signed POST. Caller must not block the dispatch HTTP response on this. */
export const postSignedProjectMembershipWebhook = async (input: {
  readonly webhookUrl: string;
  readonly secret: string;
  readonly messageId: string;
  readonly body: string;
}): Promise<SignedProjectWebhookPostResult> => {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = signProjectWebhookBody({
    secret: input.secret,
    timestamp,
    messageId: input.messageId,
    body: input.body,
  });
  try {
    // DNS can change after registration: re-check right before sending, never follow redirects.
    const safe = await assertSafeProjectWebhookUrl(input.webhookUrl);
    if (!safe.ok) return { ok: false, error: safe.code };
    const response = await fetch(input.webhookUrl, {
      method: "POST",
      redirect: "manual",
      headers: {
        "content-type": "application/json",
        "x-awc-signature": signature,
        "x-awc-timestamp": timestamp,
        "x-awc-message-id": input.messageId,
      },
      body: input.body,
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (response.status === 429) {
      return {
        ok: false,
        error: "http_429",
        retryAfterSeconds: await readProjectWakeRetryAfterSeconds(response),
      };
    }
    if (!response.ok) {
      return { ok: false, error: `http_${response.status}` };
    }
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "fetch_failed";
    return { ok: false, error: message.slice(0, 200) };
  }
};
