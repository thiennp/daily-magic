import { isNonNullObject, isString } from "guardz";

import type {
  RunApprovalListItem,
  RunApprovalsListResult,
} from "@/features/projects/settings/runApprovals/runApprovalListItem.type";

const parseItem = (value: unknown): RunApprovalListItem | null => {
  if (!isNonNullObject(value) || !isString(value.runId) || value.runId.length === 0) {
    return null;
  }
  if (!isString(value.projectId) || !isString(value.prompt)) return null;
  if (!isString(value.requesterUserId)) return null;
  const requesterLabel =
    typeof value.requesterLabel === "string" && value.requesterLabel.trim().length > 0
      ? value.requesterLabel.trim()
      : null;
  const approvalExpiresAt =
    typeof value.approvalExpiresAt === "string" ? value.approvalExpiresAt : null;
  return {
    runId: value.runId,
    projectId: value.projectId,
    requesterUserId: value.requesterUserId,
    requesterLabel,
    prompt: value.prompt,
    tool: isString(value.tool) ? value.tool : "",
    computerName: isString(value.computerName) ? value.computerName : "",
    projectFolder: isString(value.projectFolder) ? value.projectFolder : "",
    approvalExpiresAt,
    state: isString(value.state) ? value.state : "pending",
  };
};

/** Pure: map GET .../run-approvals JSON to a typed list result. */
export const parseRunApprovalsListResponse = (
  httpOk: boolean,
  data: unknown,
): RunApprovalsListResult => {
  if (!httpOk || !isNonNullObject(data) || data.ok !== true) {
    return { ok: false };
  }
  if (!Array.isArray(data.approvals)) return { ok: false };
  const approvals: RunApprovalListItem[] = [];
  for (const row of data.approvals) {
    const item = parseItem(row);
    if (item === null) return { ok: false };
    approvals.push(item);
  }
  return { ok: true, approvals };
};
