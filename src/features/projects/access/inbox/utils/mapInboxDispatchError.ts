import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type { DispatchProjectInboxResult } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

export const mapInboxDispatchError = (
  result: Extract<DispatchProjectInboxResult, { ok: false }>,
): string => {
  if (
    result.code === "rate_limited" ||
    result.code === "rate_limited_daily"
  ) {
    return AWC_PROJECT_INBOX_COPY.dispatchRateLimited;
  }
  if (result.code === "recipient_not_found") {
    return AWC_PROJECT_INBOX_COPY.dispatchRecipientMissing;
  }
  return result.errorMessage || AWC_PROJECT_INBOX_COPY.dispatchFailed;
};
