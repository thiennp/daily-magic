import type { ComputerRunApprovalStateValue } from "@/lib/projects/acl/runApprovals/computerRunApprovalState.constant";

/**
 * Shape for GET list and DISPATCH_APPROVAL_REQUIRED live push so the card can
 * say "{requester} wants {tool} to run a task on {computer}".
 */
export type ComputerRunApprovalPayload = {
  readonly runId: string;
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly requesterLabel: string | null;
  readonly prompt: string;
  /** Requesting tool / writer agent (e.g. claude-cli). */
  readonly tool: string;
  /** Computer seat display name (device display_name / label). */
  readonly computerName: string;
  /** Project folder path on that computer (user_projects.folder_path). */
  readonly projectFolder: string;
  readonly approvalExpiresAt: string | null;
  readonly state: ComputerRunApprovalStateValue;
};
