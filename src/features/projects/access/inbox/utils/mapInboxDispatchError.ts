import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type { DispatchProjectInboxResult } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

export const mapInboxDispatchError = (
  result: Extract<DispatchProjectInboxResult, { ok: false }>,
): string => {
  if (
    result.code === "rate_limited" ||
    result.code === "rate_limited_daily" ||
    result.code === "rate_limited_hourly" ||
    result.detail === "rate_limited_hourly"
  ) {
    if (result.reason === "unread_cap" || result.detail === "unread_cap") {
      return AWC_PROJECT_INBOX_COPY.dispatchUnreadCap;
    }
    return AWC_PROJECT_INBOX_COPY.dispatchRateLimited;
  }
  if (result.code === "unread_cap" || result.detail === "unread_cap") {
    return AWC_PROJECT_INBOX_COPY.dispatchUnreadCap;
  }
  if (result.code === "recipient_not_found") {
    return AWC_PROJECT_INBOX_COPY.dispatchRecipientMissing;
  }
  return result.errorMessage || AWC_PROJECT_INBOX_COPY.dispatchFailed;
};
