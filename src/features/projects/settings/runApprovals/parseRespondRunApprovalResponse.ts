import { isNonNullObject, isString } from "guardz";

import type { RespondRunApprovalResult } from "@/features/projects/settings/runApprovals/runApprovalListItem.type";

/** Pure: map POST approve/decline status + JSON to a result. */
export const parseRespondRunApprovalResponse = (
  status: number,
  data: unknown,
): RespondRunApprovalResult => {
  if (status === 409) return { ok: false, code: "ended" };
  if (status === 401 || status === 403) return { ok: false, code: "forbidden" };
  if (
    status < 200 ||
    status >= 300 ||
    !isNonNullObject(data) ||
    data.ok !== true ||
    !isString(data.runId) ||
    !isString(data.state)
  ) {
    return { ok: false, code: "error" };
  }
  return { ok: true, runId: data.runId, state: data.state };
};
