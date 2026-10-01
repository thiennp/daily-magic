export type ProjectAccessAuditAction =
  | "request"
  | "approve"
  | "deny"
  | "revoke"
  | "add_folder_ref"
  | "remove_folder_ref";

export default interface ProjectAccessAuditRecord {
  readonly id: string;
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: ProjectAccessAuditAction;
  readonly targetUserId: string | null;
  readonly at: string;
  readonly detail: Readonly<Record<string, unknown>>;
}
