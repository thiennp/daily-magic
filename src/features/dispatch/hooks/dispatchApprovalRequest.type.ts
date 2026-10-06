export type DispatchApprovalRequest = {
  readonly runId: string;
  readonly requesterEmail: string | null;
  readonly prompt: string;
  readonly approvalExpiresAt: string | null;
  /** Optional richer card fields from the live payload. */
  readonly tool: string | null;
  readonly computerName: string | null;
  readonly projectFolder: string | null;
};
