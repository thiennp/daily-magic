export type ProjectAccessAuditAction =
  | "request"
  | "approve"
  | "deny"
  | "revoke"
  | "leave"
  | "add_folder_ref"
  | "remove_folder_ref"
  | "allow_claim_ok"
  | "allow_claim_deny"
  | "membership_check_ok"
  | "membership_check_deny"
  | "invite.create"
  | "invite.revoke"
  | "invite.redeem"
  | "invite.auto_approve_on"
  | "invite.auto_approve_off"
  | "invite.auto_approve_redeem"
  | "key.mint"
  | "key.rotate"
  | "key.revoke"
  | "webhook.register"
  | "webhook.update"
  | "webhook.disable"
  | "msg.dispatch"
  | "msg.ack"
  | "msg.clear"
  | "membership.set_display_name"
  | "membership.rename_display";

export default interface ProjectAccessAuditRecord {
  readonly id: string;
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: ProjectAccessAuditAction;
  readonly targetUserId: string | null;
  readonly at: string;
  readonly detail: Readonly<Record<string, unknown>>;
}
