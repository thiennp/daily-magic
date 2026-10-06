import type { DispatchProjectInboxResult } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

type DispatchInboxFailure = Extract<DispatchProjectInboxResult, { ok: false }>;

export type DispatchInboxFailureMeta = Pick<
  DispatchInboxFailure,
  "cause" | "reason" | "detail" | "retryAfterSeconds" | "retryAfterAt"
>;

/** Optional failure fields from a dispatch error body (rate limit + computer cause). */
export const parseDispatchInboxFailureMeta = (
  body: Record<string, unknown>,
): DispatchInboxFailureMeta => {
  const reason =
    body.reason === "hourly" || body.reason === "unread_cap"
      ? body.reason
      : undefined;
  const detail =
    body.detail === "rate_limited_hourly" || body.detail === "unread_cap"
      ? body.detail
      : undefined;
  const retryAfterSeconds =
    typeof body.retryAfterSeconds === "number"
      ? body.retryAfterSeconds
      : body.retryAfterSeconds === null
        ? null
        : undefined;
  const retryAfterAt =
    typeof body.retryAfterAt === "string"
      ? body.retryAfterAt
      : body.retryAfterAt === null
        ? null
        : undefined;

  const cause =
    body.cause === "offline" || body.cause === "too_old"
      ? body.cause
      : undefined;

  return { cause, reason, detail, retryAfterSeconds, retryAfterAt };
};
