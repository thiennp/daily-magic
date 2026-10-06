/** One PENDING computer-run approval from GET .../run-approvals. */
export type RunApprovalListItem = {
  readonly runId: string;
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly requesterLabel: string | null;
  readonly prompt: string;
  readonly tool: string;
  readonly computerName: string;
  readonly projectFolder: string;
  readonly approvalExpiresAt: string | null;
  readonly state: string;
};

export type RunApprovalsLoadState = "loading" | "ready" | "error";

export type RunApprovalsListResult =
  | { readonly ok: true; readonly approvals: readonly RunApprovalListItem[] }
  | { readonly ok: false };

export type RespondRunApprovalResult =
  | { readonly ok: true; readonly runId: string; readonly state: string }
  | {
      readonly ok: false;
      readonly code: "ended" | "forbidden" | "error";
    };
