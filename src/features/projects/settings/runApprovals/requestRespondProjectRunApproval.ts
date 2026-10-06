import { parseRespondRunApprovalResponse } from "@/features/projects/settings/runApprovals/parseRespondRunApprovalResponse";
import type { RespondRunApprovalResult } from "@/features/projects/settings/runApprovals/runApprovalListItem.type";

/** Owner POST .../run-approvals/:runId/approve|decline. */
export const requestRespondProjectRunApproval = async (input: {
  readonly projectId: string;
  readonly runId: string;
  readonly decision: "approve" | "deny";
  readonly signal?: AbortSignal;
}): Promise<RespondRunApprovalResult> => {
  const verb = input.decision === "approve" ? "approve" : "decline";
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}/access/run-approvals/${encodeURIComponent(input.runId)}/${verb}`,
      { method: "POST", signal: input.signal },
    );
    const data: unknown = await response.json().catch(() => null);
    return parseRespondRunApprovalResponse(response.status, data);
  } catch {
    return { ok: false, code: "error" };
  }
};
