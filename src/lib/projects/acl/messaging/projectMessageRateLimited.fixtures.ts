import type { ProjectMessageRateLimitFailure } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";

export const RATE_LIMITED_HOURLY_FAILURE: ProjectMessageRateLimitFailure = {
  ok: false,
  code: "rate_limited",
  reason: "hourly",
  detail: "rate_limited_hourly",
  retryAfterSeconds: 120,
  retryAfterAt: "2026-10-05T07:02:00.000Z",
  message:
    "Project message rate-limited (hourly). Tell your user the message was not sent. Retry after 120s (at 2026-10-05T07:02:00.000Z).",
};

export const RATE_LIMITED_UNREAD_CAP_FAILURE: ProjectMessageRateLimitFailure = {
  ok: false,
  code: "rate_limited",
  reason: "unread_cap",
  detail: "unread_cap",
  retryAfterSeconds: null,
  retryAfterAt: null,
  message:
    "Project message rate-limited: max unread reached. Tell your user the message was not sent. Ack or Clear all frees slots; there is no clock-based retry.",
};

export const RATE_LIMITED_CASES = [
  ["hourly", RATE_LIMITED_HOURLY_FAILURE],
  ["unread_cap", RATE_LIMITED_UNREAD_CAP_FAILURE],
] as const;
