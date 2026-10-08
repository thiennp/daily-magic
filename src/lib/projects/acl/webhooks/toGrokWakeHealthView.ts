import { GROK_WAKE_RESULT_SKIPPED_BY_POLICY } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import type { ProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";

export type GrokWakeHealthView = {
  /** ISO time of the latest real wake attempt (skipped_by_policy ignored); null when none. */
  readonly lastWakeAt: string | null;
  /** Short meta-only reason when that latest attempt failed; null after a success or with no attempt. */
  readonly lastFailureReason: string | null;
};

const HTTP_RESULT = /^http_(\d{3})$/;

/**
 * Stored wake result → short plain-text reason. Built only from the fixed
 * stored codes, so no URL, key, token or response body can ever leak.
 * 2xx = success → null. Unknown codes → null (never echo raw input).
 */
const failureReasonOf = (result: string): string | null => {
  const http = HTTP_RESULT.exec(result);
  if (http !== null) {
    return http[1].startsWith("2") ? null : `HTTP ${http[1]}`;
  }
  if (result === "fetch_failed") {
    return "Fetch failed (timeout, DNS or refused)";
  }
  if (result === "not_postable") {
    return "No wake link was saved when this message was sent.";
  }
  return null;
};

/**
 * Status row → last wake time + failure reason for a bot's Grok webhook
 * status (DF-036). skipped_by_policy is not a wake; coalesced / deferred_429
 * are never stored, so they never reach here.
 */
export const toGrokWakeHealthView = (
  status: Pick<
    ProjectGrokRoutineWebhookStatus,
    "lastGrokWakeResult" | "lastGrokWakeAt"
  >,
): GrokWakeHealthView => {
  const result = status.lastGrokWakeResult;
  if (result === null || result === GROK_WAKE_RESULT_SKIPPED_BY_POLICY) {
    return { lastWakeAt: null, lastFailureReason: null };
  }
  return {
    lastWakeAt: status.lastGrokWakeAt,
    lastFailureReason: failureReasonOf(result),
  };
};
