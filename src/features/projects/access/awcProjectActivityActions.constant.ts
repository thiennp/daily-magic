import {
  isProjectActivityAllowlistedAction,
  PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS,
  type ProjectActivityAction,
} from "@/lib/projects/acl/projectActivityAllowlist.constant";

/** Allowlisted G1 activity actions — exact bind to API PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS. */
export const AWC_PROJECT_ACTIVITY_ACTIONS = PROJECT_ACTIVITY_ALLOWLISTED_ACTIONS;

export type AwcProjectActivityAction = ProjectActivityAction;

export const AWC_PROJECT_ACTIVITY_ACTION_LABELS: Record<
  AwcProjectActivityAction,
  string
> = {
  request: "Access requested",
  approve: "Approved",
  deny: "Denied",
  revoke: "Revoked",
  add_folder_ref: "Folder ref added",
  remove_folder_ref: "Folder ref removed",
  allow_claim_ok: "Allow-claim ok",
  allow_claim_deny: "Allow-claim denied",
  membership_check_ok: "Membership check ok",
  membership_check_deny: "Membership check denied",
};

export const isAwcProjectActivityAction = (
  value: string,
): value is AwcProjectActivityAction =>
  isProjectActivityAllowlistedAction(value);
