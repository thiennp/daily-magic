import { isBoolean, isNonNullObject } from "guardz";

import type { RunsWithoutApprovalResult } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApproval.type";

/** Pure: map an HTTP status + JSON body from the S0-2 route to a result. */
export const parseRunsWithoutApprovalResponse = (
  httpOk: boolean,
  data: unknown,
): RunsWithoutApprovalResult => {
  if (
    !httpOk ||
    !isNonNullObject(data) ||
    data.ok !== true ||
    !isBoolean(data.allowRunsWithoutApproval)
  ) {
    return { ok: false };
  }
  return { ok: true, allowRunsWithoutApproval: data.allowRunsWithoutApproval };
};
