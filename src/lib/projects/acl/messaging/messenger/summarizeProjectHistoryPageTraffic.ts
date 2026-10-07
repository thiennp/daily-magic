/**
 * Traffic-log / diagnostic scrub for History page hub messages.
 * HARD Neon no-bloat: never include entry bodies, text, or payloads.
 */

export type ProjectHistoryPageTrafficSummary = {
  readonly type: string;
  readonly requestId: string | null;
  readonly projectId: string | null;
  readonly threadKey: string | null;
  readonly entryCount: number | null;
  readonly hasMore: boolean | null;
  readonly ok: boolean | null;
  readonly errorCode: string | null;
};

const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;

/**
 * Summarize a hub request/result for logs. Strips bodies.
 */
export const summarizeProjectHistoryPageTraffic = (input: {
  readonly type: string;
  readonly requestId?: string;
  readonly payload?: unknown;
}): ProjectHistoryPageTrafficSummary => {
  const payload = asRecord(input.payload);
  const entries = payload?.entries;
  const entryCount = Array.isArray(entries) ? entries.length : null;
  return {
    type: input.type,
    requestId:
      typeof input.requestId === "string" && input.requestId.length > 0
        ? input.requestId
        : null,
    projectId:
      typeof payload?.projectId === "string" ? payload.projectId : null,
    threadKey:
      typeof payload?.threadKey === "string" ? payload.threadKey : null,
    entryCount,
    hasMore: typeof payload?.hasMore === "boolean" ? payload.hasMore : null,
    ok: typeof payload?.ok === "boolean" ? payload.ok : null,
    errorCode:
      typeof payload?.errorCode === "string" ? payload.errorCode : null,
  };
};

/** Assert a log/SQL blob never carries timeline body fields. */
export const assertNoHistoryBodyInTrafficBlob = (blob: unknown): boolean => {
  const raw = typeof blob === "string" ? blob : JSON.stringify(blob ?? null);
  // Deny common body-carrying keys if they appear as JSON object keys with values.
  const denied =
    /"text"\s*:\s*"/i.test(raw) ||
    /"prompt"\s*:\s*"/i.test(raw) ||
    /"result_output"\s*:\s*"/i.test(raw) ||
    /"resultOutput"\s*:\s*"/i.test(raw) ||
    /"transcript"\s*:\s*"/i.test(raw) ||
    /"body"\s*:\s*"/i.test(raw);
  return !denied;
};
