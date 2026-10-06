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
  "add_folder_ref",
  "remove_folder_ref",
  "allow_claim_ok",
  "allow_claim_deny",
  "membership_check_ok",
  "membership_check_deny",
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
] as const;
