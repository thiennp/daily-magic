import type { ProjectAccessAuditAction } from "@/lib/projects/acl/types/ProjectAccessAuditRecord.type";

/**
 * G1 allowlisted activity events only — membership/status/ACL, never content.
 * Non-goals: handoffs, run logs, prompts, skills, PR diffs, artifacts.
 */
export const PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS = [
  "request",
  "approve",
  "deny",
  "revoke",
  "leave",
  "add_folder_ref",
  "remove_folder_ref",
  "allow_claim_ok",
  "allow_claim_deny",
  "membership_check_ok",
  "membership_check_deny",
  "invite.create",
  "invite.revoke",
  "invite.redeem",
  "invite.auto_approve_on",
  "invite.auto_approve_off",
  "invite.auto_approve_redeem",
  "key.mint",
  "key.rotate",
  "key.revoke",
  "membership.set_display_name",
  "membership.rename_display",
  "msg.dispatch",
  "msg.ack",
  "msg.clear",
  "webhook.register",
  "webhook.update",
  "webhook.disable",
] as const satisfies readonly ProjectAccessAuditAction[];

export type ProjectActivityAction =
  (typeof PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS)[number];

export const isProjectActivityAllowlistedAction = (
  value: string,
): value is ProjectActivityAction =>
  (PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS as readonly string[]).includes(value);

/** Detail keys safe to return on activity DTOs (no reason/body/token/path). */
export const PROJECT_ACTIVITY_SAFE_DETAIL_KEYS = [
  "requestId",
  "membershipId",
  "folderRefId",
  "subjectUserId",
  "outcome",
  "status",
  "inviteId",
  "label",
  "keyId",
  "messageId",
  "webhookId",
  "prefix",
  "last4",
  "projectDisplayName",
  "recipientCount",
  "kind",
  "count",
  "deletedMessages",
  "deletedDeliveries",
] as const;
