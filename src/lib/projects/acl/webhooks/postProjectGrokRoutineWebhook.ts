import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";
import { readProjectWakeRetryAfterSeconds } from "@/lib/projects/acl/webhooks/readProjectWakeRetryAfterSeconds";

const GROK_ROUTINE_WAKE_TIMEOUT_MS = 3_000;

const httpStatusResult = (status: number): string =>
  Number.isInteger(status) && status >= 100 && status <= 599
    ? `http_${status}`
    : "fetch_failed";

export type ProjectGrokRoutineWebhookPostResult = {
  readonly result: string;
  /** Set on http_429 only: how long the endpoint asked us to wait. */
  readonly retryAfterSeconds?: number;
};

/**
 * One POST. Do not retry: HTTP 200 starts another bot run, and a 429 is
 * honored by the caller (no immediate retry, later wakes deferred).
 */
export const postProjectGrokRoutineWebhook = async (input: {
  readonly webhookUrl: string;
  readonly bearer: string;
  readonly body: string;
}): Promise<ProjectGrokRoutineWebhookPostResult> => {
  try {
    // DNS can change after registration: re-check right before sending, never follow redirects.
    const safe = await assertSafeProjectWebhookUrl(input.webhookUrl);
    if (!safe.ok) return { result: "fetch_failed" };
    const response = await fetch(input.webhookUrl, {
      method: "POST",
      redirect: "manual",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${input.bearer}`,
      },
      body: input.body,
      signal: AbortSignal.timeout(GROK_ROUTINE_WAKE_TIMEOUT_MS),
    });
    if (response.status === 429) {
      return {
        result: "http_429",
        retryAfterSeconds: await readProjectWakeRetryAfterSeconds(response),
      };
    }
    return { result: httpStatusResult(response.status) };
  } catch {
    return { result: "fetch_failed" };
  }
};
