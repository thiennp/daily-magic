import { parseRunApprovalsListResponse } from "@/features/projects/settings/runApprovals/parseRunApprovalsListResponse";
import type { RunApprovalsListResult } from "@/features/projects/settings/runApprovals/runApprovalListItem.type";

/** Owner GET /api/projects/:id/access/run-approvals. */
export const requestProjectRunApprovals = async (input: {
  readonly projectId: string;
  readonly signal?: AbortSignal;
}): Promise<RunApprovalsListResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}/access/run-approvals`,
      { method: "GET", signal: input.signal },
    );
    const data: unknown = await response.json().catch(() => null);
    return parseRunApprovalsListResponse(response.ok, data);
  } catch {
    return { ok: false };
  }
};
