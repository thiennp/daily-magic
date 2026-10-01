export type ProjectAccessAuditAction =
  | "request"
  | "approve"
  | "deny"
  | "revoke"
  | "add_folder_ref"
  | "remove_folder_ref"
  | "allow_claim_ok"
  | "allow_claim_deny"
  | "membership_check_ok"
  | "membership_check_deny";

export default interface ProjectAccessAuditRecord {
  readonly id: string;
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: ProjectAccessAuditAction;
  readonly targetUserId: string | null;
  readonly at: string;
  readonly detail: Readonly<Record<string, unknown>>;
}
